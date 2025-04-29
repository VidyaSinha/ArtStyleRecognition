interface StylePrediction {
  name: string;
  confidence: number;
}

class ArtStyleClassifier {
  private apiUrl = 'https://artstylerecognition.onrender.com'; // Flask server URL

  async predictStyle(imageFile: File): Promise<StylePrediction[]> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${this.apiUrl}/predict`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const predictions = await response.json();
      return predictions.map((pred: any) => ({
        name: pred.name,
        confidence: pred.confidence
      }));

    } catch (error) {
      console.error('Error during prediction:', error);
      throw new Error('Failed to analyze art style');
    }
  }
}

// Create and export a singleton instance
const classifier = new ArtStyleClassifier();
export default classifier;