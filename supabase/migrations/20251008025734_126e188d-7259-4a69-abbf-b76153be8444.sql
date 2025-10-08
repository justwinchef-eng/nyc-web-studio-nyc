-- Add policy to allow authenticated users to view their own quote requests
CREATE POLICY "Users can view their own quote requests"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (auth.email() = email);