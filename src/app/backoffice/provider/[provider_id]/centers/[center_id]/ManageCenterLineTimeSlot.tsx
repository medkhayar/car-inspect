"use client";

import {  deleteTimeSlot,upsertTimeSlot } from "@/app/global-actions";
import Select from "@/components/Select";
import { Option, SelectValue } from "@/components/Select/components/type";
import { days } from "@/utils/data";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputMask } from "@react-input/mask";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup'

export default function ManageCenterLineTimeSlot({lines,time_slot,closeModal=()=>{},slotAddedOrUpdated=(s,isUpdate,is_delete)=>{}}){
    
   
  const lines_options= lines.map(l=>{return {value:l.id,label:l.name}})
  const days_options= days.map((day,index)=>{return {value:index,label:day.en}})

  const formik_delete = useFormik({
    initialValues: { 
      
    },
   
    onSubmit: (values) => {
     
//alert("")
    deleteTimeSlot(time_slot.id).then(res=>{
      //console.log("ADDED ",res)
      slotAddedOrUpdated(time_slot.id,time_slot?time_slot!.id:null,true);
      closeModal()
      //
    }).catch(err=>{
      console.log("err catch",err)
    })
  }

  
  });

  const formik = useFormik({
    initialValues: { 
      line :(time_slot?lines_options.filter(e=>e.value==time_slot.center_line)[0]:null) as SelectValue,
      day:(time_slot?days_options.filter(e=>e.value==time_slot.day_of_week)[0]:null) as SelectValue,
      from:time_slot?`${time_slot.from_time.split(":",2).join(":")}`:"",
      to:time_slot?`${time_slot.to_time.split(":",2).join(":")}`:""
    },
    validationSchema: Yup.object({
        line:Yup.object().required("required."),
        day:Yup.object().required("required."),
        from:Yup.string().matches(/^(0\d|1\d|2[0-3]):([0-5]\d)$/,'incorrect time').required("required."),
        to:Yup.string().matches(/^(0\d|1\d|2[0-3]):([0-5]\d)$/,'incorrect time').required("required."),
    })

    ,
    onSubmit: (values) => {
      
      //setIsLoaded(false);

    if(formik.isValid ){      
        let data={	
          id:time_slot?time_slot.id:null,
          line: (values.line! as Option).value,	
          day: (values.day! as Option).value,	
          from: values.from,	
          to:values.to
        }
    //console.log("data",data)
    
    /*addNewCenterV0(provider,data).then(res=>{
      
      const url=(`/backoffice/provider/${provider}/centers/${res.data?.id}`)
      router.push(url)
    }).catch(e=>{
      console.log("error",e)
      setIsLoaded(false)
    })*/
if(!detectInterferences(data)){
//alert("")
upsertTimeSlot(data).then(res=>{
      //console.log("ADDED ",res)
      slotAddedOrUpdated(res.data,time_slot?time_slot!.id:null,false);
      closeModal()
      //
    }).catch(err=>{
      console.log("err catch",err)
    })

  }
  else{console.log("err")}
}
}
  });

      
function detectInterferences(data) {
  let line_slots=lines.filter(l=>l.id==data.line)
  .map(l=>l.center_line_time_slots)
  .flat();
  let interferences=line_slots
  .filter(s=>s.id != time_slot?.id)
  .filter(s=>s.day_of_week==data.day)
  .filter(s=>{
    return (new Date(`01/01/2024 ${data.from}`)>= new Date(`01/01/2024 ${s.from_time}`) &&
      new Date(`01/01/2024 ${data.from}`)< new Date(`01/01/2024 ${s.to_time}`)) 
    || 
    (new Date(`01/01/2024 ${data.to}`)>= new Date(`01/01/2024 ${s.from_time}`) &&
          new Date(`01/01/2024 ${data.to}`)< new Date(`01/01/2024 ${s.to_time}`))
    || 
    (new Date(`01/01/2024 ${s.from_time}`)>= new Date(`01/01/2024 ${data.from}`) &&
          new Date(`01/01/2024 ${s.from_time}`)< new Date(`01/01/2024 ${data.to}`)) 
                  
    || 
    (new Date(`01/01/2024 ${s.to_time}`)>= new Date(`01/01/2024 ${data.from}`) &&
          new Date(`01/01/2024 ${s.to_time}`)< new Date(`01/01/2024 ${data.to}`)) 
    
  })
  console.log("interferences : ",interferences,line_slots)
  return interferences.length!=0;

}


    

    return <div className="fixed top-0 left-0 bg-black/20 flex justify-center items-center h-screen w-screen z-50">
        <div className="flex flex-col bg-white w-2/4 min-w-80 max-w-96 rounded">
            <div className="flex justify-between">
                <p className="text-base p-4 border-b-1 font-bold border-gray-100">{!time_slot?"New time slot":"Update time slot"}</p>
                <div className="p-4  text-gray-600 hover:text-gray-900 " >
                    <FontAwesomeIcon icon={faClose} className="cursor-pointer text-xl"  onClick={closeModal}/>
                </div>
            </div>
            <div className="p-4 pb-2 flex w-full items-center">
                <span className="text-sm text-gray-800 p-4  min-w-16">Line</span>
                <div className="flex flex-1  pr-4">
                    <Select isDisabled={time_slot} isSearchable={true} selectClass={'bg-gray-50'} title="Select control line"  placeholder="" isClearable={true} containerClass={"h-10 mt-1 shadow-none w-full "} primaryColor="neutral"
                         dropDownClosed={()=>formik.setFieldTouched('line',true,true)} 
                        value={formik.values.line!} onChange={(v)=>{formik.setFieldValue('line',v as Option)}}
                        options={lines_options}/>
                </div>
            </div>
            
            <div className="px-4 pb-2 flex w-full items-center">
                <span className="text-sm text-gray-800 p-4  min-w-16">Day</span>
                <div className="flex flex-1  pr-4">
                    <Select isSearchable={true} selectClass={'bg-gray-50'} title="Select control line"  placeholder="" isClearable={true} containerClass={"h-10 mt-1 shadow-none w-full "} primaryColor="neutral"
                         dropDownClosed={()=>formik.setFieldTouched('day',true,true)} 
                        value={formik.values.day!} onChange={(v)=>{formik.setFieldValue('day',v as Option)}}
                        options={days_options}/>
                </div>
            </div>
            
            <div className="px-4 pb-2 flex w-full items-center">
                <span className="text-sm text-gray-800 p-4  min-w-16">From</span>
                <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.from && formik.errors.from ? formik.errors.from : '') }</span>
               
                <div className="flex flex-1  pr-4">
                    <InputMask onBlur={formik.handleBlur} 
                    value={formik.values.from}
                  onChange={formik.handleChange} mask="hh:mm" replacement={{h:/\d/,m:/\d/}}   showMask={true} type="text" name="from" id="from" className="transition-all ring-0 focus:ring-0  outline-0 focus:outline-0 text-sm flex items-center h-10 border rounded px-4 w-full bg-gray-50" placeholder="" />
                </div>
            </div>
            
            <div className="p-4 pt-0 flex w-full items-center">
                <span className="text-sm text-gray-800 p-4 min-w-16">To</span>
                <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.to && formik.errors.to ? formik.errors.to : '') }</span>
               
                <div className="flex flex-1 pr-4">
                    <InputMask onBlur={formik.handleBlur}  
                    value={formik.values.to}
                  onChange={formik.handleChange} mask="hh:mm" replacement={{h:/\d/,m:/\d/}}  showMask={true} type="text" name="to" id="to" className="transition-all ring-0 focus:ring-0  outline-0 focus:outline-0 text-sm flex items-center h-10 border  rounded px-4 w-full bg-gray-50" placeholder="" />
                </div>
            </div>

            <div className="flex w-full justify-end p-4 pt-0">
              { time_slot && <button  onClick={()=>{console.log(formik.errors);formik_delete.submitForm()}} className="bg-red-500 hover:bg-red-600 text-xs text-white p-2 px-4 rounded mx-4">Remove</button>}
              <button  onClick={()=>{console.log(formik.errors);formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white p-2 px-4 rounded">{time_slot?"Update":"Save"}</button>
            </div>
        </div>
    </div>
}
