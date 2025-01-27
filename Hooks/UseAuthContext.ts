import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";

export default function useAuthContext (){
    return useContext(AuthContext)
}