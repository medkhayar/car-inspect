"use client"

import { addNewCenterLineV0, addNewCenterV0 } from "@/app/global-actions"
import { AvatarUploader } from "@/components/AvatarUploader"
import Select from "@/components/Select"
import { Options,Option, SelectValue } from "@/components/Select/components/type"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import { InputMask, useMask } from "@react-input/mask"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/contexts/GlobalContext"
import VehicleTypesSelector from "@/app/backoffice/provider/components/VehicleTypesSelector"
import EnergyTypesSelector from "@/app/backoffice/provider/components/EnergyTypesSelector"
import AppointmentTypesSelector from "@/app/backoffice/provider/components/AppointmentTypesSelector"
import { useComponentDidUpdate } from "@/utils/useComponentDidUpdate"

type Center={
    name:string,
    city:number | undefined,
    address: string
    logo:string | undefined
    
}

export default function NewCenterLine({params}){

    const [isLoaded,setIsLoaded]=useState(false)
    const [logo,setLogo]=useState<any>(null)
    const [vehicleTypes,setVehicleTypes]=useState<any>([])
    const [energyTypes,setEnergyTypes]=useState<any>([])
    const [appointmentTypes,setAppointmentTypes]=useState<any>([])

    const setAppointmentTypesExtended=(at)=>{
      setAppointmentTypes(at);
      formik.setFieldValue('appointmentTypes',at)
    }

    useComponentDidUpdate(()=>{
      formik.setFieldTouched('appointmentTypes')
    },[appointmentTypes])
    
    useComponentDidUpdate(()=>{
      formik.setFieldTouched('vehicleTypes')
    },[vehicleTypes])
    
    useComponentDidUpdate(()=>{
      formik.setFieldTouched('energyTypes')
    },[energyTypes])
    
    const setVehicleTypesExtended=(vt)=>{
      setVehicleTypes(vt);
      formik.setFieldValue('vehicleTypes',vt)
    }
    const setEnergyTypesExtended=(et)=>{
      setEnergyTypes(et);
      formik.setFieldValue('energyTypes',et)
    }
   
    const router=useRouter()


    useEffect(()=>{
      //console.log("loaded")
      setIsLoaded(true)
    },[])

    const formik = useFormik({
      initialValues: {
        name :"",
        energyTypes:[],
        vehicleTypes:[],
        appointmentTypes:[]
      },
      validationSchema: Yup.object({
          name:Yup.string().required("required."),
          energyTypes:Yup.array().min(1,"required."),
          appointmentTypes:Yup.array().min(1,"required."),
          vehicleTypes:Yup.array().min(1,"required."),
      })

      ,
      onSubmit: (values) => {
        
        setIsLoaded(false);
      if(formik.isValid){      
          let data={	
            name: values.name,	
            energy_types: values.energyTypes,	
            vehicle_types: values.vehicleTypes,	
            appointment_types:values.appointmentTypes
          }
      console.log("data",data)
      
      /*addNewCenterV0(provider,data).then(res=>{
        
        const url=(`/backoffice/provider/${provider}/centers/${res.data?.id}`)
        router.push(url)
      }).catch(e=>{
        console.log("error",e)
        setIsLoaded(false)
      })*/

      addNewCenterLineV0(params.center_id,data).then(res=>{
        console.log("ADDED ",res)
        const url=(`/backoffice/provider/${params.provider_id}/centers/${params.center_id}`)
        router.push(url)
      }).catch(err=>{

      })

    }
  }
    });


    return <div className=" p-2 md:p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">New Control line</h2>
      <p className="text-gray-500 mb-6">adding a new control line to your center.</p>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pb-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Line details</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              
              <div className="md:col-span-3">
                <label htmlFor="name">
                  Name *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.name && formik.errors.name ? formik.errors.name : '') }</span>
                </label>
                <input
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
             
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Control details</p>
            <p>Vehicles types.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="vehicle_types">
                  Select vehicle types
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.vehicleTypes && formik.errors.vehicleTypes ? formik.errors.vehicleTypes : '') }</span>
                </label>
                <VehicleTypesSelector setVehicleTypes={setVehicleTypesExtended}/>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-6">
          <div className="text-gray-600">
            <p>Energy types.</p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="vehicle_types">
                  Select energy types
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.energyTypes && formik.errors.energyTypes ? formik.errors.energyTypes : '') }</span>
                </label>
                <EnergyTypesSelector setEnergyTypes={setEnergyTypesExtended}/>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-6">
          <div className="text-gray-600">
            <p>Appointment types.</p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="vehicle_types">
                  Select appointment types
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.appointmentTypes && formik.errors.appointmentTypes ? formik.errors.appointmentTypes : '') }</span>
                </label>
                <AppointmentTypesSelector setAppointmentTypes={setAppointmentTypesExtended}/>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 text-right pt-6">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white p-2 px-4 rounded">Add control line</button>
                </div>
              </div>
      </div>
    </div>
  </div>
</div>
}