import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CenterDetails from "./CenterDetails";

export default async function Center({params}) {
    const supabase=createServerComponentClient({cookies})
    const center= await supabase.from('centers').select().eq('id',params.center_id).single()
   
    return <CenterDetails provider={params.provider_id} center={center.data} error={center.error}/>
}