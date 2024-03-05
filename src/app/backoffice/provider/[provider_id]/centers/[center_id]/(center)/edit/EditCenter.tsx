"use client"

import { deleteCenterV0, editCenterV0 } from "@/app/global-actions"
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

export default function EditCenter({provider_id,cities,center,error}){

  const [isLoaded,setIsLoaded]=useState(false)
  const [isDeleteLoaded,setIsDeleteLoaded]=useState(false)
  const [isUpdateLoaded,setIsUpdateLoaded]=useState(false)
    const [logo,setLogo]=useState<any>(center.metadata.logo)
    const [isUploading,setIsUploading]=useState<any>(false)
   
    const router=useRouter()


    useEffect(()=>{
      //console.log("loaded")
      setIsLoaded(true)
      
    },[])
    
    
    const formik_delete = useFormik({
        initialValues: {
        },
        onSubmit(){
          setIsDeleteLoaded(true)
            deleteCenterV0(center.id).then(res=>{ 
                const url=(`/backoffice/provider/${provider_id}/centers/`)
                router.push(url)
                setIsDeleteLoaded(false)
              }).catch(e=>{
                console.log("error",e)
                setIsDeleteLoaded(false)
              })
        }
    });
    const formik = useFormik({
      initialValues: {
        name :`${center.metadata.name}`,
        address:`${center.metadata.address}`,
        city:(null || cities.filter(c=>c.value==center.city)[0]) as SelectValue,
        zipcode:`${center.metadata.zipcode}`,
        manager:{
          name:`${center.metadata.manager.name}`,
          email:`${center.metadata.manager.email}`,
          phone:`${center.metadata.manager.phone}`
        },
        support:{
          name:`${center.metadata.support.name}`,
          email:`${center.metadata.support.email}`,
          phone:`${center.metadata.support.phone}`
        }
      },
      validationSchema: Yup.object({
          name:Yup.string().required("required."),
          address:Yup.string().required("required."),
          zipcode:Yup.string().required("required.").matches(/^\d\d\d\d\d$/,"incorrect zipcode"),
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
      initialTouched:{
        name :true,
      address:true,
      city:true,
      zipcode:true,
      manager:{
        name:true,
        email:true,
        phone:true
      },
      support:{
        name:true,
        email:true,
        phone:true
      }
      },
      onSubmit: (values) => {
        //console.log("Submit")
        console.log("city",values.city)
        setIsUpdateLoaded(true);
      if(formik.isValid){      
          let data={	
            id:center.id,
            logo:logo,
            name: values.name,	
            address: values.address,	
            city: (values.city! as Option).value,	
            zipcode:values.zipcode,
            manager:values.manager,
            support: values.support
          }
      
      editCenterV0(provider_id,data).then(res=>{ 
        const url=(`/backoffice/provider/${provider_id}/centers/${res.data?.id}`)
        //router.push(url)
        setIsUpdateLoaded(false)
      }).catch(e=>{
        console.log("error",e)
        setIsUpdateLoaded(false)
      })
        }
      },
    });


   

    return <div className=" p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Edit center</h2>
      <p className="text-gray-500 mb-6">edit an existing center.</p>
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
                <AvatarUploader initialValue={logo} isUploading={setIsUploading} setUploadedFilePath={(url)=>setLogo(url)} containerClass=""  isEnabled={isLoaded}/>
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
 
              <div className="md:col-span-2">
                <label htmlFor="zipcode">Zipcode
                <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.zipcode && formik.errors.zipcode ? formik.errors.zipcode : '') }</span>
             
             </label>
                <InputMask
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 mask="_____" replacement={{_:/\d/}} showMask={true} type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
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
                  <button disabled={!isLoaded && !isUpdateLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white  py-2 px-4 rounded flex">
                  {!isUpdateLoaded && <>Update center</>}
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

            </div>
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
                  <button disabled={!isLoaded && !isDeleteLoaded} onClick={()=>{formik_delete.submitForm()}} className="bg-red-600 hover:bg-red-700 text-xs text-white  py-2 px-4 rounded flex">
                  {!isDeleteLoaded && <>Remove center</>}
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