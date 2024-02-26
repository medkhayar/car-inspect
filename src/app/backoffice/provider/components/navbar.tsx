"use client";

import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

export default function NavBar(){
    const authContext=useContext(AuthContext)
    return <>
        {JSON.stringify(authContext)}
    </>    
}