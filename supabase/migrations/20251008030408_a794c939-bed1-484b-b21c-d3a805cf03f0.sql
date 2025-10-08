-- Add user_id column to quote_requests table
ALTER TABLE public.quote_requests 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the old public insert policy
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;

-- Create new policy requiring authentication for quote submission
CREATE POLICY "Authenticated users can submit quote requests"
ON public.quote_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update the existing select policy for users to check user_id instead of email
DROP POLICY IF EXISTS "Users can view their own quote requests" ON public.quote_requests;

CREATE POLICY "Users can view their own quote requests"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);