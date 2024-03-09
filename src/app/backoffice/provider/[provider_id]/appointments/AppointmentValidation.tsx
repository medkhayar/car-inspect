"use client"

import { getUserById, getVehicleById, updateAppointmentStatus, validateAppointmentStatus } from "@/app/global-actions";
import { TypeMetaV1 } from "@/metadata.types";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from 'yup'

export default function AppointmentValidation({appointment,onCancel,onApprove,onDeny}){

    const supabase= createClientComponentClient();
    const [clientData,setClientData]= useState<any>(null);
    const [vehicleData,setVehicleData]= useState<any>(null);

    useEffect(()=>{
      
      getUserById(appointment.client_vehicles.client).then(res=>{
        console.log("client",res.data)
        setClientData(res.data.user)

      })
      
      getVehicleById(appointment.client_vehicles.id).then(res=>{
        console.log("vehicle",res.data)
        setVehicleData(res.data)

      })
      
      
    },[])

  function getBrandLogoByName(name: string): string  {
    return `/brands/${name.toLowerCase().replaceAll(' ','-')}-logo.png`
  }


  
  const formik = useFormik({
    initialValues: {
      decision :``,
      notes:``,
    },
    validationSchema: Yup.object({
        decision:Yup.string().required("required."),
    }),
    onSubmit:(values)=>{
      if(formik.isValid){      
        let data={	
          status:"finalized",
          decision:values.decision,
          notes:values.notes,
        }
        validateAppointmentStatus(appointment.id,data).then((res)=>{
          //add error handling
          onApprove();
        }).catch(err=>{
    
        });
      }
  }

    });

    return <div className="flex relative overflow-auto  flex-1  flex-col">
       
            <div className="flex max-w-full overflow-hidden w-full flex-1 ">
            <div className="flex w-full flex-col text-sm ">
        

            <div className="p-4 flex w-full flex-col overflow-y-auto">
         
            <div className="p-2 px-4 flex text-sm text-gray-700 font-semibold underline underline-offset-2">Center </div>
            <div className="p-2 px-4 flex text-sm text-gray-500 relative"> 
              <span className="w-1/3 px-2">Name</span> 
              <span className="w-2/3 px-2 text-gray-700">{appointment.center.name}</span> 
            </div>
            <div className="p-2 px-4 flex text-sm text-gray-500 relative"> 
              <span className="w-1/3 px-2">Line</span> 
              <span className="w-2/3 px-2 text-gray-700">{appointment.line.name}</span> 
            </div>
            <div className="p-2 px-4 flex text-sm text-gray-500 relative"> 
              <span className="w-1/3 px-2">Date</span> 
              <span className="w-2/3 px-2 text-gray-700">{appointment.appointment_date}</span> 
            </div>
            <div className="p-2 px-4 flex text-sm text-gray-500 relative"> 
              <span className="w-1/3 px-2">Time</span> 
              <span className="w-2/3 px-2 text-gray-700">{appointment.from_time.split(':',2).join(':') + ' - '+ appointment.to_time.split(':',2).join(':')}</span> 
            </div>

            {/*client/vehicle data*/}
            {!clientData && <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading control lines...</span>
        </div>}

        {clientData &&<> <div className="p-4 flex text-sm text-gray-700 font-semibold underline underline-offset-2">Client </div>
            <div className="flex items-center p-4">
                    <img className="rounded-full object-cover h-10 w-10 mr-2 shadow" src={clientData.user_metadata.avatar_url}  referrerPolicy="no-referrer" ></img>
                    <span className="px-4 text-gray-700 text-base">
                      {clientData.user_metadata.full_name}<br/>
                      <span className="text-gray-400 text-xs">{clientData.user_metadata.email}</span>
                    </span>
            </div>
            </>
            }

            {!vehicleData && <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading control lines...</span>
        </div>}

        {vehicleData &&<> <div className="p-4 flex text-sm text-gray-700 font-semibold underline underline-offset-2">Vehicle </div>
            <div className="flex items-center p-4">
                    <img className="rounded-full object-cover h-10 w-10 mr-2 shadow" src={getBrandLogoByName(vehicleData.vehicle_brands.brand.name)}></img>
                    <span className="px-4 text-gray-700 text-base">
                      {vehicleData.vehicle_brands.brand.name}<br/>
                      <span className="text-gray-600 text-sm">{vehicleData.metadata?.plate.toUpperCase()}</span>
                    </span>
            </div>
            <div className="p-4 flex text-sm text-gray-500 relative"> 
              <div className="w-full px-2 flex">
                    <div className=' w-7 h-7 p-1 box-border mr-2' dangerouslySetInnerHTML={{__html:(vehicleData.energy_types!.metadata as TypeMetaV1).icon.content}}></div>
                    <span className="px-4 text-gray-700 text-base">
                      <span className="text-gray-600 text-sm">{vehicleData.energy_types.type.en}</span>
                    </span>
                </div> 
            </div>
            <div className="p-4 flex text-sm text-gray-500 relative"> 
              <div className="w-full px-2 flex">
                    <div className=' w-7 h-7 box-border mr-2' dangerouslySetInnerHTML={{__html:(vehicleData.vehicle_types!.metadata as TypeMetaV1).icon.content}}></div>
                    <span className="px-4 text-gray-700 text-base">
                      <span className="text-gray-600 text-sm">{vehicleData.vehicle_types.type.en}</span>
                    </span>
                </div> 
            </div>
            </>
            }

            {/**/}
            <div className="p-4 flex text-sm justify-between">
            <span className="text-sm text-gray-700 font-semibold underline underline-offset-2">Decision</span>
                  <span className=' self-center text-right text-red-500 text-xs no-underline'> &nbsp;{(formik.touched.decision && formik.errors.decision ? formik.errors.decision : '') }</span>
                 </div>
            <div className="flex flex-col  items-center p-4">
            <div className="flex  w-full">
              <div className={`flex flex-1 p-2 mr-2 border-1 ${formik.values.decision=='favorable'?'border-black':'border-[#eeeeee]'} rounded cursor-pointer`} onClick={()=>formik.setFieldValue("decision","favorable")}>
                <div className={`flex justify-center items-center `}>
                  <FontAwesomeIcon icon={faCheck} className="mx-2 text-lg font-light text-green-600"/>
                  <span>Favorable</span>
                </div>
              </div>
              <div className={`flex flex-1 p-2 ml-2 border-1 ${formik.values.decision=='unfavorable'?'border-black':'border-[#eeeeee]'}  rounded cursor-pointer`}  onClick={()=>formik.setFieldValue("decision","unfavorable")}>
                <div className={`flex justify-center items-center `}>
                  <FontAwesomeIcon icon={faCircleXmark} className="mx-2 text-lg font-light text-red-600"/>
                  <span>Unfavorable</span>
                </div>
              </div>
            </div>
            </div>
            <div className="p-4 flex ">
            <label htmlFor="name">
              <span className="text-sm text-gray-700 font-semibold underline underline-offset-2">Notes</span>
                  <span className=' self-center text-right text-red-500 text-xs no-underline'> &nbsp;{(formik.touched.notes && formik.errors.notes ? formik.errors.notes : '') }</span>
                </label>
                 </div>
            <div className="flex flex-col w-full px-4">
              
                
                <textarea 
                  value={formik.values.notes}
                  onChange={(v)=>formik.setFieldValue('notes',v.currentTarget.value)}
                  onBlur={formik.handleBlur}
                   name="name" id="name" className=" resize-none border  rounded p-2 px-4 w-full bg-gray-50" rows={Math.max(4,formik.values.notes.split('\n').length)} >{formik.values.notes}</textarea>
              </div>

          </div>
        </div>
            </div>
            <div className="flex p-4 justify-end ">
              <button className="p-1 rounded mx-1 px-4 text-center  text-sm text-gray-600 bg-gray-100 hover:bg-gray-200" onClick={()=>onCancel()}>Cancel</button>
              <button className="p-1 rounded mx-1 px-4 text-center text-sm text-gray-100 bg-picton-blue-600 hover:bg-picton-blue-700" onClick={()=>formik.submitForm()}>Validate</button>
        
            </div>
        
    </div>
}