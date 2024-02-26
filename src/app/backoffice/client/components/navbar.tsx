"use client";

import { addTest, setAsProvider } from "@/app/global-actions";
import Select from "@/components/Select";
import { Options,Option, SelectValue } from "@/components/Select/components/type";
import { AuthContext } from "@/contexts/AuthProvider";
import { Localized, TypeMetaV1 } from "@/metadata.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function NavBar(){
    const authContext=useContext(AuthContext)
    const supabase=createClientComponentClient()
    const router=useRouter()

    const handleLogout = async () => {
    const response = await fetch('/auth/v1/logout', {
      method: 'POST',
    });
    console.log(response)
    if (response.ok) {
      router.refresh()
    }
    else{
      //error
    }
  };

  const [typesOpen,setTypesOpen]=useState(false)
  const [select_vehicle_types,set_select_vehicle_types]=useState<any[]>([])

  useEffect(()=>{
  supabase.from("vehicle_types").select().then(r=>{
    const svt:Options= r.data!.map<Option>((c)=>{return {
      /*label:(c.type as Localized).en,
      value:c.id,
      description:(c.metadata! as VehicleTypeMetaV1).description.en,
      icon:<div className=' w-9 h-9 box-border mr-2' dangerouslySetInnerHTML={{__html:(c.metadata! as VehicleTypeMetaV1).icon.content}}></div>
      */
     label:(c.type as Localized).en,
     value:c.id,
     description:<>{(c.metadata! as TypeMetaV1).description.en}</>,
     icon:<div className=' w-9 h-9 box-border mr-2' dangerouslySetInnerHTML={{__html:(c.metadata! as TypeMetaV1).icon.content}}></div>
    }}) 
  set_select_vehicle_types(svt)
  })
},[]);

  const setProvider=()=>{
    setAsProvider().then(()=>{
      alert("njhuhiu")
    })
  }

  const [vehicleType,setVehicleType]=useState<SelectValue>(null)
    const changePassword=()=>{
        supabase.auth.updateUser({password:'00000000'}).then(ur=>{
            alert("done")
        })
    }
    return <>
        {JSON.stringify(authContext)}

        <Select menuIsOpen={typesOpen} setIsOpen={setTypesOpen} containerClass="lg:px-2" selecetedLabelClass={'lg:hidden'} title='Veuillez selectionnez un type de véhicule...'  classNames={{menu:'scale-110 lg:scale-100 w-[80%] max-w-md max-h-[475px]  lg:w-auto lg:absolute lg:top-0 lg:left-0 bg-white shadow-lg border rounded p-2 lg:py-1  lg:px-0 lg:mt-1.5 text-sm text-gray-700'}} isSearchable={true}   isClearable={false} placeholder=''  options={select_vehicle_types} value={vehicleType} onChange={(v)=>{setVehicleType(v)}} primaryColor={'blue'}/>
        
        <button onClick={()=>addTest()}>ADD TEST</button>
        <button onClick={changePassword}>ChangePassword</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={setProvider}>set provider</button>
    </>    
}