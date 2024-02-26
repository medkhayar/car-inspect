import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  let redirectUrl=requestUrl.origin;

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const session=await supabase.auth.exchangeCodeForSession(code)
    if(session){
      if(session.data.user?.user_metadata.is_provider){
        redirectUrl=`${requestUrl.origin}/backoffice/provider/${session.data.user?.id}`
      }
      else if(session.data.user?.user_metadata.is_client){
        redirectUrl=`${requestUrl.origin}/backoffice/client/${session.data.user?.id}`
      }

      else{
        redirectUrl=`${requestUrl.origin}/registration`
      }
      
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectUrl)
}