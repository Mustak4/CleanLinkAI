
import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface URLResultsProps {
  cleanedUrl: string;
  shortUrl: string;
}

const URLResults = ({ cleanedUrl, shortUrl }: URLResultsProps) => {
  const [copied, setCopied] = useState(false);

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

  if (!cleanedUrl && !shortUrl) return null;

  return (
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
    </div>
  );
};

export default URLResults;
