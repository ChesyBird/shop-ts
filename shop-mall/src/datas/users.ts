// 임시 데이터
import type { User } from '../types/user';

// 연습용 데이터입니다. 실제 서비스에서는 비밀번호를 그대로 저장하지 않고 서버에서 암호화해 보관합니다.
export const initialUsers: User[] = [
  { id: 1, username: "admin0", password: "a1234567", name: "관리자", email: "admin@spaceshop.com", role: "admin" },
  { id: 2, username: "hong1", password: "h1234567", name: "홍길동", email: "hong@example.com", role: "user" },
  { id: 3, username: "park2", password: "p1234567", name: "박상희", email: "kim@example.com", role: "user" },
  { id: 4, username: "ko123", password: "k1234567", name: "고담덕", email: "lee@example.com", role: "user" },
];