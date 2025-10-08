import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Zap, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for NYC Businesses",
      description: "I'm dedicated to helping local NYC businesses thrive online with websites that truly represent their brand and connect with their community.",
    },
    {
      icon: Users,
      title: "Personal Service",
      description: "You work directly with me—no account managers or middlemen. I take the time to understand your business and create exactly what you need.",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "I deliver beautiful, functional websites quickly without compromising quality. Most projects are completed within 2-4 weeks.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "My websites are built to attract customers, rank well in search engines, and provide a seamless experience on any device.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About NYC Web Design
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Helping NYC small businesses succeed online with affordable, professional websites
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              </div>
              
              <div className="prose prose-lg max-w-none space-y-6 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  I started NYC Web Design with a simple mission: make professional web design accessible 
                  and affordable for New York City's small businesses. Having worked with countless local 
                  entrepreneurs, I've seen how crucial a strong online presence is—and how confusing and 
                  expensive it can seem to get started.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Too many NYC businesses are either stuck with outdated websites or paying premium agency 
                  prices for simple sites. I believe every business deserves a beautiful, functional website 
                  that brings in customers—without breaking the bank.
                </p>
                
                <p className="text-lg leading-relaxed">
                  That's why I offer transparent, affordable pricing and work directly with you to create 
                  exactly what your business needs. No upselling, no hidden fees, no complicated jargon. 
                  Just honest web design that gets results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're not just a web design service—we're your partner in building your online presence
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                            <value.icon size={24} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">{value.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-xl text-foreground/90 leading-relaxed">
                To empower NYC small businesses with professional, affordable websites that drive growth 
                and help them compete in the digital marketplace. We believe that every business—from 
                corner cafes to boutique salons—deserves a website that works as hard as they do.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Let's create a website that helps your NYC business thrive
            </p>
            <Link to="/booking">
              <Button variant="accent" size="lg">
                Schedule a Free Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
