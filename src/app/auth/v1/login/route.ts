import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const data = await request.json()
  const email = String(data.email)
  const password = String(data.password)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  const {data:{user}}=await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if(user){
    return NextResponse.json({status:'authenticated'},{
      status:200
    })
  }
  else{
    return NextResponse.json({status:'error'},{
      status:501
    })
  }
  /*return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })*/
}