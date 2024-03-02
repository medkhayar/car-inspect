import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Appointments from "./Appointements"
import { cookies } from "next/headers"

export default async function AppointmentsPage({params}){
    const supabase=createServerComponentClient({cookies})
    const centers= await supabase.from('centers').select(`
    metadata, 
    cities(name), 
    center_lines(
        name, 
        center_line_time_slots(
            day_of_week,
            from_time,
            to_time ,
            appointments(
                id,
                appointment_date, 
                client_vehicles(*)
            )
        )
    )`).eq('provider',params.provider_id)
    return <Appointments centers={centers.data}/>
}