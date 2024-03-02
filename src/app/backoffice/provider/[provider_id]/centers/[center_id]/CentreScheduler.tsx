"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ManageCenterLineTimeSlot from "./ManageCenterLineTimeSlot";
import { randomUUID } from "crypto";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const colors=["#00a1c2","#f38400","#008856","#be0032","#f3c300","#ffb5bA","#9a4eae"];
const time=Array.from({length: 24}, (x, i) => i);
export default function CenterScheduler({isLoading,line,provider,center,lines,error}){

    const [showSlotManager,setShowSlotManager]=useState(false)
    const [shownDay,setShownDay]=useState(0)
    const nextShownDay=()=>{
        if(shownDay<6){
            setShownDay(shownDay+1)
        }
    }
    const previewShownDay=()=>{
        if(shownDay>0){
            setShownDay(shownDay-1)
        }
    }
    const [selectedTimeSlot,setSelectedTimeSlot]=useState<any>(null)
    const [slots,setSlots]= useState<any>(null)

    /*useEffect(()=>{
        if(lines){
            const slots=days.map((day,day_of_week)=>{
                return lines!.map((line,line_index)=>line.center_line_time_slots.map(s=>{return {...s,line_index}})).flat().filter(slot=> slot.day_of_week==day_of_week);
            })
            setSlots(slots)
            console.log("s",slots)
        }
        
    },[lines])*/
    useEffect(()=>{
        if(line){
            
            loadSlots()
        }
        
    },[line])

    function loadSlots(){
        const slots=days.map((day,day_of_week)=>{
            return line.center_line_time_slots.map(s=>{return {...s,line_index:0}}).flat().filter(slot=> slot.day_of_week==day_of_week);
        })
        setSlots(slots)
    }
    function addOrUpdateSlot(s,isUpdate=false,IsDelete){
        if(IsDelete){
            line.center_line_time_slots=line.center_line_time_slots.filter(sl=>sl.id!=s)
        }
        else if(isUpdate){
            line.center_line_time_slots=line.center_line_time_slots.filter(sl=>sl.id!=s.id)
            line.center_line_time_slots=[...line.center_line_time_slots,s]
        }else{
            line.center_line_time_slots=[...line.center_line_time_slots,s];
        }

        loadSlots()
    }
   
    function getTimeDiff(e: any){
        var timeStart = new Date("01/01/2024 " + e.from_time).getTime();
        var timeEnd = new Date("01/01/2024 " + e.to_time).getTime();

        return ((timeEnd - timeStart)/1000/60)*1.2
    } 
    function getTimeStart(e: any){
        return new Date("01/01/2024 " + e.from_time).getMinutes()*1.2;
    }
    return <div className="p-2 bg-white"><div className=" bg-white  flex flex-col w-full overflow-hidden md:overflow-x-auto">
        <div className="p-4 pb-6 flex justify-between ">
            <p className="text-base font-semibold ">Controls time table<br/>{line?`{ ${line?.name} }`:" - ( please select a control line )"}</p>
        <div>
            <button onClick={()=>setShowSlotManager(true)} className="p-2 px-4 text-xs border-1 bg-[#3D84A7] hover:bg-[#47466D] rounded-md text-white font-bold"> new time slot </button>
        </div>
        </div>
        <div className="flex justify-between md:hidden p-4 pt-0">
            <button onClick={()=>previewShownDay()} className="rounded-md p-2 px-4 text-sm font-bold text-white bg-gray-600">{"<<"}</button>
            <button onClick={()=>nextShownDay()} className="rounded-md p-2 px-4 text-sm font-bold text-white bg-gray-600">{">>"}</button>
        </div>
        <div className="bg-white left-auto md:left-0 overflow-hidden md:w-auto relative inline-flex  rounded ">
        <span className="flex sticky bg-white left-0 overf justify-center items-center min-w-11 text-xs"></span>
        {days.map((day,day_of_week)=><div key={`day-${day_of_week}`} className={`${day_of_week!=shownDay?'hidden':''} justify-center bg-[#eeeeee] items-center px-4 p-2 min-w-[calc(100%-2.75rem)] md:min-w-20 md:flex   w-full float-left`}>
            <span className="text-sm">{day}</span>
            
        </div>)}
        </div>
        {time.map((time)=>{
         return (time>=8 && time <=20) &&<div key={`time-${time}`} className={`bg-white overflow-visible left-auto md:left-0  md:w-auto relative inline-flex   `}>
            <span className="flex sticky bg-[#fafafa] left-0 justify-center items-center min-w-11 text-xs"><span>{time.toString().padStart(2,'0')}:00</span></span>
        {days.map((day,day_of_week)=><div key={`d-${day_of_week}-t-${time}`} style={{backgroundColor:day_of_week<5?'white':'#f8f8f8'}} className={`${day_of_week!=shownDay?'hidden':''} md:flex relative h-[4.5rem] overflow-visible min-w-[calc(100%-2.75rem)] md:min-w-20 border-[#e4e4e4]  border-l-1 border-b-1 w-full float-left`}>
                    <div className="absolute top-0 left-0 w-full h-1/2 border-b-1 border-[#f1f1f1]"></div>
            {slots && <>
                {slots[day_of_week].filter(s=>s.from_time.startsWith(`${time.toString().padStart(2,'0')}:`))
                    .map( e=><div onClick={()=>setSelectedTimeSlot(e)} key={`s-${e.id}`} style={{height:getTimeDiff(e),top:getTimeStart(e)}} className="absolute cursor-pointer w-[calc(100%-1rem)] mx-2 overflow-hidden  flex " >
                        <span style={{backgroundColor:colors[e.line_index]}} className="text-xs z-10 py-[1px] px-[6px] flex-1 rounded font-semibold text-white">{e.from_time.split(":",2).join(':')}</span>
                    </div>)
                    }
                </>
            }
            
        </div>)}
            
        </div>})}
        {(showSlotManager || selectedTimeSlot) && <ManageCenterLineTimeSlot slotAddedOrUpdated={addOrUpdateSlot} lines={lines} time_slot={selectedTimeSlot} closeModal={()=>{setShowSlotManager(false);setSelectedTimeSlot(null)}}/>}
    </div>
    </div>
}