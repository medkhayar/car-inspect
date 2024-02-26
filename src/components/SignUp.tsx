"use client";
import { useGlobalContext } from "@/contexts/GlobalContext"
import Link from "next/link"
import { useState } from "react"
import AccessWithGoogle from "./AccessWithGoogle";

export function SignUp(){
    const {setSignUp} = useGlobalContext()
    const [loading,setLoading] = useState(false)
    const [isCompany,setIsCompany] = useState(true)


    return <div className="flex flex-col items-center  w-full sm:w-2/3 md:h-full md:w-2/3 xl:w-2/5 p-8  md:p-10 lg:p-12 sm:rounded-lg md:rounded-none bg-white overflow-y-auto">
    <Link href='/' className="flex items-center sm:self-start text-picton-blue-600">
                                    <svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <path
                                                fill="currentColor"
                                                d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                            />
                                        </g>
                                    </svg>
                                    <h2 className="block text-base text-gray-700 font-bold leading-normal pl-3">Car Inspect</h2>
                                </Link>
      <div className="flex max-w-md w-full cente items-center justify-center flex-1">
      <div className="py-6 w-full">
        
      <div className="flex flex-col overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
     
  
      <p className="text-xl text-gray-600 text-center mb-4">Sign Up!</p>
      <AccessWithGoogle label="Sign up with Google"/>
      <div className="mt-4 flex items-center justify-between mb-4">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <a className="text-xs text-center text-gray-500 uppercase">or Create an account</a>
          <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
      <div className="mt-2 flex items-center justify-between">
          <a className="text-xs left text-gray-500 uppercase pr-4">Account type</a>
      </div>
      
      <div className="mt-2 flex flex-row">
            <div className="flex flex-row items-center justify-center flex-1">
                <input id="company" name="type"type="radio" checked={isCompany} onChange={(e)=>{setIsCompany(e.currentTarget.checked) ;console.log(e.currentTarget.checked)}}/>
                <label className="pl-3 cursor-pointer" htmlFor="company">Company</label>
            </div>
            
            <div className="flex flex-row items-center justify-center flex-1">
                <input id="client" name="type" type="radio" onChange={(e)=>{setIsCompany(!e.currentTarget.checked)}}/>
                <label className="pl-3 cursor-pointer" htmlFor="client">Person</label>
            </div>
      </div>
      <div className="mt-2 flex items-center justify-between pt-4">
          <a className="text-xs text-center text-gray-500 uppercase">Account holder</a>
      </div>

      {isCompany && <>

        <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company name</label>
            <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"/>
        </div>
        </>}
      {!isCompany &&<> 
      <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">First name</label>
          <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"/>
      </div>
      <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last name</label>
          <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"/>
      </div>
      </>}
      <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"/>
      </div>
      <div className="mt-2">
          <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          </div>
          <input className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"/>
      </div>
      <div className="mt-8">
          <button className="flex flex-row justify-center bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
          {!loading && <>Sign up</>}
            {loading && <>
              <svg className="w-5 h-5 mr-3 -ml-1 text-white-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
              </svg>
              <span>Signing in ...</span>
              </>}
          </button>
      </div>
      <div className=" flex items-center justify-center">
        <p className="flex flex-col items-center justify-center mt-2 text-center text-md text-gray-500">
            {/*error*/}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-center">
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Already a member?</span>
            <a onClick={()=>setSignUp(false)}
              className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
              in</a>
          </p>
      </div>
  </div>

        </div>
      </div>
    </div>
}