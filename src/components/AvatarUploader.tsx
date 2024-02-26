'use client'

import axios from 'axios'
import { createRef, useEffect, useRef, useState } from 'react'

export function AvatarUploader({
      initialValue="",
      isEnabled,
      isUploading=(isUplading)=>{},
      containerClass="",
      imageClass="",
      setUploadedFilePath=(url)=>{}},
      setProgress=(progress)=>{},
      isLoading=(loading)=>{}
  ) {

  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File|undefined>(undefined)
  const [previewPath, setPreviewPath] = useState<string>(initialValue)
  const [uploadError, setUploadError] = useState<string|null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>|null) => {
    isUploading(true);
    console.log("submit")
    if(e){
      e.preventDefault()
    }
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await axios.request({
        url:'/api/upload-avatar', 
        method: 'POST',
        data: data,
        onUploadProgress:(p)=>{
            console.log("progress",p.progress)
        }
        
      }).then((res)=>{
        console.log("uploaded")
        setPreviewPath(res.data.url)
        if(setUploadedFilePath){
          setUploadedFilePath(res.data.url)
        }
        isUploading(false)
      }).catch(r=>{
        console.log("error")
        isUploading(false)
        setUploadError("Upload error. please reload the file")
      })

    } catch (e: any) {
      // Handle errors here
      
      console.error(e)
    }
  }
  const handleClick = event => {
    if(isEnabled){
      console.log("click",fileRef.current);
      fileRef.current!.click();
    }
  };

  useEffect(()=>{
    if(file){
      setPreviewPath(URL.createObjectURL(file!));
      onSubmit(null)
    }
  },[file])

  return (
    <form  onSubmit={onSubmit} className={containerClass}>
      <input
      hidden
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files?.[0])
          //console.log()
          //setPreviewPath(URL.createObjectURL(e.target.files?.item(0)!))
          
        }}
        ref={fileRef}
        accept="image/*"
      />
      <input  hidden type="submit" value="Upload" disabled={!isEnabled} />
      <img onClick={handleClick} className={imageClass?imageClass:' cursor-pointer w-24 h-24 rounded-full border object-cover'} src={previewPath || "/assets/logo-placeholder.jpg"}></img>
    </form>
  )
}