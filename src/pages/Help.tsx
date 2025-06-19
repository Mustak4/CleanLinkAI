
import { useState } from 'react';
import { Search, Mail, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqItems = [
    {
      id: 1,
      question: "How does URL cleaning work?",
      answer: "CleanLinkAI automatically detects and removes tracking parameters like utm_source, fbclid, gclid, and other marketing clutter from your URLs. This creates cleaner, more professional-looking links while preserving the core destination."
    },
    {
      id: 2,
      question: "What's included in the free plan?",
      answer: "The free plan includes 5 links per month, basic URL cleaning, standard short links, and 24-hour analytics. No signup required to get started - just paste your URL and go!"
    },
    {
      id: 3,
      question: "Can I use custom slugs for my short links?",
      answer: "Yes! Pro users can create custom slugs like clean.li/yourname instead of random characters. This helps with branding and makes your links more memorable."
    },
    {
      id: 4,
      question: "How do I set up a custom domain?",
      answer: "Custom domains are available as an add-on for Pro users. Simply add your domain in the settings, update your DNS records as instructed, and start using links.yourbrand.com for your shortened URLs."
    },
    {
      id: 5,
      question: "What analytics do you provide?",
      answer: "We track essential metrics including click counts, timestamps, referrer sources, and visitor countries. Pro users get detailed analytics dashboards with exportable data and longer retention periods."
    },
    {
      id: 6,
      question: "Is my data private and secure?",
      answer: "Absolutely. We only collect the minimal data needed for link functionality and analytics. We don't sell your data, and you can delete your links and data at any time. Privacy is core to our mission."
    },
    {
      id: 7,
      question: "Can I bulk import/export links?",
      answer: "Pro users can export their link data as CSV files. Bulk import functionality is coming soon - contact us if this is critical for your workflow."
    },
    {
      id: 8,
      question: "What happens if I exceed my plan limits?",
      answer: "On the free plan, you'll need to wait until the next month or upgrade to Pro. Pro users have unlimited links. We'll notify you before any limits are reached."
    }
  ];

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How can we
              <span className="text-primary block">help you?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {filteredFaqs.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {expandedFaq === item.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedFaq === item.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQ items found matching "{searchTerm}"</p>
                <p className="mt-2">Try a different search term or contact us directly.</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-blue-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">help@cleanlink.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-accent mr-3" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 9am-5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Priority Support?</h3>
                <p className="mb-4">Pro users get priority email support with responses within 4 hours.</p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
