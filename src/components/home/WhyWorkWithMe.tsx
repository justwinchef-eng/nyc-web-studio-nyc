import { Heart, Clock, Users, Shield } from "lucide-react";

const WhyWorkWithMe = () => {
  const reasons = [
    {
      icon: Heart,
      title: "Community Connection",
      description: "I'm a local NYC web designer who understands the unique needs of neighborhood businesses. Your success is my success.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Clear communication, honest pricing, and no hidden fees. You'll know exactly what you're getting from day one.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Most websites delivered within 2-3 weeks. I know you need to get online quickly without sacrificing quality.",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "You work directly with me—no outsourcing, no middlemen. I learn your business and craft a site that truly represents you.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Work With Me?
          </h2>
          <p className="text-lg text-muted-foreground">
            As a local NYC web designer, I bring more than just technical skills—I bring genuine care 
            for helping neighborhood businesses succeed online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <reason.icon className="text-accent" size={28} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
