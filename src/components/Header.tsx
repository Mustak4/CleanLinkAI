
import { Link } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary rounded-lg">
            <Link className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">CleanLinkAI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
