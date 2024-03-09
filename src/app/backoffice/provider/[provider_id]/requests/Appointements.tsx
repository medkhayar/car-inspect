"use client"

import CardDatePicker from "@/components/CardDatePicker"
import moment from "moment"
import { useState } from "react"

import { DatePickerToolbarProps, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { CloseIcon } from "@/components/Select/components/Icons";
import InputDatePicker from "@/components/InputDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faBoxOpen, faCalendar, faCalendarDay, faClock, faClockFour } from "@fortawesome/free-solid-svg-icons";
import SideModal from "@/components/SideModal";
import AppointmentApproval from "./AppointmentApproval";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { center_logo_placeholder } from "@/utils/data";

function DateEmptyToolBar(props: DatePickerToolbarProps<any>) {
    return <></>
    }
function DateEmptyActionBar() {
        return <></>
}

export default function Appointments({centers,provider_id}){
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    var sortAppointmentTime=(a,b)=>{
        let da=new Date('01/01/2024 '+ a.from_time);
        let db=new Date('01/01/2024 '+ b.from_time);
        return (da>db)?1:(da<db)?-1:0;
    }

    const getAppointments=(slots:any[],line,center)=>{
        return groupBy(slots.map(s=>s.appointments.map(a=>{return {line:line.name,center:center.metadata,...a,to_time:s.to_time,from_time:s.from_time}})).flat().sort((sortAppointmentTime)),'appointment_date')
    }

    const [date,setDate]=useState<any>(moment())
    const [selectedAppointment,setSelectedAppointment]=useState<any>(null)

    function approveAppointment(appointment){
        setSelectedAppointment(appointment);
    }

    const router=useRouter()
    function updateAppointment(){
        if(selectedAppointment){
            //router.refresh()
            setSelectedAppointment(null)
        }
    }

    const centers_lines_count=centers.map(c=>c.center_lines.map(l=>l)).flat().length
    return <div className="p-4 w-full">
        
    <div className="p-4 w-full  mx-auto">
        <h2 className="font-semibold text-xl text-gray-600">Appointments Requests</h2>
        <p className="text-gray-500 ">list all requested appointments.</p>
        </div>
                {centers_lines_count==0 && <div className="flex flex-col justify-center items-center mt-4 p-4  min-h-56 border-1 border-gray-300  bg-gray-50">
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-base  text-gray-400"/>
                        <span className="px-4 text-base text-gray-500">this account have no control lines yet.<br></br></span>
                    </div>
                    <Link href={`/backoffice/provider/${provider_id}/centers/`} className="p-4 py-2 rounded mt-4 text-sm font-semibold  text-gray-100 bg-picton-blue-600 hover:bg-picton-blue-700"> Goto centers managment.</Link>
                    
                </div>}
        <div className="p-4">
            {centers.map(c=><div key={`c-${c.id}`} className="">
                <div className="flex items-center pr-2 py-2">
                    <img className="rounded-full object-cover h-10 w-10 mr-2 shadow bg-white" src={c.metadata.logo?c.metadata.logo:center_logo_placeholder} ></img>
                    <span className="px-4 text-gray-700 text-base">{c.metadata.name}</span>
                </div>
                
                {c.center_lines.map(l=> <div key={`line-${l.name}`} className=" bg-white flex flex-col p-4  mb-2">
                    
                        <h3 className="text-gray-600 text-sm pb-2">{l.name}</h3>
                        <hr/>
                        <div className=" flex flex-col">
                            
                            {Object.entries(getAppointments(l.center_line_time_slots,l,c)).map(([key,value])=>{
                                return <div key={`line-${key}`}>
                                <div className="p-2 flex">
                                <FontAwesomeIcon className="px-2 text-gray-400" icon={faCalendarDay}/>
                                <span className="text-sm font-semibold">{key}</span>
                                </div>
                                <div className="flex flex-wrap px-4">
                                {(value as any[]).map(v=><button key={`ap-${v.id}`} onClick={()=>approveAppointment(v)} className="p-2 cursor-pointer hover:bg-picton-blue-500 hover:text-white bg-gray-100 rounded border-[1px] border-[#eeeeee]">
                                    <FontAwesomeIcon className=" pr-1 text-sm" icon={faClockFour}/>
                                    <span className="text-sm px-1">{v.from_time.split(":",2).join(':')}</span>
                                </button>
                                )}
                                </div>
                                </div>
                            })}
                            {Object.entries(getAppointments(l.center_line_time_slots,l,c)).length==0 && <>
                                <div className="p-2 flex justify-center items-center">
                                    <FontAwesomeIcon className="text-gray-500 " icon={faBoxArchive}/>
                                    <span className="text-sm px-2 text-gray-500">No appointement for this line</span>
                                </div>
                            </>}
                        </div>
                </div>)}
            </div>)}
        </div>
    
      {/*{JSON.stringify(centers)}
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='en'>
            <div className="w-full flex">
                <div className="w-1/2 p-4 hidden lg:flex lg:w-auto ">
                    <StaticDatePicker  minDate={moment()} value={date} onChange={(e)=>setDate(e!)}  className="w-full p-4 pr-2 lg:flex border-r-1 border-gray-200 search  " slots={{toolbar:DateEmptyToolBar,actionBar:DateEmptyActionBar}} />
                </div>
                    
                <div className="w-1/2  flex lg:hidden ">
                    <CardDatePicker value={date} onChange={(v)=>setDate(v)} closeOnSelect={true} className={'w-full flex flex-col sm:flex-row text-gray-500 lg:hidden  lg:w-1/2   p-2 lg:flex-col  '} dateFormat={'DD/MM/yyyy'} clearIcon={<></>} />
                </div>
                <div className="flex flex-1">
                        
                </div>
            </div>
            <InputDatePicker   minDate={moment()} value={date} onChange={(e)=>setDate(e!)} dateFormat='DD/MM/yyyy' inputClassName='w-i caret-transparent cursor-default flex-1  text-gray-500 transition-all  p-2 duration-300 outline-none' 
                    className='flex w-full sm:hidden my-4 text-sm border rounded  border-gray-300 bg-white ' label="pick a date" 
                    icon={<svg fill="none" className='h-6 w-6 p-0.5 text-gray-400 border-gray-300' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>}
                    clearIcon={<CloseIcon className='h-5 w-5 px-0.5 text-gray-500'/>}
                    />
        </LocalizationProvider> 
       

<div className="border-b border-gray-200 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
            <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Profile
            </a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                <svg className="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>Dashboard
            </a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"/>
                </svg>Settings
            </a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>Contacts
            </a>
        </li>
        <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
        </li>
    </ul>
</div>*/}

{selectedAppointment && <SideModal title="Appointment approval" component={<AppointmentApproval onApprove={updateAppointment} onDeny={updateAppointment}  onCancel={()=>setSelectedAppointment(null)} appointment={selectedAppointment}/>} onCancel={()=>setSelectedAppointment(null)} onValidate={()=>{}} />}
    </div> 
}