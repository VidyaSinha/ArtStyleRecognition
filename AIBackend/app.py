from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = Flask(__name__)
CORS(app)

# Load the model and class labels
model = tf.keras.models.load_model('art_style_classifier_BetterDA.keras')
class_labels = np.load('style_encoder_classes_BetterDA.npy')

def preprocess_image(image_bytes):
    # Open the image using PIL
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize the image to match model's expected input size (assuming 224x224)
    image = image.resize((224, 224))
    
    # Convert to numpy array and preprocess
    img_array = np.array(image)
    img_array = img_array.astype('float32') / 255.0  # Normalize to [0,1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    
    return img_array

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
    app.run(host='0.0.0.0', port=5000)