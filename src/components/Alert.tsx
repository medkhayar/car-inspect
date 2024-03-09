"use client";

import { AlertData, AlertTypeV1 } from "@/metadata.types";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function Alert({show,data,onClose=()=>{},onCancel=()=>{},onConfirm=()=>{}}:{
    show:boolean,data:AlertData,onClose?:Function,onCancel?:Function,onConfirm?:Function
}){
    
    return data && <div className="fixed flex text-sm top-0 left-0 w-full h-full overflow-hidden min-h-full min-w-full justify-center items-center">
        <label onClick={()=>{onCancel()}} className="absolute top-0 left-0 w-full h-full overflow-hidden min-h-full min-w-full bg-black/15 justify-center items-center"></label>
        <div className="max-w-[90%] max-h-90% overflow-hidden flex bg-white shadow rounded z-10 w-[500px]  flex-col"  >
            <div className="p-4 font-semibold">{data.title}</div>
            <hr className="w-full text-gray-600 bg-gray-600"/>
            <div className="flex flex-col md:flex-row pt-4 pl-4">
                <span className="text-6xl p-4 text-center">
                    <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500"/>
                </span>
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-1 overflow-y-auto">

                    <div className="flex p-4 pb-2 flex-col">
                        <span className="">{data.message}</span>
                        {data.detailsControl}

                    </div>
                    </div>
                    <div className="flex p-4 justify-end ">
                        <button className="p-1 rounded mx-1 px-4 text-center  text-sm text-gray-600 bg-gray-100 hover:bg-gray-200" onClick={()=>onClose()}>Cancel</button>
                        <button className="p-1 rounded mx-1 px-4 text-center text-sm text-gray-100 bg-picton-blue-600 hover:bg-picton-blue-700" onClick={()=>onConfirm()}>OK</button>

                            
                    </div>
                </div>
            </div>
            
        </div>
    </div>
}