
import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import StyleAnalysisResults, { StyleMatch } from '@/components/StyleAnalysisResults';
import ArtStyleInfo from '@/components/ArtStyleInfo';
import ThemeToggle from '@/components/ThemeToggle';
import { artStyles, analyzeArtStyle } from '@/data/artStyles';
import { Button } from '@/components/ui/button';
import { Palette, Image as ImageIcon, Info } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<StyleMatch[] | null>(null);
  const [activeStyleId, setActiveStyleId] = useState<string | null>(null);
  const [showAllStyles, setShowAllStyles] = useState(false);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setAnalysisResults(null);
  };

  const handleAnalyzeClick = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would call an actual AI service
      const results = await analyzeArtStyle(uploadedImage);
      
      // Map the results to include descriptions from our art styles data
      const styleMatches: StyleMatch[] = results.styleMatches.map(match => {
        const styleInfo = artStyles.find(style => style.name === match.name);
        return {
          name: match.name,
          confidence: match.confidence,
          description: styleInfo?.description || ""
        };
      });
      
      setAnalysisResults(styleMatches);
      
      // Set the active style tab to the highest confidence match
      if (styleMatches.length > 0) {
        const topStyle = styleMatches[0].name;
        const topStyleId = artStyles.find(style => style.name === topStyle)?.id;
        if (topStyleId) {
          setActiveStyleId(topStyleId);
        }
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-artistic-gallery">
      <div className="container px-4 py-12 max-w-6xl">
        <header className="flex justify-between items-center mb-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-artistic-text dark:text-white animate-fade-up">
              Find Your Art Style
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl animate-fade-up" style={{ animationDelay: '100ms' }}>
              Upload your artwork and discover which artistic styles it resembles. Our AI will analyze your image 
              and reveal the art movements that best capture its essence.
            </p>
          </div>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </header>

        <div className="space-y-10">
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {uploadedImage && !isAnalyzing && !analysisResults && (
            <div className="flex justify-center">
              <Button 
                onClick={handleAnalyzeClick}
                className="bg-artistic-purple hover:bg-artistic-darkPurple animate-fade-up"
                size="lg"
              >
                <Palette className="mr-2 h-5 w-5" />
                Analyze Artistic Style
              </Button>
            </div>
          )}
          
          {(isAnalyzing || analysisResults) && (
            <StyleAnalysisResults 
              styles={analysisResults || []}
              isLoading={isAnalyzing}
            />
          )}
          
          {analysisResults ? (
            <ArtStyleInfo 
              styles={artStyles}
              activeStyleId={activeStyleId}
              onStyleSelect={setActiveStyleId}
            />
          ) : (
            <div className="mt-10">
              {!showAllStyles ? (
                <div className="flex justify-center">
                  <Button 
                    onClick={() => setShowAllStyles(true)}
                    variant="outline" 
                    className="border-artistic-purple text-artistic-darkPurple animate-fade-up"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Explore All Art Styles
                  </Button>
                </div>
              ) : (
                <ArtStyleInfo 
                  styles={artStyles}
                  activeStyleId={activeStyleId || artStyles[0]?.id}
                  onStyleSelect={setActiveStyleId}
                />
              )}
            </div>
          )}
          
          {!uploadedImage && !showAllStyles && (
            <div className="flex flex-col items-center justify-center p-10 border border-dashed border-artistic-lightPurple/50 rounded-lg bg-white/50 dark:bg-gray-800/30 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <ImageIcon className="h-16 w-16 text-artistic-purple opacity-30 mb-4" />
              <h3 className="text-xl font-serif font-medium text-center mb-2">How It Works</h3>
              <ol className="space-y-3 text-center max-w-lg">
                <li className="text-muted-foreground">
                  <span className="font-medium text-artistic-darkPurple dark:text-artistic-lightPurple">1.</span> Upload your artwork using the panel above
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-artistic-darkPurple dark:text-artistic-lightPurple">2.</span> Our AI will analyze the visual elements in your image
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-artistic-darkPurple dark:text-artistic-lightPurple">3.</span> View the artistic styles that match your work
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-artistic-darkPurple dark:text-artistic-lightPurple">4.</span> Explore detailed information about each style
                </li>
              </ol>
            </div>
          )}
        </div>
        
        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <p>Artistic Eye AI &copy; {new Date().getFullYear()} | Discover the artistic styles in your images</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
