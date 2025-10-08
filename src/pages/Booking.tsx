import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MessageSquare } from "lucide-react";

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Book a Free Consultation
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Let's discuss your website project and how we can help your NYC business grow online
            </p>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What to Expect</h2>
                <p className="text-lg text-muted-foreground">
                  Our consultation is completely free with no obligations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: MessageSquare,
                    title: "Discuss Your Needs",
                    description: "Tell me about your business, goals, and what you need from your website",
                  },
                  {
                    icon: Calendar,
                    title: "Get a Custom Quote",
                    description: "Receive a transparent, itemized quote with no hidden fees or surprises",
                  },
                  {
                    icon: Clock,
                    title: "Quick Timeline",
                    description: "Learn exactly when your website will be ready and what the process looks like",
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-border text-center">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                        <item.icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-border">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl">Request a Consultation</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below or contact us directly to schedule your free consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Embedded Booking Form */}
                  <div className="space-y-6">
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 text-center space-y-4">
                      <h3 className="text-xl font-semibold">Contact Us to Schedule</h3>
                      <div className="space-y-3 text-muted-foreground">
                        <p className="flex items-center justify-center gap-2">
                          <span className="font-medium">Email:</span>
                          <a href="mailto:contact@nycwebsitebuilder.com" className="text-accent hover:underline">
                            contact@nycwebsitebuilder.com
                          </a>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <span className="font-medium">Phone:</span>
                          <a href="tel:+19176975255" className="text-accent hover:underline">
                            (917) 697-5255
                          </a>
                        </p>
                      </div>
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Or use our quote request form:
                        </p>
                        <a 
                          href="/contact" 
                          className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 bg-accent text-accent-foreground hover:shadow-accent shadow-md h-12 px-6 py-3"
                        >
                          Go to Contact Form
                        </a>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-6 border-t border-border">
                      <h4 className="font-semibold mb-3">Before Your Consultation</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Think about your website goals and what features you need</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Gather any branding materials (logo, colors, photos)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Have examples of websites you like ready to share</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>Prepare any questions about pricing, timeline, or process</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "How long does the consultation take?",
                    answer: "Typically 20-30 minutes. We can go longer if needed to fully discuss your project.",
                  },
                  {
                    question: "Do I need to prepare anything?",
                    answer: "Just come ready to talk about your business and goals. Having examples of websites you like is helpful but not required.",
                  },
                  {
                    question: "Is there really no obligation?",
                    answer: "Absolutely none. The consultation is completely free, and you're under no obligation to work with us afterward.",
                  },
                  {
                    question: "When can we start if I decide to move forward?",
                    answer: "Most projects can start within a week of approval. We'll give you exact timelines during the consultation.",
                  },
                ].map((faq, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 text-lg">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
