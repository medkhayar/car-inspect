import { useAuthContext } from "@/contexts/AuthProvider"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import Image from 'next/image'

export default async function ProviderCenters(){
    const supabase= createServerComponentClient({cookies})
    const {data:{user}}= await supabase.auth.getUser()
    console.log("user",user);
    const center_logo_placeholder="/assets/center-placeholder.png";
    const {data,error} = await supabase.from("centers").select(`
       *, cities(*)
    `).eq('provider',user!.id).eq('deleted',false).order('id')

    return <div className="flex flex-col pl-0 lg:pl-8">
    
        <div className="p-4 flex justify-between items-center ">
            <h2 className="font-semibold text-xl text-gray-600 px-2">Centres</h2>
        <div>
            <Link href={`/backoffice/provider/${user!.id}/centers/new`} className="p-2 px-4 text-xs border-1 bg-[#3D84A7] hover:bg-[#47466D] rounded-md text-white font-bold"> new center </Link>
        </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 px-4 gap-4">
        {data?.length!=0 && data?.map(c=><>
            <div className="flex flex-col w-full box-border p-4 shadow bg-white  text-sm relative mt-14 ">
                <Image src={c.metadata.logo?c.metadata.logo:center_logo_placeholder} width={80} height={80} className="absolute bg-white -top-7 w-20 h-20 object-cover rounded shadow-md " alt={""}></Image>
                <Link href={`/backoffice/provider/${user!.id}/centers/${c.id}`}>
                    <p className="pl-24 text-gray-700 min-h-12 text-xl font-bold truncate" title={c.metadata.name}>{c.metadata.name}</p>
                </Link>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-2">
                        <label >Address</label>
                    </div>
                    <div className="md:col-span-4">
                        <p className="truncate">{c.metadata.address} {c.cities? <><br/>{c.cities.name.en}</>:""} </p>
                    </div>
                    <div className="md:col-span-2">
                        <label >Manager</label>
                    </div>
                    <div className="md:col-span-4">
                        <p  className="truncate">{c.metadata.manager.name}<br/>
                        {c.metadata.manager.email}<br/>
                        {c.metadata.manager.phone}<br/>
                        </p>
                    </div>
                    
                    <div className="md:col-span-2">
                        <label >Support</label>
                    </div>
                    <div className="md:col-span-4">
                        <p  className="truncate">{c.metadata.support.name}<br/>
                        {c.metadata.support.email}<br/>
                        {c.metadata.support.phone}<br/>
                        </p>
                    </div>
                    
                    
              </div>
            </div>
        </>
        )}
        {data?.length==0 && <>
        No Center Found
        </>}
    </div>
    </div>
}