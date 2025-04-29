import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
import io
import logging

# Configure logging for production
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS for both development and production
cors = CORS(app, resources={r"/*": {
    "origins": ["https://artstylerecognition.onrender.com", "http://localhost:8080", "http://localhost:3000", "http://127.0.0.1:8080", "http://127.0.0.1:3000"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "expose_headers": ["Content-Type"],
    "supports_credentials": True
}})

# Get absolute paths
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, 'art_style_classifier_BetterDA.keras')
class_labels_path = os.path.join(base_dir, 'style_encoder_classes_BetterDA.npy')

# Initialize global variables
model = None
class_labels = None

def initialize_model():
    global model, class_labels
    try:
        # Check if model and class label files exist
        if not os.path.exists(model_path):
            logger.error(f"Model file not found at {model_path}")
            return False
        if not os.path.exists(class_labels_path):
            logger.error(f"Class labels file not found at {class_labels_path}")
            return False

        logger.info("Initializing TensorFlow...")
        # Configure TensorFlow to use CPU only and optimize memory usage
        tf.config.set_visible_devices([], 'GPU')
        tf.config.threading.set_intra_op_parallelism_threads(1)
        tf.config.threading.set_inter_op_parallelism_threads(1)

        logger.info(f"Loading model from {model_path}...")
        try:
            model = tf.keras.models.load_model(model_path, compile=False)
            logger.info("Model loaded successfully")
        except Exception as model_error:
            logger.error(f"Failed to load model: {str(model_error)}")
            return False

        logger.info(f"Loading class labels from {class_labels_path}...")
        try:
            class_labels = np.load(class_labels_path)
            logger.info("Class labels loaded successfully")
        except Exception as labels_error:
            logger.error(f"Failed to load class labels: {str(labels_error)}")
            return False

        return True
    except Exception as e:
        logger.error(f"Failed to initialize: {str(e)}")
        return False

# Initialize the model when starting the server
initialize_model()

def preprocess_image(image_bytes):
    try:
        # Open the image using PIL
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize the image to match model's expected input size
        image = image.resize((224, 224), Image.Resampling.LANCZOS)
        
        # Convert to numpy array and preprocess
        img_array = np.array(image)
        img_array = img_array.astype('float32') / 255.0  # Normalize to [0,1]
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        # Validate input shape
        if img_array.shape != (1, 224, 224, 3):
            raise ValueError(f"Invalid input shape: {img_array.shape}. Expected: (1, 224, 224, 3)")
        
        return img_array
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")


@app.route('/health', methods=['GET'])
def health_check():
    global model, class_labels
    if model is None or class_labels is None:
        return jsonify({'status': 'error', 'message': 'Model not initialized'}), 503
    return jsonify({'status': 'healthy', 'message': 'Server is running and model is loaded'})

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    global model, class_labels
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = app.make_default_options_response()
        return response

    # Check if model is initialized
    if model is None or class_labels is None:
        return jsonify({'error': 'Model not initialized. Please try again later.'}), 503
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']
        image_bytes = image_file.read()
        
        # Preprocess the image
        processed_image = preprocess_image(image_bytes)
        
        # Make prediction
        predictions = model.predict(processed_image)
        
        # Get top 5 predictions
        top_indices = np.argsort(predictions[0])[-5:][::-1]
        
        # Format results
        results = [
            {
                'name': class_labels[idx].strip(),
                'confidence': float(predictions[0][idx])
            }
            for idx in top_indices
        ]
        
        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Configure Flask app for production
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB
app.config['PROPAGATE_EXCEPTIONS'] = True  # Enable better error propagation
app.config['ENV'] = 'production'
app.config['DEBUG'] = False

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 8000))
        logger.info(f"Starting server on port {port}...")
        app.run(host='0.0.0.0', port=port, debug=False, threaded=True)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        raise