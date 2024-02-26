"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCenterLines } from '@/app/global-actions';
import CenterLines from './CenterLines';
import CenterScheduler from './CentreScheduler';
export default function CenterDetails({provider,center,error}){
    
    const center_logo_placeholder="/assets/center-placeholder.png";
    const [loadingLines,setLoadingLines]=useState(true)
    const [centerLines,setCenterLines]=useState<any>(null)
    const [selectedLine,setSelectedLine]=useState<any>(null)
    useEffect(()=>{

        getCenterLines(center.id).then(res=>{
            setLoadingLines(false)
            setCenterLines(res)
            console.log(res)
        }).catch(e=>{
            setLoadingLines(false)
            console.log(e)
        })

    },[])

    useEffect(()=>{
        if(centerLines){
            console.log("center",centerLines?.data)
            if(centerLines.data.length>0){
                setSelectedLine(centerLines.data[0])
            }
        }
    },[centerLines])

    return<div className='flex flex-col p-4'>
    
    {/* Center Lines */}
    <CenterLines selectedLine={selectedLine} isLoading={loadingLines} provider={provider} setSelectedLine={setSelectedLine} center={center} lines={centerLines?.data} error={centerLines?.error}/>
    <CenterScheduler isLoading={loadingLines} line={selectedLine} provider={provider} center={center} lines={centerLines?.data}  error={centerLines?.error}/>
    </div>
}