interface StylePrediction {
  name: string;
  confidence: number;
}

class ArtStyleClassifier {
  private apiUrl = 'https://vidyasinha-artstylerecog.hf.space'; // Hugging Face space URL
  private readonly TIMEOUT_MS = 30000; // 30 second timeout

  async predictStyle(imageFile: File): Promise<StylePrediction[]> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(`${this.apiUrl}/predict`, {
        method: 'POST',
        body: formData,
        credentials: 'omit', // Changed to omit for cross-origin requests
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const predictions = await response.json();
      if (!predictions || !Array.isArray(predictions)) {
        throw new Error('Invalid response format from server');
      }
      
      return predictions.map((pred: any) => ({
        name: pred?.name || 'Unknown',
        confidence: pred?.confidence || 0
      }));

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timed out after ' + (this.TIMEOUT_MS / 1000) + ' seconds');
        }
        console.error('Error during prediction:', error);
        throw new Error('Failed to analyze art style: ' + error.message);
      }
      throw error;
    }
  }
}

// Create and export a singleton instance
const classifier = new ArtStyleClassifier();
export default classifier;

