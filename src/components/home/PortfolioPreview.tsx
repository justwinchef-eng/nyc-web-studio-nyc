import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const PortfolioPreview = () => {
  const projects = [
    {
      title: "VidaSpa Wellness",
      description: "Modern wellness center website with online booking and service showcase",
      category: "Business Website",
      url: "https://vidaspa.com",
    },
    {
      title: "Local Cafe Demo",
      description: "Restaurant website with menu, reservations, and location info",
      category: "Restaurant Site",
      url: "#",
    },
    {
      title: "Creative Portfolio",
      description: "Artist portfolio with gallery, bio, and contact form",
      category: "Portfolio Site",
      url: "#",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            See examples of websites I've created for NYC businesses and entrepreneurs. 
            Each project is custom-designed to reflect the unique brand and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 group">
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
              <CardContent>
                <CardDescription className="text-base mb-4">{project.description}</CardDescription>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  View Project →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/portfolio">
            <Button variant="outline" size="lg">
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
