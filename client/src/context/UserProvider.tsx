import { useEffect, useState } from "react";
import type { LoginForm, NewUser, User } from "../types/user";
import { UserContext } from "./UserContext";
import { getUsers, requestLogin, createUser } from "../api/users";

const UserProvider = ({children} : {children: React.ReactNode}) => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // 회원 목록 조회
    useEffect(() => {
        getUsers()
        .then(setUsers)
        .catch(err => console.log("회원 목록 조회 오류", err))
    }, []);

    // 회원가입 함수
    const signup = async ( newUser: NewUser )=>{
        await createUser(newUser);  // DB에 저장
        setUsers(await getUsers()); // 회원목록에 가져오기
    }

    // 로그인 함수
    const login = async (loginForm: LoginForm) => {
        try {
            const user = await requestLogin(loginForm);
            setCurrentUser(user); // 로그인 한 유저 저장
            return true;
        } catch {
            return false;
        }
    }

    // 로그아웃 함수
    const logout = () => {
        setCurrentUser(null);
    }

    return(
        <UserContext.Provider value={{
            users,
            currentUser,
            signup,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;