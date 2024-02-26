"use client";

import { getVehicleTypes } from "@/app/global-actions";
import { Localized, TypeMetaV1 } from "@/metadata.types";
import { useComponentDidUpdate } from "@/utils/useComponentDidUpdate";
import { ChangeEvent, useEffect, useState } from "react";

export default function VehicleTypesSelector({initialValues=[] as any[],setVehicleTypes=(vt)=>{}}){
   
    const [isLoading,setIsLoading]=useState(true)
    const [VTypes,setVTypes]=useState<any>(null)
    const [selectedVTypes,setSelectedVTypes]=useState<any>(initialValues)

    useComponentDidUpdate(()=>{
        setVehicleTypes(selectedVTypes)
    },[selectedVTypes])

    const removeItem=(item)=>{
        setSelectedVTypes(selectedVTypes.filter(i=> i!= item))
    }
    
    const AddItem=(item)=>{
        setSelectedVTypes([...selectedVTypes,item])
    }

    const handleChange=(ev:ChangeEvent<HTMLInputElement>,item)=>{
        if(ev.currentTarget.checked){
            AddItem(item)
        }else{
            removeItem(item)
        }
    }
    

    useEffect(()=>{
        getVehicleTypes().then(res=>{
            setVTypes(res.data)
            setIsLoading(false)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    },[])

    return <div className="px-4 py-6 flex flex-col w-full">
      {/*<p className="text-gray-500 mb-6">adding a new center to your list.</p>*/}
      <div className="bg-white w-full rounded ">
        
      {isLoading && <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading control lines...</span>
        </div>}

        {!isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {VTypes?.map(vt=> <div key={vt.id}>
            <div className="flex items-center  ">
                <input onChange={(e)=>handleChange(e,vt.id)}  checked={selectedVTypes.includes(vt.id)} id={`vtype-${vt.id}`}  name={`vtype-${vt.id}`} type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:focus:ring-transparent dark:ring-transparent focus:ring-0 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={`vtype-${vt.id}`} className="ms-2 cursor-pointer flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:underline underline-offset-4">
                    <div className="w-12 h-12 mr-1" dangerouslySetInnerHTML={{__html:(vt.metadata as TypeMetaV1).icon.content}}></div>
                    <p>{(vt.type as Localized).en}</p>
                
                </label>
            </div>
        </div>)}
        </div>}

      </div>
      
</div>
}