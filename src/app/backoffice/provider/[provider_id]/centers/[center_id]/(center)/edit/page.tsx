
import Select from "@/components/Select"
import { Option, SelectValue } from "@/components/Select/components/type"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import EditCenter from "./EditCenter";
//import { useState } from "react";

export default async function NewCenterPage({params}) {
    const supabase=createServerComponentClient({cookies})
    const cities= await supabase.from('cities').select()
    const center= await supabase.from('centers').select().eq('id',params.center_id).single()
    
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


    return <EditCenter provider_id={params.provider_id} center={center.data} cities={cities_list} error={error} />
}