import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// 환경 변수 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// 브라우저에서 사용할 Supabase 클라이언트
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true, // 세션 유지
      autoRefreshToken: true, // 자동으로 토큰 갱신
      detectSessionInUrl: true, // URL에서 세션 감지
    },
    global: {
      fetch: (url, options = {}) => {
        // 모든 요청에 5초 타임아웃 적용
        return Promise.race([
          fetch(url, options),
          new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 5000)
          )
        ]);
      }
    }
  }
);
