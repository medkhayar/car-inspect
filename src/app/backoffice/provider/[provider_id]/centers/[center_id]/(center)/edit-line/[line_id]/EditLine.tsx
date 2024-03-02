
"use client";
import { editCenterLineV0, addNewCenterV0, deleteCenterLineV0 } from "@/app/global-actions"
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
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

type Center={
    name:string,
    city:number | undefined,
    address: string
    logo:string | undefined
    
}

export default function EditLine({params,line}){
  
    const [isLoaded,setIsLoaded]=useState(false)
    const [isUpdateLoaded,setIsUpdateLoaded]=useState(false)
    const [isDeleteLoaded,setIsDeleteLoaded]=useState(false)
    const [vehicleTypes,setVehicleTypes]=useState<any>(line.center_line_vehicle_types.map(l=>l.type))
    const [energyTypes,setEnergyTypes]=useState<any>(line.center_line_energy_types.map(l=>l.type))
    const [appointmentTypes,setAppointmentTypes]=useState<any>(line.center_line_appointment_types.map(l=>l.type))

    const formik_delete = useFormik({
        initialValues: {
        },
        onSubmit(){
          setIsDeleteLoaded(true)
            deleteCenterLineV0(line.id).then(res=>{ 
                const url=(`/backoffice/provider/${params.provider_id}/centers/${params.center_id}`)
                router.push(url)
                setIsDeleteLoaded(false)
              }).catch(e=>{
                console.log("error",e)
                setIsDeleteLoaded(false)
              })
        }
    });
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
        name :line.name as string,
        energyTypes:line.center_line_energy_types.map(l=>l.type) as [],
        vehicleTypes:line.center_line_vehicle_types.map(l=>l.type) as [],
        appointmentTypes:line.center_line_appointment_types.map(l=>l.type) as []
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
        setIsUpdateLoaded(true);
      if(formik.isValid){      
          let data={	
            id:line.id,
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

      editCenterLineV0(params.center_id,data).then(res=>{
        console.log("ADDED ",res)
        const url=(`/backoffice/provider/${params.provider_id}/centers/${params.center_id}`)
        router.push(url)
        
        setIsUpdateLoaded(false);
      }).catch(err=>{
        console.log("err",err)
        setIsUpdateLoaded(false);
      })

    }
  }
    });


    return <div className=" p-2 md:p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Edit Control line</h2>
      <p className="text-gray-500 mb-6">edit an existing control line.</p>
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
                <VehicleTypesSelector initialValues={vehicleTypes} setVehicleTypes={setVehicleTypesExtended}/>
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
                <EnergyTypesSelector  initialValues={energyTypes} setEnergyTypes={setEnergyTypesExtended}/>
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
                <AppointmentTypesSelector  initialValues={appointmentTypes} setAppointmentTypes={setAppointmentTypesExtended}/>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 text-right pt-6">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded || isUpdateLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white p-2 px-4 rounded flex">
                  {!isUpdateLoaded && <>Update control line</>}
                  {isUpdateLoaded && <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span>...</span>
                    </>}
                  </button>
                </div>
        </div>
        <hr className="mt-4"></hr>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-12">
          <div className="text-red-500 font-bold">
            <p>Danger zone.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label  className="text-red-600 p-4 w-full ">
                  Deleting a centre would delete all data related to it.
                </label>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded || isDeleteLoaded} onClick={()=>{formik_delete.submitForm()}} className="bg-red-600 hover:bg-red-700 text-xs text-white  py-2 px-4 rounded flex">
                  {!isDeleteLoaded && <>Remove control line</>}
                  {isDeleteLoaded && <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span>...</span>
                    </>}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}