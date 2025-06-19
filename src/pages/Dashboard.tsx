
import { useState } from 'react';
import { BarChart3, ExternalLink, Copy, Calendar, Globe, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for demonstration
  const stats = {
    totalClicks: 1247,
    totalLinks: 23,
    avgClickRate: 54.2,
    topCountry: 'United States'
  };

  const recentLinks = [
    {
      id: 1,
      shortUrl: 'clean.li/launch2024',
      originalUrl: 'https://example.com/product-launch-campaign-2024?utm_source=twitter&utm_medium=social&fbclid=xyz123',
      clicks: 127,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      shortUrl: 'clean.li/Ab12Zx',
      originalUrl: 'https://newsletter.example.com/latest-edition?ref=homepage&utm_campaign=weekly',
      clicks: 89,
      createdAt: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      shortUrl: 'clean.li/Cd34Yw',
      originalUrl: 'https://blog.example.com/how-to-clean-urls?source=google&gclid=abc456',
      clicks: 45,
      createdAt: '2024-01-13',
      status: 'active'
    }
  ];

  const clickAnalytics = [
    { date: '2024-01-15', clicks: 45, referrer: 'twitter.com', country: 'US' },
    { date: '2024-01-15', clicks: 23, referrer: 'linkedin.com', country: 'UK' },
    { date: '2024-01-14', clicks: 67, referrer: 'direct', country: 'US' },
    { date: '2024-01-14', clicks: 34, referrer: 'facebook.com', country: 'CA' },
    { date: '2024-01-13', clicks: 28, referrer: 'google.com', country: 'US' }
  ];

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    toast({
      title: "Link copied!",
      description: "Short link copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your link performance and audience insights</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <MousePointer className="w-8 h-8 text-primary mb-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalClicks.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 text-accent mb-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Links</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLinks}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgClickRate}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-green-500 mb-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Top Country</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.topCountry}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Links */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Links</h2>
                <Button variant="outline" size="sm">
                  View All Links
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentLinks.map((link) => (
                  <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-mono text-primary bg-blue-50 px-2 py-1 rounded">
                          {link.shortUrl}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyLink(link.shortUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{link.clicks} clicks</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{link.originalUrl}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created {link.createdAt}</span>
                      <span className="text-accent font-medium">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Click Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Referrer</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clickAnalytics.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>{row.clicks}</TableCell>
                      <TableCell className="text-gray-600">{row.referrer}</TableCell>
                      <TableCell>{row.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
