import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import moment from "moment"
import CurrentAppointments from "./CurrentAppointments"

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
    
    const centers_todays_appointments= await supabase.from('centers').select(`
    id,
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
                metadata,
                client_vehicles(*)
            )
        )
    )`).eq('provider',params.provider_id).eq('center_lines.center_line_time_slots.appointments.metadata->>status','approved')
    .eq('center_lines.center_line_time_slots.appointments.appointment_date',moment().format('YYYY-MM-DD'));
    
    console.log(centers_todays_appointments)
    return <div>
        <CurrentAppointments provider_id={params.provider_id} initial_centers={centers_todays_appointments.data}></CurrentAppointments>
    </div>
}