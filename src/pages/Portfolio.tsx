import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "VidaSpa Wellness Center",
      description: "Modern wellness center website featuring online booking system, service showcase, and team bios. Built with a calming design to reflect the spa's brand.",
      category: "Business Website",
      technologies: ["React", "Tailwind CSS", "Booking Integration"],
      url: "https://vidaspa.com",
      features: ["Online Booking", "Service Gallery", "Team Profiles", "Contact Form"],
    },
    {
      title: "Brooklyn Cafe & Bakery",
      description: "Restaurant website with menu display, location info, and reservation system. Designed to showcase delicious food photography and inviting atmosphere.",
      category: "Restaurant Site",
      technologies: ["React", "Mobile-First Design", "Google Maps"],
      url: "#",
      features: ["Menu Display", "Reservations", "Location Map", "Photo Gallery"],
    },
    {
      title: "Creative Artist Portfolio",
      description: "Portfolio site for a local NYC artist featuring gallery showcase, artist bio, and contact form. Clean, minimal design to let the artwork shine.",
      category: "Portfolio Site",
      technologies: ["React", "Image Optimization", "Responsive Design"],
      url: "#",
      features: ["Image Gallery", "Artist Bio", "Exhibition History", "Contact Form"],
    },
    {
      title: "NYC Fitness Studio",
      description: "Fitness studio website with class schedules, trainer profiles, and membership signup. Energetic design matching the studio's brand.",
      category: "Business Website",
      technologies: ["React", "Scheduling System", "Payment Integration"],
      url: "#",
      features: ["Class Schedule", "Trainer Bios", "Membership Plans", "Online Signup"],
    },
    {
      title: "Local Boutique Shop",
      description: "E-commerce site for a Brooklyn boutique featuring product catalog, shopping cart, and secure checkout. Beautiful product photography and smooth UX.",
      category: "E-commerce",
      technologies: ["React", "Stripe", "Inventory Management"],
      url: "#",
      features: ["Product Catalog", "Shopping Cart", "Secure Checkout", "Order Tracking"],
    },
    {
      title: "Professional Photographer",
      description: "Photography portfolio with fullscreen galleries, about section, and booking form. Showcases stunning photography work in an elegant layout.",
      category: "Portfolio Site",
      technologies: ["React", "Lightbox Gallery", "Contact Forms"],
      url: "#",
      features: ["Portfolio Gallery", "Client Testimonials", "Booking System", "Blog"],
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
              Portfolio
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Recent websites I've created for NYC businesses and entrepreneurs. Each project 
              is custom-designed to reflect the unique brand and business goals.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 group flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <ExternalLink className="text-muted-foreground group-hover:text-accent transition-colors" size={18} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <CardDescription className="text-base mb-4">{project.description}</CardDescription>
                    
                    <div className="space-y-4 mt-auto">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Key Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="outline" size="sm" className="w-full group-hover:border-accent">
                          View Project
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a Website Like These?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Let's create something beautiful for your business
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="/contact">Get Your Free Quote</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
