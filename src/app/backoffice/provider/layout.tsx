
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket, faCalendar, faCar, faDashboard, faTicket, faUser } from "@fortawesome/free-solid-svg-icons"
import  AuthProvider  from '@/contexts/AuthProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BlueRibbon from './components/BlueRibbon';



export default async function Layout({ children }) {
    const supabase= createServerComponentClient({cookies})
    const {data:{user}}= await supabase.auth.getUser()
    const pathname= headers().get("x-pathname")
    if(!user){
        redirect('/access')
    }
    if(!user?.user_metadata.is_provider){
        if(user?.user_metadata.is_provider)
            redirect( `/backoffice/client/${user.id}`);
        else
            redirect('/registration')
    }else{
        if(!user?.user_metadata.is_registration_complete && !pathname?.endsWith('/profil')){
            redirect( `/backoffice/provider/${user.id}/profil`);
            //console.log(pathname)
        }
    }
  return(<>
        
    <div className="w-screen h-screen flex flex-1 bg-[#f7f7f7]  bg-[##edeff2] ">
    <div className="hidden lg:flex flex-col shadow-lg z-[1] w-full lg:max-w-[20rem] lg:min-w-[20rem] max-w-full bg-white  --rounded-lg --m-4" >
            <Link href='/' className="flex w-full p-6  items-center sm:self-start text-picton-blue-600">
                                    <svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <path
                                                fill="currentColor"
                                                d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                            />
                                        </g>
                                    </svg>
                                    <h2 className="block text-base text-gray-700 font-bold leading-normal pl-3">Car Inspect</h2>
            </Link>
            <div className="flex  overflow-y-clip">
                <div className="grid gap-6 lg:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-full  p-4 justify-items-center lg:justify-items-start">
                    
                     
                <div className="flex md:col-span-2 lg:hidden font-semibold p-4"><span className="text-gray-500">Welcome back : &nbsp;</span> {user.user_metadata.full_name}</div>

                <div className="hidden lg:flex flex-col w-full justify-center items-center mb-3">
                    <button className="relative z-10 flex items-center text-sm text-gray-600  border border-transparent  dark:bg-gray-900 focus:outline-none transition-colors duration-200 transform dark:text-gray-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 dark:group-hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white  ">
                        <div className=" flex flex-col items-center p-2.5 lg:pr-0">
                            <img className="flex-shrink-0 object-cover m-2 rounded-full w-20 h-20 border border-gray-600 border-opacity-10 dark:border-white dark:border-opacity-10" referrerPolicy="no-referrer" src={user.user_metadata.avatar_url} alt="jane avatar" />
                            <div className="mx-1 hidden lg:flex flex-col">
                                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase">{user.user_metadata.full_name}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                        </div>

                    </button>
                        
                    <hr className=' w-full mt-2'></hr>
                    </div>
                    <Link   href={`/backoffice/provider/${user.id}`} className={`${!user?.user_metadata.is_registration_complete?'pointer-events-none text-gray-200':''} flex  min-w-[15rem]  flex-col lg:flex-row text-sm  items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0`}>
                        <div className="p-4">
                        <FontAwesomeIcon icon={faDashboard} className=""/>
                        </div>
                        <div className="p-4">Dashboard</div>
                    </Link>

                    <Link   href={`/backoffice/provider/${user.id}/profil`} className="flex  min-w-[15rem]  flex-col lg:flex-row text-sm items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4 ">
                            
                        <FontAwesomeIcon icon={faUser} className=""/>
                        </div>
                        <div className="p-4">Profil</div>
                    </Link>

                    <Link    href={`/backoffice/provider/${user.id}/centers`} className={`${!user?.user_metadata.is_registration_complete?'pointer-events-none text-gray-200':''} flex  min-w-[15rem]  flex-col lg:flex-row text-sm items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0`}>
                        <div className="p-4">
                            
                        <FontAwesomeIcon icon={faCar} className=""/>
                        </div>
                        <div className="p-4">Centers</div>
                    </Link>
                  

                    <Link   href={`/backoffice/provider/${user.id}/appointments`} className={`${!user?.user_metadata.is_registration_complete?'pointer-events-none text-gray-200':''} flex  min-w-[15rem]  flex-col lg:flex-row text-sm  items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0`}>
                        <div className="p-4">
                            <FontAwesomeIcon icon={faCalendar} className=""/>
                        </div>
                        <div className="p-4">Appointments</div>
                    </Link>
                    
                    <Link  prefetch={false}  href={`/auth/v1/logout/`} className="flex cursor-pointer  min-w-[15rem] flex-col lg:flex-row text-sm   items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4">
                        <FontAwesomeIcon icon={faArrowRightToBracket} className=""/>
                        </div>
                        <div className="p-4">Disconnect</div>
                    </Link>
                    

                </div>
            </div>
        </div>
        <div className="flex flex-1 flex-col relative overflow-x-hidden ">
            <div className='flex'>
                <BlueRibbon/>
            </div>
            <div className='flex flex-1 flex-col relative overflow-x-hidden '>
                {children}
            </div>
        </div>
        </div>
        </>
  )
}