
//import {supabase} from '@/utils/supabase'
import { addTest, getTests, getVehicleTypes } from '@/app/global-actions'
import { Localized, TypeMetaV1 } from '@/metadata.types'
import { getCookie } from 'cookies-next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import { NextPageContext } from 'next'
import NavBar from '../components/navbar'

export default async function Page(params) {

  const supabase= createServerComponentClient({cookies})
  const {data,error} = await getVehicleTypes()
  const tests = await getTests() 
  //console.log("tests",tests)


  
  return (
    <>
    tests {tests.count?.toString()} <br/>
    {tests.data?.map(t=><>
    <p>--{t.data.name}</p>
    </>)}
    
    <NavBar/>


    {JSON.stringify(headers().get("x-pathname"))}
        {data?.map(vt=><>
          <p>{(vt.type as Localized).en}</p>
          <div dangerouslySetInnerHTML={{__html:(vt.metadata as TypeMetaV1).icon.content}}></div>
        </>  )}
        
    </>
  )
}

