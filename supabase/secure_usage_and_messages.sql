-- Remove the permissive UPDATE policy for usage_tracking
DROP POLICY IF EXISTS "Users can update their own usage" ON usage_tracking;

-- Remove the permissive INSERT policy for usage_tracking
DROP POLICY IF EXISTS "Users can create their own usage" ON usage_tracking;

-- Remove the permissive INSERT policy for messages
DROP POLICY IF EXISTS "Users can create messages in their own chat rooms" ON messages;

-- Remove the permissive UPDATE policy for messages
DROP POLICY IF EXISTS "Users can update messages in their own chat rooms" ON messages;
