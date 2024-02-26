import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EditLine from "./EditLine";

export default async function EditCenterLine({params}){
const supabase= createServerComponentClient({cookies})
   const {data,error}= await supabase.from('center_lines').select(`*,
   center_line_appointment_types(*, appointment_types(*)),
   center_line_energy_types(*, energy_types(*)),
   center_line_time_slots(*),
   center_line_vehicle_types(*, vehicle_types(*))
`  ).eq('id',params.line_id).single();

return <EditLine params={params} line={data} />
}