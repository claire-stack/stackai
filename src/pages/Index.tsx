import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TemplatesSection from "@/components/TemplatesSection";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <ChatWindow/>
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <BlogSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
