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

type Center={
    name:string,
    city:number | undefined,
    address: string
    logo:string | undefined
    
}

export default function NewCenter({provider_id,cities,error}){

  const [isLoaded,setIsLoaded]=useState(false)
  const [isAddLoaded,setIsAddLoaded]=useState(false)
    const [logo,setLogo]=useState<any>(null)
    const [isUploading,setIsUploading]=useState<any>(false)
   
    const router=useRouter()


    useEffect(()=>{
      //console.log("loaded")
      setIsLoaded(true)
    },[])

    const formik = useFormik({
      initialValues: {
        name :"",
        address:"",
        city:null as SelectValue,
        zipcode:"",
        manager:{
          name:"",
          email:"",
          phone:"0_ __ __ __ __"
        },
        support:{
          name:"",
          email:"",
          phone:"0_ __ __ __ __"
        }
      },
      validationSchema: Yup.object({
          name:Yup.string().required("required."),
          address:Yup.string().required("required."),
          city:Yup.object().required('required.'),
          manager:Yup.object({
            name:Yup.string().required('required.'),
            email:Yup.string()
                  .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'incorrect email format.')
                  .required('required.'),
            phone:Yup.string()
                  .matches(/^\d\d \d\d \d\d \d\d \d\d$/,"incorrect phone number.")
                  .required('required.'),
          }),
          support:Yup.object({
            name:Yup.string().required('required.'),
            email:Yup.string()
                  .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'incorrect email format.')
                  .required('required.'),
            phone:Yup.string()
                  .matches(/^\d\d \d\d \d\d \d\d \d\d$/,"incorrect phone number.")
                  .required('required.'),
          })

      }),
      onSubmit: (values) => {
        //console.log("Submit")
        console.log("city",values.city)
        setIsLoaded(false);
        setIsAddLoaded(true)
      if(formik.isValid){      
          let data={	
            logo:logo,
            name: values.name,	
            address: values.address,	
            city: (values.city! as Option).value,	
            zipcode:values.zipcode,
            manager:values.manager,
            support: values.support
          }
      
        console.log("data",data)
      addNewCenterV0(provider_id,data).then(res=>{
        console.log("res",res)
        const url=(`/backoffice/provider/${provider_id}/centers/${res.data?.id}`)
        router.push(url)
        setIsAddLoaded(false)
      }).catch(e=>{
        console.log("error",e)
        setIsLoaded(false)
        setIsAddLoaded(false)
      })
        }
      },
    });


   

    return <div className=" p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">New center</h2>
      <p className="text-gray-500 mb-6">adding a new center to your list.</p>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pb-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Center details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-4 flex flex-row items-center justify-start pb-4 ">
                <label htmlFor="name"></label>
                <AvatarUploader isUploading={setIsUploading} setUploadedFilePath={(url)=>setLogo(url)} containerClass=""  isEnabled={isLoaded}/>
               <div className={`${isUploading?'flex':'hidden'} flex-row items-center justify-start`}> 
                <div
                  className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                </div>
                <span
                    className="pl-2 text-sm"
                    >Uploading...</span>
                </div>
              </div>
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

             { /*<div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
            </div>*/}

              <div className="md:col-span-4">
                <label htmlFor="address">
                  Address / Street *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.address && formik.errors.address ? formik.errors.address : '') }</span>
              </label>
                <input
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">
                  City *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.city && formik.errors.city ? formik.errors.city : '') }</span>
                </label>
                {/*<input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />*/}
                <Select isSearchable={true} selectClass={'bg-gray-50'} title="Select a city"  placeholder="" isClearable={true} containerClass={"h-10 mt-1 shadow-none "} primaryColor="neutral"
                    dropDownClosed={()=>formik.setFieldTouched('city',true,true)} 
                    value={formik.values.city} onChange={(v)=>{console.log("s",v);formik.setFieldValue('city',v)}}
                    options={cities}/>
              </div>
 
              <div className="md:col-span-1">
                <label htmlFor="zipcode">Zipcode</label>
                <InputMask mask="_____" replacement={{_:/\d/}} showMask={true} type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
              </div>
             
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Contact details</p>
            <p>Center manager.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label htmlFor="manager.name">
                  Manager name
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.manager?.name && formik.errors.manager?.name ? formik.errors.manager.name : '') }</span>
                </label>
                <input
                  value={formik.values.manager.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="manager.name" id="manager.name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
              </div>

             { /*<div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
            </div>*/}

            <div className="md:col-span-3">
                <label htmlFor="manager.email">
                  Email Address *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.manager?.email && formik.errors.manager?.email ? formik.errors.manager.email : '') }</span>
             </label>
                <input 
                  value={formik.values.manager.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="manager.email" id="manager.email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
            </div>
            
            <div className="md:col-span-2"></div>
            <div className="md:col-span-2">
                <label htmlFor="manager.phone">
                  Phone *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.manager?.phone && formik.errors.manager?.phone ? formik.errors.manager.phone : '') }</span>
             </label>
                <InputMask 
                  mask="0_ __ __ __ __" replacement={{_:/\d/}} showMask={true}
                  value={formik.values.manager.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="manager.phone" id="manager.phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
            </div>


            </div>
          </div>
        </div>
        
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-12">
          <div className="text-gray-600">
            <p>Center support.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label htmlFor="support.name">
                  Support name
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.support?.name && formik.errors.support?.name ? formik.errors.support.name : '') }</span>
                </label>
                <input
                  value={formik.values.support.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="support.name" id="support.name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
              </div>

             { /*<div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
            </div>*/}

            <div className="md:col-span-3">
                <label htmlFor="support.email">
                  Email Address *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.support?.email && formik.errors.support?.email ? formik.errors.support.email : '') }</span>
             </label>
                <input 
                  value={formik.values.support.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="support.email" id="support.email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
            </div>
            
            <div className="md:col-span-2"></div>
            <div className="md:col-span-2">
                <label htmlFor="support.phone">
                  Phone *
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.support?.phone && formik.errors.support?.phone ? formik.errors.support.phone : '') }</span>
             </label>
                <InputMask 
                  mask="0_ __ __ __ __" replacement={{_:/\d/}} showMask={true}
                  value={formik.values.support.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="support.phone" id="support.phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
            </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white  py-2 px-4 rounded flex">
                  {!isAddLoaded && <>Add center</>}
                  {isAddLoaded && <>
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