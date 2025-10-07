import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Tell me about your project and let's discuss how I can help bring your NYC business online
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="text-accent" size={20} />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:nycwebsitebuilder@gmail.com" className="text-primary hover:text-accent transition-colors">
                      nycwebsitebuilder@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="text-accent" size={20} />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+19293457714" className="text-primary hover:text-accent transition-colors">
                      (929) 345-7714
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="text-accent" size={20} />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Serving all NYC boroughs:<br />
                      Manhattan, Brooklyn, Queens,<br />
                      Bronx, and Staten Island
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-accent text-accent-foreground">
                  <CardHeader>
                    <CardTitle>Quick Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-accent-foreground/90">
                      Our team will review your request and respond within 24 hours. 
                      Looking forward to working with you!
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Request a Quote</CardTitle>
                    <CardDescription className="text-base">
                      Fill out the form below and I'll get back to you with a custom quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input 
                            id="name" 
                            name="name"
                            placeholder="John Doe" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="john@example.com" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            type="tel" 
                            placeholder="(123) 456-7890" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business">Business Name *</Label>
                          <Input 
                            id="business" 
                            name="business"
                            placeholder="Your Business" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Type of Website *</Label>
                        <Select name="service" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business Website</SelectItem>
                            <SelectItem value="ecommerce">E-commerce Site</SelectItem>
                            <SelectItem value="booking">Booking/Scheduling Site</SelectItem>
                            <SelectItem value="spa">Spa/Wellness Center</SelectItem>
                            <SelectItem value="tattoo">Tattoo Shop</SelectItem>
                            <SelectItem value="portfolio">Portfolio Site</SelectItem>
                            <SelectItem value="landing">Landing Page</SelectItem>
                            <SelectItem value="other">Other/Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Estimated Budget</Label>
                        <Select name="budget">
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under1k">Under $1,000</SelectItem>
                            <SelectItem value="1k-2k">$1,000 - $2,000</SelectItem>
                            <SelectItem value="2k-3k">$2,000 - $3,000</SelectItem>
                            <SelectItem value="over3k">Over $3,000</SelectItem>
                            <SelectItem value="notsure">Not Sure Yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea 
                          id="message" 
                          name="message"
                          placeholder="Tell me about your business, goals, and what features you need..." 
                          rows={6}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Desired Timeline</Label>
                        <Input 
                          id="timeline" 
                          name="timeline"
                          placeholder="e.g., Within 1 month, ASAP, flexible" 
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="accent" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">What Happens Next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your request and respond within 24 hours
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold">Free Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll schedule a call to discuss your project in detail
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold">Custom Quote</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a detailed proposal and pricing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
