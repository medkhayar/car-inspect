"use client"
import SignIn from '@/components/SignIn' 
//import { SignUp } from './SignUp' 

import styles from '@/styles/access.module.css'
import { useGlobalContext } from "@/contexts/GlobalContext"
import signin_side from '../../images/sigin-side.jpg'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { SignUp } from '@/components/SignUp'

export default function AccessPage(){

  const {user,setUser,isSignIn,isSignUp,setSignIn,setSignUp} = useGlobalContext()
 
  useEffect(()=>{
    if(user){
      if(user.user_metadata.is_client){
          const url=(`/backoffice/client/${user.id}`)
          redirect(url)
      }
      else if(user.user_metadata.is_provider){
          redirect(`/backoffice/provider/${user.id}`)
      }
      else
          redirect(`/registration`)
      }
  },[user])

    return <>{(!user && isSignIn ) && <div className="fixed z-50 top-0 left-0 h-full w-full flex ">
      <a className='absolute z-50 right-0 top-0 px-4 py-4' href="#" onClick={()=>{setSignIn(false);setSignUp(false)}}><svg className='w-8 h-8' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg></a>
        <div className="flex flex-col sm:flex-row items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="signin-side sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-picton-blue-700 text-white bg-no-repeat bg-cover relative"
            >
            <div className="absolute bg-gradient-to-b from-picton-blue-600 to-picton-blue-400 opacity-75 inset-0 z-0"></div>
            <div className="w-full  max-w-md z-10">
              <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Car Inspect.</div>
              <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> What is Lorem Ipsum Lorem Ipsum is simply dummy
                text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it
                has?</div>
            </div>
           <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
       </ul>
          </div>
          {(isSignIn && !isSignUp) && <SignIn />}
          {isSignUp && <SignUp />}
          
        </div>
      </div>
    }
    </>
}