//import {supabase} from '@/utils/supabase'
import { getVehicleTypes } from '@/app/global-actions'
import { TypeMetaV1 } from '@/metadata.types'
import { getCookie } from 'cookies-next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import NavBar from '../components/navbar'
import { NextPageContext } from 'next'

export default async function Page(params) {

  const supabase= createServerComponentClient({cookies})
  const {data,error} = await getVehicleTypes()
  
  return (
    <>
    </>
  )
}

