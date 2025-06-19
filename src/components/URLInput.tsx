
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface URLInputProps {
  onSanitize: (url: string) => Promise<void>;
  isProcessing: boolean;
}

const URLInput = ({ onSanitize, isProcessing }: URLInputProps) => {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = () => {
    onSanitize(inputUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Clean & Shorten
          <span className="text-primary block">Any URL</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Remove tracking parameters and create branded shortlinks. 
          Perfect for marketers, creators, and indie founders.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste your messy URL here... (e.g., https://example.com/page?utm_source=google&fbclid=xyz123)"
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none resize-none transition-colors"
            rows={3}
          />
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full py-4 text-lg font-semibold bg-primary hover:bg-blue-600 transition-all duration-200"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Cleaning URL...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Clean & Shorten URL</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default URLInput;
