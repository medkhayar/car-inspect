"use client"

import React, {createContext, useContext} from "react";

export const AuthContext = createContext<any>(null)

export default function AuthProvider({value,children}){
return (
<AuthContext.Provider value={value}>
 {children}
</AuthContext.Provider>
)
}
export const useAuthContext = () => useContext(AuthContext);