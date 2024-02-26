import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/database.types'

export async function POST(request: Request) {
  
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const phone = String(formData.get('phone'))
  const is_client = Boolean(formData.get('is_client'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  await supabase.auth.signUp({
    email,
    password,
    phone:phone,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data:{
        is_client: is_client
      }
    },
  })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}