import { useState } from "react";
import type { SignUpForm } from "../types/user";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const initialForm: SignUpForm = {
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: ""
}

const SignUp = () => {
    const [form, setForm] = useState<SignUpForm>(initialForm);
    const [error, setError] = useState<string | null>(null);
    const { signup } = useUser();
    const navigate = useNavigate();

    // 폼에 입력된 값 받기
    const {username, password, passwordConfirm, name, email} = form;

    // 입력값변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 기본동작 막기

        // 유효성 검사
        if(!username){
            setError("아이디를 입력하세요");
            return;
        }
        if(!password){
            setError("비밀번호를 입력하세요");
            return;
        }
        if(password !== passwordConfirm){
            setError("비밀번호가 일치하지 않습니다");
            return;
        }
        if(!name.trim()){
            setError("이름을 입력하세요");
            return;
        }
        if(!email){
            setError("이메일을 입력하세요");
            return;
        }

        // 회원가입 함수 호출
        signup({
            username,
            password,
            name: name.trim(),
            email: email.trim(),
            role: 'user'
        });
        alert("회원가입이 완료되었습니다. 로그인해주세요.")
        // signin페이지 만들면 로그인페이지로 이동
        navigate('/signin'); 
    }

    return (
        <div className="sign-up">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        placeholder="아이디를 입력해주세요"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="이름을 입력해주세요"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="이메일을 입력해주세요"
                        onChange={handleInputChange}
                    />
                </div>
                {error && 
                <p className="sign-up_error">{error}</p>}
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default SignUp;