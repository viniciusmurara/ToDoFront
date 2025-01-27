import { createContext, useEffect, useState } from "react";
import User from "@/Model/User";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";


export const AuthContext = createContext<AuthContextProps>({})

interface AuthContextProps  { 
     user? : User,
     setUser? : (user : User) => void,
     logOut? : () => void
}

export function AuthProvider(props : any) {
    const  router = useRouter();

    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        const usuarioCookie = Cookies.get('Usuario');

        if(usuarioCookie){
            setUser(JSON.parse(usuarioCookie));
            router.push('/todo')
        }
        else{
            router.push('/auth/login')
        }

    }, [])
    
    function logOut(){
        Cookies.remove('Usuario')
        setUser(undefined)
    }

    return (

        <AuthContext.Provider value={{user: user, setUser : setUser, logOut}}>
            {props.children}
        </AuthContext.Provider>

    )
}