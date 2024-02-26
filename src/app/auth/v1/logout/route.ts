import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import type { Database } from '@/database.types'
import { deleteCookie } from 'cookies-next'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  const {error}=await supabase.auth.signOut()
  if (error) {
    return Response.json({ error: error.message },{status:500});
  }

  deleteCookie('my-refresh-token');
  deleteCookie('my-access-token');

  return redirect('/access');
}