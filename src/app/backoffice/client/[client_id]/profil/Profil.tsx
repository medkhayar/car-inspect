"use client"

import { addNewCenterV0, deleteUserV0, updateClientV0, updateProviderV0 } from "@/app/global-actions"
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

export default function NewCenter({user,client_id,cities,error}){

  let _avatar=null;
  try{
    _avatar=user.user_metadata.avatar_url;
  }catch(e){}

  const [isLoaded,setIsLoaded]=useState(false)
  const [isUpdateLoaded,setIsUpdateLoaded]=useState(false)
  const [isDeleteLoaded,setIsDeleteLoaded]=useState(false)
  const [userAvatar,setUserAvatar]=useState<any>(_avatar)
  const [isUploading,setIsUploading]=useState<any>(false)
  const [isAvatarUploading,setIsAvatarUploading]=useState<any>(false)
   
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
          deleteUserV0(user.id).then(res=>{ 
              const url=(`/access`)
              //router.push(url)
              console.log(res)
              setIsDeleteLoaded(false)
            }).catch(e=>{
              console.log("error",e)
              setIsDeleteLoaded(false)
            })
      }
    });

    function validPhone(this: Yup.StringSchema, msg: string) {
      return this.test('v_phone', msg, function (value) {
        const { path, createError ,originalValue} = this;
        let res=originalValue!.match(/^\d\d \d\d \d\d \d\d \d\d$/)
        return (
           res!=null?(res.length>0?true: createError({ path, message: msg })): originalValue == "0_ __ __ __ __" 
        );
      });
    }
    
    Yup.addMethod(Yup.string, 'validPhone', validPhone);
    
    function validEmail(this: Yup.StringSchema, msg: string) {
      return this.test('v_email', msg, function (value) {
        const { path, createError,originalValue } = this;
        let oValue=originalValue || ""
        let res=oValue!.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if(res==null){
          res=[]
        }
        //console.log("e",originalValue, res)
        return (
          originalValue ==null || res.length>0?true: createError({ path, message: msg })
        );
      });
    }
    
    Yup.addMethod(Yup.string, 'validEmail', validEmail);
   
    const formik = useFormik({
      initialValues: {
        address:user.user_metadata.address as string,
        city:(null || cities.filter(c=>c.value==user.user_metadata.city)[0]) as SelectValue,
        zipcode:user.user_metadata.zipcode as string,
 
        manager:{
          avatar_url:user.user_metadata.avatar_url as any,
          name:user.user_metadata.name?`${user.user_metadata.name}`:user.user_metadata.full_name  as string,
          email:`${user.email}`,
          phone:user.user_metadata.phone?`${user.user_metadata.phone}`:"0_ __ __ __ __" 
        }
      },
      validationSchema: Yup.object({
          address:Yup.string().required("required."),
          city:Yup.object().required('required.'),
          manager:Yup.object({
            name:Yup.string().required('required.'),
                  //@ts-ignore
            phone:Yup.string().validPhone!("incorrect phone number"),
                }),
          

      }),
      onSubmit: (values) => {
        //console.log("Submit")
        console.log("city",values.city)
        setIsLoaded(false);
        setIsUpdateLoaded(true);
      if(formik.isValid){      
          let data={	
           
            address: values.address,	
            city: (values.city! as Option).value,	
            zipcode:values.zipcode,
           
              manager:{...values.manager},
              avatar_url:userAvatar
            
          }
      
        console.log("data",data)
        updateClientV0(data).then(res=>{
          console.log("res",res)
        const url=(`/backoffice/client/${client_id}/`)
        router.push(url)
        
        setIsUpdateLoaded(false)
      }).catch(e=>{
        console.log("error",e)
        setIsLoaded(false)
        
        setIsUpdateLoaded(false)
      })
        }
      },
    });


   

    return <div className=" p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">User profil</h2>
      <p className="text-gray-500 mb-6">edit your user profil.</p>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pb-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">User details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            

             { /*<div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
            </div>*/}
          <div className="md:col-span-5 flex flex-row items-center justify-center lg:justify-start py-4 ">
                <label htmlFor="name"></label>
                <AvatarUploader initialValue={user.user_metadata.avatar_url} isUploading={setIsAvatarUploading} setUploadedFilePath={(url)=>setUserAvatar(url)} containerClass=""  isEnabled={isLoaded}/>
               <div className={`${isAvatarUploading?'flex':'hidden'} flex-row items-center justify-start`}> 
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
                  Email Address !
                  <span className=' self-center text-right text-red-500 text-xs'> &nbsp;{(formik.touched.manager?.email && formik.errors.manager?.email ? formik.errors.manager.email : '') }</span>
             </label>
                {/*<input 
                  disabled={true}
                  value={formik.values.manager.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text" name="manager.email" id="manager.email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                */}
                <label className="p-4 flex">{user.email}</label>
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
             <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded || isUpdateLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white  py-2 px-4 rounded flex">
                    {!isUpdateLoaded && <>Update profil</>}
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
       
        
    

        <hr className="mt-4"></hr>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-12">
          <div className="text-red-500 font-bold">
            <p>Danger zone.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label  className="text-red-600 p-4 w-full ">
                  Disabling an account would remove all active data related to it.
                </label>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded || isDeleteLoaded} onClick={()=>{formik_delete.submitForm()}} className="bg-red-600 hover:bg-red-700 text-xs text-white  py-2 px-4 rounded flex">
                    
                    {!isDeleteLoaded && <>Disable account</>}
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