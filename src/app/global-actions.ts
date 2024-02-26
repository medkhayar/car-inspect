"use server";
import { Database } from '@/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';



export async function setAsProvider() {
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    const user= await supabase.auth.getUser()
    revalidatePath('/');
    return await supabase
    .auth.updateUser({data:{...user.data,is_provider:true,is_client:false}})
}
export async function getTests(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    return await supabase
    .from('test')
    .select()
}
export async function addTest(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    revalidatePath('/');
    const res = await supabase
    .from('test').upsert([{data:{name:`${randomUUID()}`}},{data:{name:`${randomUUID()}`}},{data:{name:`${randomUUID()}`}}]).select()
    console.log("restest",res)
    return res;
}

/*
    Center
 */
    export async function addNewCenterV0(provider,center) {
        console.log("center",center)
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        return await supabase
        .from('centers')
        .upsert({provider:provider,active:true,deleted:false,metadata:{...center},city:center.city})
        .select().single()
    }
    export async function editCenterV0(provider,center) {
        
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        return await supabase
        .from('centers')
        .update({metadata:{...center},city:center.city}).eq("id",center.id)
        .select().single()
    }
    export async function deleteCenterV0(center) {
        
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        return await supabase
        .from('centers')
        .update({deleted:true}).eq("id",center)
    }
    export async function deleteUserV0() {
        
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        const {data,error}=await supabase.auth.getUser();
        return await supabase.auth.admin.updateUserById(data.user!.id,{ban_duration:'1000000h'})
    }

    export async function updateProviderV0(provider){
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        const {data,error}=await supabase.auth.getUser();
       
        return await supabase.auth.updateUser(
            {
                
                data:
                {
                    ...data.user!.user_metadata,
                    avatar_url:provider.manager.avatar_url,
                    company:{
                        logo:provider.logo,
                        name:provider.name,
                        address:provider.address,
                        city: provider.city,
                        zipcode:provider.zipcode,
                        support:{
                            ...provider.support
                        },
                        manager:{
                            ...provider.manager
                        }
                    },
                    is_registration_complete:true
                }
            })
    }

    export async function getCenterLines(center) {
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        return await supabase
        .from('center_lines')
        .select(`*,
        center_line_appointment_types(*, appointment_types(*)),
        center_line_energy_types(*, energy_types(*)),
        center_line_time_slots(*),
        center_line_vehicle_types(*, vehicle_types(*))
        `)
        .eq('center',center)
        .eq('deleted',false)
        .eq('center_line_time_slots.deleted',false)
        .eq('center_line_appointment_types.deleted',false)
        .eq('center_line_energy_types.deleted',false)
        .eq('center_line_vehicle_types.deleted',false)
        .order('id',{ascending:true})
    }

    export async function addNewCenterLineV0(center,line) {
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        const {data,error}= await supabase.from('center_lines').insert({active:true,name:line.name,center:center}).select().single()
        line.vehicle_types= line.vehicle_types.map(vt=>{return {active:true,type:vt,center_line:data!.id}});
        line.appointment_types= line.appointment_types.map(at=>{return {active:true,type:at,center_line:data!.id}});
        line.energy_types= line.energy_types.map(et=>{return {active:true,type:et,center_line:data!.id}});
        
        await Promise.all([
            await supabase.from('center_line_vehicle_types').insert(line.vehicle_types),
            await supabase.from('center_line_appointment_types').insert(line.appointment_types),
            await supabase.from('center_line_energy_types').insert(line.energy_types),
        ])

        return await supabase
        .from('center_lines')
        .select(`*,
         center_line_appointment_types(*), 
         center_line_energy_types(*),
         center_line_time_slots(*), 
         center_line_vehicle_types(*)
         `)
        .eq('id',data!.id)
        .eq('center_line_time_slots.deleted',false)
        .eq('center_line_appointment_types.deleted',false)
        .eq('center_line_energy_types.deleted',false)
        .eq('center_line_vehicle_types.deleted',false)
        .single()
        
    }
    export async function editCenterLineV0(center,line) {
        
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        const {data,error}= await supabase.from('center_lines').update({name:line.name}).eq('id',line.id).select()
        console.log("update",data)
        line.vehicle_types= line.vehicle_types.map(vt=>{return {active:true,type:vt,center_line:line!.id}});
        line.appointment_types= line.appointment_types.map(at=>{return {active:true,type:at,center_line:line!.id}});
        line.energy_types= line.energy_types.map(et=>{return {active:true,type:et,center_line:line!.id}});
        console.log(line)
        await Promise.all([
            await supabase.from('center_line_vehicle_types').update({deleted:true}).eq("center_line",line.id),
            await supabase.from('center_line_appointment_types').update({deleted:true}).eq("center_line",line.id),
            await supabase.from('center_line_energy_types').update({deleted:true}).eq("center_line",line.id),
        ]);

        await Promise.all([
            await supabase.from('center_line_vehicle_types').insert(line.vehicle_types),
            await supabase.from('center_line_appointment_types').insert(line.appointment_types),
            await supabase.from('center_line_energy_types').insert(line.energy_types),
        ])

        return await supabase
        .from('center_lines')
        .select(`*, 
        center_line_appointment_types(*), 
        center_line_energy_types(*),
        center_line_time_slots(*), 
        center_line_vehicle_types(*)
        `)
        .eq('id',line!.id)
        .eq('center_line_time_slots.deleted',false)
        .eq('center_line_appointment_types.deleted',false)
        .eq('center_line_energy_types.deleted',false)
        .eq('center_line_vehicle_types.deleted',false)
        .single()
        
    }
    
    export async function deleteCenterLineV0(line) {
        
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        return await supabase.from('center_lines').update({deleted:true}).eq('id',line)
        
    }

    
/*
    End Center
 */
    
/*
    Center Line Time Slot
 */
    export async function upsertTimeSlot(slot) {
        console.log("slot",slot)
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
        if(slot.id){
            return await supabase
            .from('center_line_time_slots')
            .update({active:true,center_line:slot.line,day_of_week:slot.day,from_time:slot.from,to_time:slot.to })
            .eq('id',slot.id)
            .select().single()
        }

        return await supabase
        .from('center_line_time_slots')
        .insert({active:true,center_line:slot.line,day_of_week:slot.day,from_time:slot.from,to_time:slot.to })
        .select().single()
    }
    export async function deleteTimeSlot(slot) {
        const cookieStore = cookies()
        const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
        revalidatePath('/');
            return await supabase
            .from('center_line_time_slots')
            .update({deleted:true })
            .eq('id',slot)
    }
/*
    End Center Line Time Slot
 */




export async function getVehicleTypes(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    return await supabase
    .from('vehicle_types')
    .select()
}

export async function getAppointmentTypes(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    return await supabase
    .from('appointment_types')
    .select()
}
export async function getEnergyTypes(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    return await supabase
    .from('energy_types')
    .select()
}
export async function getVehicleBrands(){
    const cookieStore = cookies()
    const supabase=createServerComponentClient<Database>({ cookies: () => cookieStore });
    return await supabase
    .from('vehicle_brands')
    .select()
}


