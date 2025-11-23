-- reviews 테이블 생성 SQL (수정 버전)
-- Supabase Dashboard > SQL Editor 에서 실행하세요

-- 1. 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Users can view their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;

-- 2. 테이블 생성
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 인덱스 생성
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews(created_at DESC);

-- 4. RLS (Row Level Security) 활성화
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책: 사용자는 자신의 리뷰만 조회 가능
CREATE POLICY "Users can view their own reviews"
  ON reviews
  FOR SELECT
  USING (auth.uid() = user_id);

-- 6. RLS 정책: 사용자는 자신의 리뷰를 생성 가능
CREATE POLICY "Users can insert their own reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. updated_at 자동 업데이트 함수 (이미 있을 수 있음)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. 기존 트리거 삭제 후 재생성
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
