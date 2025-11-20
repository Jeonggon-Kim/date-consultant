-- 사용자 테이블 (Supabase Auth에서 자동 생성됨)

-- 채팅방 테이블
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT '새로운 재회 상담',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 메시지 테이블
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 구독 테이블
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  is_subscribed BOOLEAN DEFAULT FALSE NOT NULL,
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 사용량 추적 테이블 (이번 달 메시지 카운트)
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL, -- 'YYYY-MM' 형식
  message_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, month)
);

-- 인덱스 생성
CREATE INDEX idx_chat_rooms_user_id ON chat_rooms(user_id);
CREATE INDEX idx_messages_chat_room_id ON messages(chat_room_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_usage_tracking_user_id_month ON usage_tracking(user_id, month);

-- RLS (Row Level Security) 활성화
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 사용자는 자신의 채팅방만 조회/생성/수정/삭제 가능
CREATE POLICY "Users can view their own chat rooms"
  ON chat_rooms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat rooms"
  ON chat_rooms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat rooms"
  ON chat_rooms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat rooms"
  ON chat_rooms FOR DELETE
  USING (auth.uid() = user_id);

-- RLS 정책: 메시지
CREATE POLICY "Users can view messages from their own chat rooms"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = messages.chat_room_id
      AND chat_rooms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their own chat rooms"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = messages.chat_room_id
      AND chat_rooms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update messages in their own chat rooms"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = messages.chat_room_id
      AND chat_rooms.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages from their own chat rooms"
  ON messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = messages.chat_room_id
      AND chat_rooms.user_id = auth.uid()
    )
  );

-- RLS 정책: 구독
CREATE POLICY "Users can view their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscription"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS 정책: 사용량 추적
CREATE POLICY "Users can view their own usage"
  ON usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own usage"
  ON usage_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage"
  ON usage_tracking FOR UPDATE
  USING (auth.uid() = user_id);
