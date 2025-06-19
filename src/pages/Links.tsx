
import { useState } from 'react';
import { Edit, Trash2, Copy, ExternalLink, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import { toast } from '@/hooks/use-toast';

const Links = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [links, setLinks] = useState([
    {
      id: 1,
      shortUrl: 'clean.li/launch2024',
      originalUrl: 'https://example.com/product-launch-campaign-2024?utm_source=twitter&utm_medium=social&fbclid=xyz123',
      cleanedUrl: 'https://example.com/product-launch-campaign-2024',
      clicks: 127,
      createdAt: '2024-01-15',
      status: 'active',
      customSlug: true
    },
    {
      id: 2,
      shortUrl: 'clean.li/Ab12Zx',
      originalUrl: 'https://newsletter.example.com/latest-edition?ref=homepage&utm_campaign=weekly',
      cleanedUrl: 'https://newsletter.example.com/latest-edition',
      clicks: 89,
      createdAt: '2024-01-14',
      status: 'active',
      customSlug: false
    },
    {
      id: 3,
      shortUrl: 'clean.li/Cd34Yw',
      originalUrl: 'https://blog.example.com/how-to-clean-urls?source=google&gclid=abc456',
      cleanedUrl: 'https://blog.example.com/how-to-clean-urls',
      clicks: 45,
      createdAt: '2024-01-13',
      status: 'active',
      customSlug: false
    },
    {
      id: 4,
      shortUrl: 'clean.li/paused-campaign',
      originalUrl: 'https://example.com/old-campaign?utm_source=email&utm_medium=newsletter',
      cleanedUrl: 'https://example.com/old-campaign',
      clicks: 234,
      createdAt: '2024-01-10',
      status: 'paused',
      customSlug: true
    }
  ]);

  const filteredLinks = links.filter(link => 
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    toast({
      title: "Link copied!",
      description: "Short link copied to clipboard.",
    });
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link deleted",
      description: "The link has been permanently deleted.",
    });
  };

  const toggleStatus = (id: number) => {
    setLinks(links.map(link => 
      link.id === id 
        ? { ...link, status: link.status === 'active' ? 'paused' : 'active' }
        : link
    ));
    toast({
      title: "Status updated",
      description: "Link status has been changed.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Manager</h1>
              <p className="text-gray-600">Manage all your shortened links and their performance</p>
            </div>
            <Button className="bg-primary hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create New Link
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search links by URL or slug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filter
              </Button>
              <Button variant="outline">
                Export
              </Button>
            </div>
          </div>

          {/* Links Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short Link</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-mono text-primary bg-blue-50 px-2 py-1 rounded">
                          {link.shortUrl}
                        </code>
                        {link.customSlug && (
                          <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-sm text-gray-900 truncate">{link.cleanedUrl}</p>
                        <p className="text-xs text-gray-500 truncate">{link.originalUrl}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{link.clicks}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleStatus(link.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          link.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {link.status}
                      </button>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{link.createdAt}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyLink(link.shortUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`https://${link.shortUrl}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteLink(link.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredLinks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No links found matching your search.</p>
                <Button>Create Your First Link</Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredLinks.length} of {links.length} links
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Links;
