-- 1. Backfill: Ensure all existing users have a subscription record
INSERT INTO public.subscriptions (user_id, is_subscribed)
SELECT id, FALSE FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.subscriptions);

-- 2. Trigger: Automatically create subscription record for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, is_subscribed)
  VALUES (new.id, FALSE);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Security: Drop the unsafe INSERT policy
DROP POLICY IF EXISTS "Users can insert their own subscription" ON subscriptions;
