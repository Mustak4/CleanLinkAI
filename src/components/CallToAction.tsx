
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
