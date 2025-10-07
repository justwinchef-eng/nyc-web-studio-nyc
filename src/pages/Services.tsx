import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Services = () => {
  const packages = [
    {
      name: "Starter",
      price: "$799",
      description: "Perfect for small businesses just getting online",
      features: [
        "Up to 5 pages",
        "Mobile-responsive design",
        "Contact form",
        "Basic SEO setup",
        "Social media links",
        "Google Maps integration",
        "Basic booking/inquiry form",
        "Photo gallery or portfolio section",
        "Basic analytics (Google Analytics)",
        "1 social media feed embed",
        "WhatsApp or SMS chat button",
        "1 revision included",
        "2 weeks delivery",
        "1 month support",
      ],
    },
    {
      name: "Professional",
      price: "$1,499",
      description: "Ideal for established businesses needing more features",
      features: [
        "Up to 10 pages",
        "Custom design",
        "Advanced SEO",
        "Booking/scheduling system",
        "Photo gallery",
        "Google Maps integration",
        "3 weeks delivery",
        "3 months support",
      ],
      popular: true,
    },
    {
      name: "E-commerce",
      price: "$2,499",
      description: "Full online store for selling products",
      features: [
        "Unlimited products",
        "Shopping cart",
        "Payment processing",
        "Inventory management",
        "Custom design",
        "Advanced SEO",
        "4 weeks delivery",
        "6 months support",
      ],
    },
  ];

  const addons = [
    { name: "Additional Page", price: "$99" },
    { name: "Monthly Maintenance (updates, security, support)", price: "$50/mo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Website Services & Pricing
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Transparent, affordable pricing for NYC small businesses. All packages include 
              mobile-friendly design, basic SEO, and ongoing support.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative ${pkg.popular ? 'border-accent border-2 shadow-accent' : 'border-border'}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">{pkg.price}</div>
                    <CardDescription className="text-base">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="block pt-4">
                      <Button 
                        variant={pkg.popular ? "accent" : "default"} 
                        className="w-full"
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Add-On Services</h2>
                <p className="text-lg text-muted-foreground">
                  Enhance your website with these optional services
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((addon, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                  >
                    <span className="font-medium">{addon.name}</span>
                    <span className="text-primary font-bold">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Simple, straightforward process from concept to launch
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: "1", title: "Consultation", desc: "We discuss your goals and requirements" },
                { step: "2", title: "Design", desc: "I create mockups for your approval" },
                { step: "3", title: "Development", desc: "I build your custom website" },
                { step: "4", title: "Launch", desc: "We go live and I provide training" },
              ].map((item, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Contact me today for a free consultation and custom quote
            </p>
            <Link to="/contact">
              <Button variant="accent" size="lg">
                Request a Free Quote
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
