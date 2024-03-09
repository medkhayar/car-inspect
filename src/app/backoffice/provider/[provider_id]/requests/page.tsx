import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Appointments from "./Appointements"
import { cookies } from "next/headers"
import moment from "moment"

export default async function AppointmentsPage({params}){
    const supabase=createServerComponentClient({cookies})
    const centers= await supabase.from('centers').select(`
    metadata, 
    cities(name), 
    center_lines(
        id,
        name, 
        center_line_time_slots(
            day_of_week,
            from_time,
            to_time ,
            appointments(
                id,
                appointment_date, 
                metadata,
                client_vehicles(*)
            )
        )
    )`).eq('provider',params.provider_id).eq('center_lines.center_line_time_slots.appointments.metadata->>status','pending')
    
  
    return <div>
        <Appointments provider_id={params.provider_id} centers={centers.data}/>
    </div>
}