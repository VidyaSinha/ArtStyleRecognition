interface StylePrediction {
  name: string;
  confidence: number;
}

class ArtStyleClassifier {
  private apiUrl = 'https://huggingface.co/spaces/VidyaSinha/Artstylerecog'; // Render deployment URL
  private readonly TIMEOUT_MS = 30000; // 30 second timeout

  async predictStyle(imageFile: File): Promise<StylePrediction[]> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(`${this.apiUrl}/predict`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
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
      return predictions.map((pred: any) => ({
        name: pred.name,
        confidence: pred.confidence
      }));

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
        }
        console.error('Error during prediction:', error);
        throw new Error(`Failed to analyze art style: ${error.message}`);
      }
      throw new Error('Failed to analyze art style');
    }
  }
}

// Create and export a singleton instance
const classifier = new ArtStyleClassifier();
export default classifier;
