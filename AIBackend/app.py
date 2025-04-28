import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
import io
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Get absolute paths
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, 'art_style_classifier_BetterDA.keras')
class_labels_path = os.path.join(base_dir, 'style_encoder_classes_BetterDA.npy')

# Load the model and class labels
try:
    logger.info("Initializing TensorFlow...")
    # Configure TensorFlow to use CPU only and optimize memory usage
    tf.config.set_visible_devices([], 'GPU')
    tf.config.threading.set_intra_op_parallelism_threads(1)
    tf.config.threading.set_inter_op_parallelism_threads(1)

    logger.info(f"Loading model from {model_path}...")
    model = tf.keras.models.load_model(model_path, compile=False)
    logger.info("Model loaded successfully")

    logger.info(f"Loading class labels from {class_labels_path}...")
    class_labels = np.load(class_labels_path)
    logger.info("Class labels loaded successfully")

except Exception as e:
    logger.error(f"Failed to initialize: {str(e)}")
    raise
    raise

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


@app.route('/predict', methods=['POST'])
def predict():
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

if __name__ == '__main__':
    # Configure Flask app
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB
    app.config['PROPAGATE_EXCEPTIONS'] = True  # Enable better error propagation
    
    # Run the Flask app
    try:
        print("Starting Flask server...")
        app.run(host='0.0.0.0', port=3000, debug=True)
    except Exception as e:
        print(f"Failed to start Flask server: {str(e)}")
        raise