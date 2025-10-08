import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Session } from "@supabase/supabase-js";
import { Calendar, Mail, Phone, Building, DollarSign, Clock, FileText, LogOut, Shield } from "lucide-react";

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
  user_id: string | null;
}

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        checkAdminStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }

      // Load quotes regardless of admin status
      await loadQuoteRequests(userId, !!data);
      
      // Load admin users if user is admin
      if (data) {
        await loadAdminUsers();
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
      await loadQuoteRequests(userId, false);
    }
  };

  const loadQuoteRequests = async (userId: string, isAdmin: boolean) => {
    try {
      let query = supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      // If not admin, only show user's own quotes
      if (!isAdmin) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

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

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "admin")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAdminUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load admin users: " + error.message,
        variant: "destructive",
      });
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
              <h1 className="text-4xl font-bold mb-2">
                {isAdmin ? "Admin Dashboard" : "My Quote Requests"}
              </h1>
              <p className="text-muted-foreground">
                {isAdmin 
                  ? "Manage all quote requests and admin users" 
                  : "View and track all your submitted quote requests"}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>

          {isAdmin && adminUsers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="text-accent" size={24} />
                Admin Users
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {adminUsers.map((admin) => (
                  <Card key={admin.id} className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="text-accent" size={16} />
                        <span className="font-medium">Admin</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        User ID: {admin.user_id}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Added: {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
              {isAdmin ? "All Quote Requests" : "My Quotes"}
            </h2>
            <p className="text-muted-foreground">
              Total: {quoteRequests.length}
            </p>
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