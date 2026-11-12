import { useEffect, useState } from "react";
import type { LoginForm, NewUser, User, UserUpdateForm } from "../types/user";
import { UserContext } from "./UserContext";
import {
    getUsers,
    requestLogin,
    createUser,
    modifyUser,
    getMe,
    requestLogout
} from "../api/users";

const UserProvider = ({children} : {children: React.ReactNode}) => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    // 로그인 인증 상태 확인 여부
    const [ isAuthLoading, setIsAuthLoading ] = useState<boolean>(true);

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

    // 새로고침해도 로그인 유지
    useEffect(() => {
        getMe()
            .then(setCurrentUser)
            .catch(() => setCurrentUser(null))
            .finally(() => setIsAuthLoading(false))
    });

    // 로그아웃 함수
    const logout = async () => {
        await requestLogout();
        setCurrentUser(null);
    }

    // 회원정보 변경 함수
    const updateUser = async (form: UserUpdateForm) => {
        if(!currentUser) return; 
        const updateUser = await modifyUser(currentUser?.id, form);
        setCurrentUser(updateUser); // 헤더의 이름이 바로 변경됨
        setUsers(await getUsers()); // 회원 배열에 저장
    }

    return(
        <UserContext.Provider value={{
            users,
            currentUser,
            isAuthLoading,
            signup,
            login,
            logout,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;