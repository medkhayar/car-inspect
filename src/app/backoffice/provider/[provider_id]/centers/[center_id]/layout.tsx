import { center_logo_placeholder } from "@/utils/data";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Image from 'next/image'
import Link from "next/link";

export default async function CenterLayout({params,children}){
    const supabase=createServerComponentClient({cookies})
    const _center= await supabase.from('centers').select("*, cities(*)").eq('id',params.center_id).single()  
    const center=_center.data;
return <div className='flex flex-1 flex-col'>
    <div className="flex  flex-row pt-4  p-4">
<div className="flex">
    <Image src={center.metadata?.logo?center.metadata.logo:center_logo_placeholder} width={128} height={128} className=" bg-white  w-32 h-32 object-cover rounded-lg shadow " alt={""}></Image>
</div>

<div className=" flex-1 grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
<div className="flex flex-1 justify-between w-full flex-col">
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-6 flex justify-between">
            <label className='text-gray-700 min-h-10 text-lg font-bold truncate' >{center.metadata.name}</label>
            <Link href={`/backoffice/provider/${params.provider_id}/centers/${center.id}/edit`} className="p-2 px-4 text-xs  text-[#3D84A7] hover:text-[#47466D] rounded-md font-bold"> 
                    <FontAwesomeIcon icon={faEdit} className="text-sm"/>
                </Link>
        </div>
        <div className="md:col-span-6">
            <p className="truncate">{center.metadata.address}  {center.cities? <><br/>{center.metadata.zipcode} {center.cities.name.en}</>:""} </p>
        </div>
        
    </div>
</div>

<div className="md:flex hidden w-full flex-col  pl-4 border-l-1 border-gray-400">
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-6">
            <label className='text-gray-700 min-h-12 text-md font-bold truncate' >Manager</label>
        </div>
        <div className="md:col-span-6">
            <p  className="truncate">
                {center.metadata.manager.name}<br/>
                {center.metadata.manager.email}<br/>
                {center.metadata.manager.phone}
            </p>
        </div>
    </div>
</div>


<div className="md:flex hidden w-full flex-col pl-4 border-l-1 border-gray-400">
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-6">
            <label className='text-gray-700 min-h-12 text-md font-bold truncate'>Support</label>
        </div>
        <div className="md:col-span-6">
            <p  className="truncate">
                {center.metadata.support.name}<br/>
                {center.metadata.support.email}<br/>
                {center.metadata.support.phone}
            </p>
        </div>
    </div>
</div>
</div>
</div>
<hr className="mt-4"/>
<div className="flex flex-1 flex-col bg-[#efefef]">
{children}
</div>
</div>
}