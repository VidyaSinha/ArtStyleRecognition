
# Art Style Recognition

This application uses deep learning to recognize art styles in images. It combines a React frontend with a Flask backend serving a TensorFlow model.

## Model Specifications
- Architecture: ResNet50-based custom model
- Input: RGB images (224x224x3)
- Output: 12 art style classifications
- Framework: TensorFlow 2.15.0

## Features
- Real-time art style recognition
- Top-5 style predictions with confidence scores
- Responsive web interface
- Cross-platform compatibility

## Technical Stack
- Frontend: React + Vite + TypeScript
- Backend: Flask + TensorFlow
- Deployment: Docker container

## Environment Variables
- `PORT`: Server port (default: 7860)
- `FLASK_ENV`: Environment mode (production/development)


## UI:
![image](https://github.com/user-attachments/assets/8566a00b-447d-4439-83c3-c861a4dc04c8)
