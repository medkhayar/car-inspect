"use client"

import { addNewCenterV0, deleteUserV0, updateProviderV0 } from "@/app/global-actions"
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

export default function NewCenter({user,provider_id,cities,error}){

  let _logo=null;
  try{
    _logo=user.user_metadata.company.logo;
  }catch(e){}

  let _avatar=null;
  try{
    _avatar=user.user_metadata.avatar_url;
  }catch(e){}

  const [isLoaded,setIsLoaded]=useState(false)
  const [isDeleteLoaded,setIsDeleteLoaded]=useState(false)
  const [logo,setLogo]=useState<any>(_logo)
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
          deleteUserV0().then(res=>{ 
              const url=(`/access`)
              router.push(url)
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
        name :user.user_metadata.company.name as string,
        address:user.user_metadata.company.address as string,
        city:(null || cities.filter(c=>c.value==user.user_metadata.company.city)[0]) as SelectValue,
        zipcode:user.user_metadata.company.zipcode as string,
        logo:user.user_metadata.company.logo as any,
        manager:{
          avatar_url:user.user_metadata.avatar_url as any,
          name:`${user.user_metadata.full_name}` ,
          email:`${user.email}`,
          phone:user.user_metadata.company.manager.phone?`${user.user_metadata.company.manager.phone}`:"0_ __ __ __ __" 
        },
        support:{
          name:user.user_metadata.company.support.name as string,
          email:user.user_metadata.company.support.email as string,
          phone:(user.user_metadata.company.support.phone?user.user_metadata.company.manager.phone:"0_ __ __ __ __") as string
        }
      },
      validationSchema: Yup.object({
          name:Yup.string().required("required."),
          address:Yup.string().required("required."),
          city:Yup.object().required('required.'),
          manager:Yup.object({
            name:Yup.string().required('required.'),
                  //@ts-ignore
            phone:Yup.string().validPhone!("incorrect phone number"),
                }),
          support:Yup.object({
                //@ts-ignore
            email:Yup.string().validEmail('incorrect email format.'),
                  //@ts-ignore
            phone:Yup.string().validPhone!("incorrect phone number"),
          })

      }),
      onSubmit: (values) => {
        //console.log("Submit")
        console.log("city",values.city)
        setIsLoaded(false);
      if(formik.isValid){      
          let data={	
            logo:logo,
            name: values.name,	
            address: values.address,	
            city: (values.city! as Option).value,	
            zipcode:values.zipcode,
            manager:{
              ...values.manager,
              avatar_url:userAvatar
            },
            support: values.support
          }
      
        console.log("data",data)
        updateProviderV0(data).then(res=>{
          console.log("res",res)
        const url=(`/backoffice/provider/${provider_id}/`)
        router.push(url)
      }).catch(e=>{
        console.log("error",e)
        setIsLoaded(false)
      })
        }
      },
    });


   

    return <div className=" p-6 flex ">
    <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Company profil</h2>
      <p className="text-gray-500 mb-6">edit your company profil.</p>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pb-6">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Company details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5 flex flex-row items-center justify-center lg:justify-start py-4 ">
                <label htmlFor="name"></label>
                <AvatarUploader initialValue={user.user_metadata.company.logo} isUploading={setIsUploading} setUploadedFilePath={(url)=>setLogo(url)} containerClass=""  isEnabled={isLoaded}/>
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
            <p>Company manager.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
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


            </div>
          </div>
        </div>
        
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 pt-12">
          <div className="text-gray-600">
            <p>Company support.</p>
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
                  Email Address
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
                  Phone
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
                  <button disabled={!isLoaded} onClick={()=>{formik.submitForm()}} className="bg-[#3D84A7] hover:bg-[#47466D] text-xs text-white  py-2 px-4 rounded">Update profil</button>
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
                  Disabling an account would remove all active data related to it.
                </label>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button disabled={!isLoaded} onClick={()=>{formik_delete.submitForm()}} className="bg-red-600 hover:bg-red-700 text-xs text-white  py-2 px-4 rounded">Disable account</button>
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