
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  period: string;
  characteristics: string[];
  exampleArtists: string[];
  exampleImageUrl: string;
  importance: string;
}

interface ArtStyleInfoProps {
  styles: ArtStyle[];
  activeStyleId: string | null;
  onStyleSelect: (styleId: string) => void;
}

const ArtStyleInfo: React.FC<ArtStyleInfoProps> = ({ 
  styles, 
  activeStyleId, 
  onStyleSelect 
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Artistic Styles Guide</CardTitle>
        <CardDescription>
          Explore the characteristics and history of different artistic styles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={activeStyleId || styles[0]?.id} 
          onValueChange={onStyleSelect}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-6 flex-wrap h-auto">
            {styles.map(style => (
              <TabsTrigger 
                key={style.id} 
                value={style.id}
                className="font-serif mb-1"
              >
                {style.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {styles.map(style => (
            <TabsContent key={style.id} value={style.id} className="animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-medium">{style.name}</h3>
                    <Badge variant="outline" className="font-serif">{style.period}</Badge>
                  </div>
                  
                  <p className="mb-4">{style.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {style.characteristics.map((trait, i) => (
                        <li key={i} className="text-sm">{trait}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Historical Importance:</h4>
                    <p className="text-sm italic border-l-2 border-artistic-purple pl-3 py-1">
                      {style.importance}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Notable Artists:</h4>
                    <div className="flex flex-wrap gap-2">
                      {style.exampleArtists.map((artist, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {artist}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center items-start">
                  <div className="rounded-lg overflow-hidden border border-border shadow-sm w-full max-w-xs">
                    <img
                      src={style.exampleImageUrl}
                      alt={`Example of ${style.name}`}
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                    <div className="p-3 bg-muted/30">
                      <p className="text-xs text-center text-muted-foreground">
                        Example of {style.name} style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ArtStyleInfo;
