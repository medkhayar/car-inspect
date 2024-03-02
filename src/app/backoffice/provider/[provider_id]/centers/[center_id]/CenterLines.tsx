"use client"

import { addNewCenterV0 } from "@/app/global-actions"
import { AvatarUploader } from "@/components/AvatarUploader"
import Select from "@/components/Select"
import { Options,Option, SelectValue } from "@/components/Select/components/type"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import { InputMask, useMask } from "@react-input/mask"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/contexts/GlobalContext"
import Link from "next/link"
import { TypeMetaV1 } from "@/metadata.types"
import { useComponentDidUpdate } from "@/utils/useComponentDidUpdate"

type Center={
    name:string,
    city:number | undefined,
    address: string
    logo:string | undefined
    
}

export default function CenterLines({selectedLine=null,isLoading,provider,center,lines,error,setSelectedLine=(line)=>{}}){
   const [line,setLine]=useState<any>(selectedLine)

   useEffect(()=>{
    setSelectedLine(line)
},[line])

useComponentDidUpdate(()=>{
    setLine(selectedLine)
},[selectedLine])
    return <div className=" py-6 flex flex-col w-full">
     
      {/*<p className="text-gray-500 mb-6">adding a new center to your list.</p>*/}
      <div className="bg-white w-full   p-4 px-4 md:p-4 mb-6">
      <div className=" px-1 pb-4 flex justify-between ">
            <p className="text-base font-semibold ">Centres control lines</p>
        <div>
            <Link href={`/backoffice/provider/${provider}/centers/${center.id}/new-line`} className="p-2 px-4 text-xs border-1 bg-[#3D84A7] hover:bg-[#47466D] rounded-md text-white font-bold"> new control line </Link>
        </div>
        </div>
      {isLoading && <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading control lines...</span>
        </div>}

        {!isLoading && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {lines?.map(l=> <div onClick={()=>{setLine(l)}} key={l.id} className={`p-4 bg-white flex flex-col rounded  border-1 ${line?(line!.id!=l.id?'border-gray-200': 'border-[#3D84A7]'):''} cursor-pointer`}>
            <div className="flex items-center justify-between pb-2">
                <p className="text-sm font-bold ">{l.name} </p>
                <Link href={`/backoffice/provider/${provider}/centers/${center.id}/edit-line/${l.id}`} className="p-2 px-4 text-xs border-1 bg-[#3D84A7] hover:bg-[#47466D] rounded-md text-white font-bold"> edit</Link>
            </div>
            <hr className="pb-2"/>
            <div className="flex ">{l.center_line_vehicle_types.map(vt=><div key={`vtype-${vt.id}`}  title={vt.vehicle_types.type.en} className=" bg-white w-8 h-8 mr-1" dangerouslySetInnerHTML={{__html:(vt.vehicle_types.metadata as TypeMetaV1).icon.content}}></div>)}
            </div>
            <div className="flex ">{l.center_line_energy_types.map(et=><div key={`etype-${et.id}`} title={et.energy_types.type.en} className=" bg-white w-8 h-8 mr-1 p-1" dangerouslySetInnerHTML={{__html:(et.energy_types.metadata as TypeMetaV1).icon.content}}></div>)}
            </div>
            <div className="flex ">{l.center_line_appointment_types.map(at=><div key={`atype-${at.id}`} title={at.appointment_types.type.en} className=" bg-white w-8 h-8 mr-1 p-1" dangerouslySetInnerHTML={{__html:(at.appointment_types.metadata as TypeMetaV1).icon.content}}></div>)}
            </div>
            </div>
            )}
        </div>}

      </div>
      
</div>
}