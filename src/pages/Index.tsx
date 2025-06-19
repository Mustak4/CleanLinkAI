
import Header from '@/components/Header';
import URLSanitizer from '@/components/URLSanitizer';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <URLSanitizer />
        </div>
      </main>
      
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
