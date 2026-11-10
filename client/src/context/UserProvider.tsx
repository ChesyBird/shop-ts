import { useState } from "react";
import { initialUsers } from "../datas/users";
import type { LoginForm, NewUser, User } from "../types/user";
import { UserContext } from "./UserContext";

const UserProvider = ({children} : {children: React.ReactNode}) => {
    const [ users, setUsers ] = useState<User[]>(initialUsers);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // 회원가입 함수
    const signup = ( newUser: NewUser )=>{
        // 가입한 1명 회원
        const user: User = {...newUser, id: Date.now()}
        setUsers([...users, user])
    }

    // 로그인 함수
    const login = (loginForm: LoginForm) => {
        // 회원 목록에서 한 명의 회원을 찾기
        const found = users.find(user =>
            user.username === loginForm.username &&
            user.password === loginForm.password
        )
        if(!found) return false; // 회원이 없는 경우
        setCurrentUser(found); // 회원이 있는 경우 true 반환
        return true;
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