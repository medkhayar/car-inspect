"use client";
import { AuthContext } from "@/contexts/AuthProvider";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default async function Registration() {
    const router=useRouter()
    const supabase= createClientComponentClient()
    const setAsClient=()=>{
      supabase.auth.updateUser({data:{
          is_client:true,
          is_provider:false
      }}).then(({data:{user}})=>{
        const url=(`/backoffice/client/${user!.id}/`)
        router.push(url)
      }) 
  }
  
    const setAsProvider=()=>{
      supabase.auth.updateUser({data:{
        is_client:false,
        is_provider:true,
        company:{
          logo:null,
          name:"",
          address:"",
          city:null,
          zipcode:"",
          manager:{
            name:"",
            email:"",
            phone:""
          },
          support:{
            name:"",
            email:"",
            phone:""
          }
        }
      }}).then(({data:{user}})=>{
        supabase.from('providers').insert({id:user!.id}).then(()=>{
          const url=(`/backoffice/provider/${user!.id}/profil`)
          router.push(url)
        });
      }) 
  }
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col">
          <Link href='/' className="flex items-center sm:self-start text-picton-blue-600 py-6">
                <svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={120} viewBox="0 0 300 300" width={120} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        fill="currentColor"
                        d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                    />
                </g>
            </svg>
            <h2 className="block text-2xl text-gray-700 font-bold leading-normal pl-3">Car Inspect</h2>
        </Link>
        <div className="p-6">
          <h3>Please choose an account type</h3>
        </div>
        <div className="flex flex-col md:flex-row pb-12">
          <button className="p-6 border-[1px] flex flex-col border-[#eeeeee] m-3 hover:border-[#333333]" onClick={setAsClient} >
            <img src="/assets/user.svg"  className="h-44 w-52 object-cover p-4"/>
            <span className="px-6 font-bold">Client</span>
          </button>
          
          <button className="p-6 border-[1px] flex flex-col border-[#eeeeee] m-3 hover:border-[#333333]" onClick={setAsProvider} >
            <img src="/assets/inspect.png" className="h-44 w-52 object-cover"/>
            <span className="px-6 font-bold">Provider</span>
          </button>
        </div>
        </div>
      </div>
    )
  }