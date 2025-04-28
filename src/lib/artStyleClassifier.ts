interface StylePrediction {
  name: string;
  confidence: number;
}

class ArtStyleClassifier {
  private apiUrl = 'http://localhost:3000'; // Flask server URL

  async predictStyle(imageFile: File): Promise<StylePrediction[]> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${this.apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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