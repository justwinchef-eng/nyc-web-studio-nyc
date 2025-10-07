import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, ShoppingCart, Calendar, Briefcase, FileText, Sparkles } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Business Websites",
      description: "Professional websites that showcase your business and attract customers.",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Sites",
      description: "Sell online with beautiful, conversion-optimized online stores.",
    },
    {
      icon: Calendar,
      title: "Booking Systems",
      description: "Integrated booking and scheduling for service-based businesses.",
    },
    {
      icon: Laptop,
      title: "Portfolio Sites",
      description: "Showcase your work with stunning portfolio websites.",
    },
    {
      icon: FileText,
      title: "Landing Pages",
      description: "High-converting landing pages for campaigns and promotions.",
    },
    {
      icon: Sparkles,
      title: "Custom Solutions",
      description: "Unique features tailored to your specific business needs.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Website Services for NYC Businesses
          </h2>
          <p className="text-lg text-muted-foreground">
            From concept to launch, I create custom websites that help your business grow. 
            All services include mobile-friendly design, SEO basics, and ongoing support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <service.icon className="text-accent" size={24} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button variant="default" size="lg">
              View All Services & Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
