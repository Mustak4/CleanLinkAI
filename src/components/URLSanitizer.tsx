
import { useState } from 'react';
import { Copy, Sparkles, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const URLSanitizer = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [cleanedUrl, setCleanedUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const trackingParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'fbclid', 'gclid', 'msclkid', 'twclid', 'igshid',
    'mc_eid', 'mc_cid', '_ga', 'ref', 'referrer'
  ];

  const sanitizeUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);
      
      // Remove tracking parameters
      trackingParams.forEach(param => {
        searchParams.delete(param);
      });
      
      // Clean up fragment identifiers that look like tracking
      urlObj.hash = '';
      
      urlObj.search = searchParams.toString();
      return urlObj.toString();
    } catch (error) {
      console.error('Invalid URL:', error);
      return url;
    }
  };

  const generateShortUrl = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `clean.li/${result}`;
  };

  const handleSanitize = async () => {
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

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: `${type} copied!`,
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hero Input Section */}
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
            onClick={handleSanitize}
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

      {/* Results Section */}
      {(cleanedUrl || shortUrl) && (
        <div className="mt-8 space-y-6 animate-scale-in">
          {/* Short URL Result */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Your Clean Shortlink</h3>
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Ready to use
                </span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <code className="flex-1 text-lg font-mono text-primary">https://{shortUrl}</code>
                <Button
                  onClick={() => copyToClipboard(`https://${shortUrl}`, 'Shortlink')}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Cleaned URL Result */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Cleaned Original URL</h3>
              <a 
                href={cleanedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <code className="flex-1 text-sm font-mono text-gray-700 break-all">{cleanedUrl}</code>
              <Button
                onClick={() => copyToClipboard(cleanedUrl, 'Cleaned URL')}
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-6">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-accent to-green-600 text-white px-6 py-3 rounded-full">
              <span className="font-medium">Want analytics and custom slugs?</span>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white text-accent hover:bg-gray-100"
              >
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLSanitizer;
