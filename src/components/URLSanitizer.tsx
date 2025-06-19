
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { sanitizeUrl, generateShortUrl } from '@/utils/urlProcessor';
import URLInput from '@/components/URLInput';
import URLResults from '@/components/URLResults';
import CallToAction from '@/components/CallToAction';

const URLSanitizer = () => {
  const [cleanedUrl, setCleanedUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSanitize = async (inputUrl: string) => {
    if (!inputUrl.trim()) {
      toast({
        title: "Please enter a URL",
        description: "We need a URL to clean and shorten for you.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cleaned = sanitizeUrl(inputUrl);
    const shortened = generateShortUrl();
    
    setCleanedUrl(cleaned);
    setShortUrl(shortened);
    setIsProcessing(false);
    
    toast({
      title: "URL cleaned successfully!",
      description: "Your clean shortlink is ready to use.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <URLInput onSanitize={handleSanitize} isProcessing={isProcessing} />
      
      <URLResults cleanedUrl={cleanedUrl} shortUrl={shortUrl} />
      
      {(cleanedUrl || shortUrl) && <CallToAction />}
    </div>
  );
};

export default URLSanitizer;
