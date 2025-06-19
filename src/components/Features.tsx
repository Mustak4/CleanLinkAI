
import { BarChart3, Scissors, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Scissors,
      title: 'Smart URL Cleaning',
      description: 'Automatically removes tracking parameters, UTM codes, and marketing clutter from any URL.'
    },
    {
      icon: Zap,
      title: 'Instant Short Links',
      description: 'Generate clean, branded shortlinks in seconds. Custom slugs available for Pro users.'
    },
    {
      icon: BarChart3,
      title: 'Simple Analytics',
      description: 'Track clicks, referrers, and geographic data with our clean, focused dashboard.'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'We respect privacy. No unnecessary tracking, just the data you need to succeed.'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to
            <span className="text-primary block">clean and track links</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built specifically for digital marketers, creators, and indie founders who value clean, trackable links.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
