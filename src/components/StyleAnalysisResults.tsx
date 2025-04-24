
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';

export interface StyleMatch {
  name: string;
  confidence: number;
  description: string;
}

interface StyleAnalysisResultsProps {
  styles: StyleMatch[];
  isLoading: boolean;
}

const StyleAnalysisResults: React.FC<StyleAnalysisResultsProps> = ({ 
  styles, 
  isLoading 
}) => {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto animate-fade-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif font-medium text-artistic-text">
          Style Analysis Results
        </h2>
        <p className="text-muted-foreground mt-2">
          {isLoading 
            ? "Analyzing your artwork's style..." 
            : "Here are the artistic styles that match your artwork"}
        </p>
      </div>
      
      {isLoading ? (
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <Progress value={65} className="h-2 bg-artistic-lightPurple" />
            </div>
            <p className="mt-4 text-sm text-artistic-darkPurple">
              Our AI is studying your artwork...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {styles.map((style, index) => (
            <div 
              key={style.name}
              className="flex flex-col space-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4 text-artistic-purple" />
                  <h3 className="font-serif text-lg font-medium">{style.name}</h3>
                </div>
                <span className="font-medium text-sm">
                  {Math.round(style.confidence * 100)}%
                </span>
              </div>
              
              <Progress 
                value={style.confidence * 100} 
                className={`h-2 ${index === 0 ? 'bg-artistic-lightPurple' : 'bg-muted'}`}
              />
              
              <p className="text-sm text-muted-foreground pt-1">
                {style.description.length > 120 
                  ? `${style.description.substring(0, 120)}...` 
                  : style.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default StyleAnalysisResults;
