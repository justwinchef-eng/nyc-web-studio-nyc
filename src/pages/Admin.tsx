import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { LogOut, Mail, Phone, Building, DollarSign, Clock, Shield } from "lucide-react";

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

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        // Check admin status after session is set
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
        setIsLoading(false);
        return;
      }

      setIsAdmin(!!data);
      if (data) {
        loadQuoteRequests();
        loadAdminUsers();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
      setIsLoading(false);
    }
  };

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
        title: "Error",
        description: "Failed to load quote requests: " + error.message,
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
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <main className="pt-24 container mx-auto px-4">
          <Card className="max-w-md mx-auto mt-20 border-border">
            <CardHeader>
              <CardTitle className="text-center">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                You need admin privileges to access this page.
              </p>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-24">
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  Manage quote requests
                </p>
              </div>
              <Button onClick={handleSignOut} variant="secondary" size="lg">
                <LogOut className="mr-2" size={18} />
                Sign Out
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="text-accent" size={24} />
                Admin Users
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {adminUsers.length === 0 ? (
                  <Card className="border-border">
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No admin users found</p>
                    </CardContent>
                  </Card>
                ) : (
                  adminUsers.map((admin) => (
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
                  ))
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Quote Requests</h2>
              <p className="text-muted-foreground">
                Total requests: {quoteRequests.length}
              </p>
            </div>

            {quoteRequests.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No quote requests yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {quoteRequests.map((request) => (
                  <Card key={request.id} className="border-border shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1">
                            {request.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Mail className="text-accent" size={16} />
                          <a
                            href={`mailto:${request.email}`}
                            className="text-sm hover:text-accent transition-colors"
                          >
                            {request.email}
                          </a>
                        </div>
                        {request.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="text-accent" size={16} />
                            <a
                              href={`tel:${request.phone}`}
                              className="text-sm hover:text-accent transition-colors"
                            >
                              {request.phone}
                            </a>
                          </div>
                        )}
                        {request.business_name && (
                          <div className="flex items-center gap-2">
                            <Building className="text-accent" size={16} />
                            <span className="text-sm">{request.business_name}</span>
                          </div>
                        )}
                        {request.budget && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="text-accent" size={16} />
                            <span className="text-sm">{request.budget}</span>
                          </div>
                        )}
                        {request.timeline && (
                          <div className="flex items-center gap-2">
                            <Clock className="text-accent" size={16} />
                            <span className="text-sm">{request.timeline}</span>
                          </div>
                        )}
                      </div>

                      {request.service_type && (
                        <div>
                          <p className="text-sm font-medium mb-1">Service Type:</p>
                          <p className="text-sm text-muted-foreground">{request.service_type}</p>
                        </div>
                      )}

                      {request.project_details && (
                        <div>
                          <p className="text-sm font-medium mb-1">Project Details:</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {request.project_details}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
