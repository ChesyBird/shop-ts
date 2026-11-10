export type Role = "user" | "admin";

// 회원 타입 정의
export interface User{
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    role: Role;
}

// 회원가입시 저장값
export type NewUser = Omit<User, "id">

// 회원가입 폼 타입(DTO : 화면으로 전달되는 데이터)
export interface SignUpForm extends Omit<User, "id" | "role">{
    passwordConfirm: string; // 비밀번호 확인
    // username: string;
    // password: string;
    // passwordConfirm: string;
    // name: string;
    // email: string;
}

// 로그인 폼
export interface LoginForm{
    username: string;
    password: string;
}
