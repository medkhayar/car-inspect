
import Select from "@/components/Select"
import { Option, SelectValue } from "@/components/Select/components/type"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Profil from "./Profil";
//import { useState } from "react";

export default async function ProfilePage({params}) {
    const supabase=createServerComponentClient({cookies})
    const cities= await supabase.from('cities').select()
    const user= await supabase.auth.getUser()
    
    let cities_list:Option[]=[];
    let error:any = null;
    if(cities.data){
        cities_list=cities.data!.map<Option>(c=> {return {
                label:c.name.en,
                value:c.id
            }
        })
    }
    else{
        error=cities.error
    }

    return <Profil user={user.data.user} client_id={params.client_id} cities={cities_list} error={error} />
}