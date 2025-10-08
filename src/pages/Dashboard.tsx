import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Session } from "@supabase/supabase-js";
import { Calendar, Mail, Phone, Building, DollarSign, Clock, FileText, LogOut } from "lucide-react";

interface QuoteRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  service_type: string | null;
  budget: string | null;
  project_details: string | null;
  timeline: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadQuoteRequests();
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadQuoteRequests();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadQuoteRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setQuoteRequests(data || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Quotes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-lg">Loading your quotes...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Quote Requests</h1>
              <p className="text-muted-foreground">
                View and track all your submitted quote requests
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>

          {quoteRequests.length === 0 ? (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>No Quote Requests Yet</CardTitle>
                <CardDescription>
                  You haven't submitted any quote requests yet. Ready to start your project?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="accent" onClick={() => navigate("/contact")}>
                  Request a Quote
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {quoteRequests.map((quote) => (
                <Card key={quote.id} className="border-border shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{quote.business_name || "Quote Request"}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar size={14} />
                          Submitted {new Date(quote.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        Pending Review
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Mail className="text-accent mt-1" size={16} />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p className="text-sm">{quote.email}</p>
                        </div>
                      </div>

                      {quote.phone && (
                        <div className="flex items-start gap-2">
                          <Phone className="text-accent mt-1" size={16} />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                            <p className="text-sm">{quote.phone}</p>
                          </div>
                        </div>
                      )}

                      {quote.service_type && (
                        <div className="flex items-start gap-2">
                          <Building className="text-accent mt-1" size={16} />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                            <p className="text-sm capitalize">{quote.service_type.replace('-', ' ')}</p>
                          </div>
                        </div>
                      )}

                      {quote.budget && (
                        <div className="flex items-start gap-2">
                          <DollarSign className="text-accent mt-1" size={16} />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Budget</p>
                            <p className="text-sm">{quote.budget}</p>
                          </div>
                        </div>
                      )}

                      {quote.timeline && (
                        <div className="flex items-start gap-2">
                          <Clock className="text-accent mt-1" size={16} />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                            <p className="text-sm">{quote.timeline}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {quote.project_details && (
                      <div className="flex items-start gap-2 pt-2 border-t">
                        <FileText className="text-accent mt-1" size={16} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Project Details</p>
                          <p className="text-sm whitespace-pre-wrap">{quote.project_details}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        We'll review your request and get back to you within 24 hours.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;