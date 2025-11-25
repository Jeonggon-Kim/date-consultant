-- Remove the permissive UPDATE policy for subscriptions
DROP POLICY IF EXISTS "Users can update their own subscription" ON subscriptions;

-- Optionally, if you want to allow users to ONLY update cancel_at_period_end, you could use:
-- CREATE POLICY "Users can cancel their own subscription"
--   ON subscriptions FOR UPDATE
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);
-- But since we are using Service Role in the API now, we don't need ANY update policy for users.
-- This is much safer!
