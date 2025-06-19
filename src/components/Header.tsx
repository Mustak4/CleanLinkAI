
import { Link } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-2 bg-primary rounded-lg">
            <Link className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">CleanLinkAI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/#features')}
            className={`transition-colors ${isActive('/#features') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Features
          </button>
          <button 
            onClick={() => navigate('/pricing')}
            className={`transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/help')}
            className={`transition-colors ${isActive('/help') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Help
          </button>
          <Button 
            onClick={() => navigate('/signin')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
