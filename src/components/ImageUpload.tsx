
import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageUpload(file);
  };
  
  const clearImage = () => {
    setPreviewUrl(null);
  };
  
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif font-medium text-artistic-text">Upload Your Artwork</h2>
        <p className="text-muted-foreground mt-2">
          Upload an image to discover its artistic style
        </p>
      </div>
      
      {!previewUrl ? (
        <div 
          className={`file-upload-container border-2 border-dashed rounded-lg p-8 text-center 
          ${dragActive ? 'border-artistic-purple bg-artistic-lightPurple/20' : 'border-border'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-artistic-lightPurple flex items-center justify-center animate-fade-in">
              <Upload className="h-8 w-8 text-artistic-purple" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Drag and drop your image here</p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, and other image formats
              </p>
            </div>
            <label className="cursor-pointer">
              <Button variant="outline">
                Browse Files
              </Button>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleChange}
                accept="image/*" 
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img 
            src={previewUrl} 
            alt="Uploaded artwork" 
            className="w-full h-auto max-h-[500px] object-contain bg-black/5"
          />
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {previewUrl && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Your artwork is ready for style analysis</p>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
