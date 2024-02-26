"use client";
import React, { useContext, useEffect, useState } from 'react';

interface IGlobalContextProps {
  user: any;
  setUser: (user: any) => void;
  isSignIn:boolean,
  setSignIn: (isSignIn: boolean) => void;
  isSignUp:boolean,
  setSignUp: (isSignUp: boolean) => void;
  isLoading:boolean,
  setIsLoading: (isSignUp: boolean) => void;
  
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: undefined,
  setUser: ()=>{},
  isSignIn:true,
  setSignIn:()=>{},
  isSignUp:false,
  setSignUp:()=>{},
  isLoading:false,
  setIsLoading:()=>{}
  
});

export const GlobalContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
  const [isSignUp, setSignUp] = useState(false);


  
  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
        isSignIn:isSignIn,
        setSignIn:setSignIn,
        isSignUp:isSignUp,
        setSignUp:setSignUp,
        isLoading:isLoading,
        setIsLoading:setIsLoading
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);