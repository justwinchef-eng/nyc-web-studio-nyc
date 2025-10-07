import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicesPreview />
      <WhyWorkWithMe />
      <PortfolioPreview />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
