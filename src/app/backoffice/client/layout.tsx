
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket, faCalendar, faCar, faDashboard, faTicket, faUser } from "@fortawesome/free-solid-svg-icons"
import  AuthProvider  from '@/contexts/AuthProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';



export default async function Layout({ children }) {
    const supabase= createServerComponentClient({cookies})
    const {data:{user}}= await supabase.auth.getUser()
    console.log(user)
    if(!user){
        redirect('/access')
    }
    if(!user?.user_metadata.is_client){
        if(user?.user_metadata.is_provider)
            redirect( `/backoffice/provider/${user.id}`);
        else
            redirect('/registration')
    }
  return (
    <AuthProvider value={user}>
    <div className="w-screen h-screen flex flex-1  bg-[#edeff2] p-4">
    <div className="hidden lg:flex flex-col xshadow-lg z-[1] w-full lg:max-w-[20rem] lg:min-w-[20rem] max-w-full bg-white  rounded-lg " >
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
                    <Link href={`/backoffice/client/${user.id}`} className="flex min-w-[15rem] text-sm flex-col lg:flex-row  text-gray-600 items-center p-4 bg-white shadow lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4">
                        <FontAwesomeIcon icon={faDashboard} className=""/>
                        </div>
                        <div className="p-4">Tableau de board</div>
                    </Link>

                    <Link href={`/backoffice/client/${user.id}/profil`} className="flex  min-w-[15rem]  flex-col lg:flex-row text-sm text-gray-600 items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4 ">
                            
                        <FontAwesomeIcon icon={faUser} className=""/>
                        </div>
                        <div className="p-4">Mon profile</div>
                    </Link>

                    <button  className="flex  min-w-[15rem]  flex-col lg:flex-row text-sm text-gray-600 items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4">
                            <FontAwesomeIcon icon={faCalendar} className=""/>
                        </div>
                        <div className="p-4">Mes rendez-vous</div>
                    </button>
                    
                    <button  className="flex cursor-pointer  min-w-[15rem] flex-col lg:flex-row text-sm  text-gray-600 items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4">
                           
                        <FontAwesomeIcon  icon={faTicket} className=""/>
                        </div>
                        <div className="p-4">Mes tickets</div>
                    </button>


                    <Link prefetch={false}  href={`/auth/v1/logout/`} className="flex cursor-pointer  min-w-[15rem] flex-col lg:flex-row text-sm  text-gray-600 items-center p-4 bg-white shadow  lg:shadow-none lg:bg-transparent lg:py-0">
                        <div className="p-4">
                        <FontAwesomeIcon icon={faArrowRightToBracket} className=""/>
                        </div>
                        <div className="p-4">Disconnect</div>
                    </Link>

                </div>
            </div>
        </div>
        <div className="flex flex-1 flex-col relative overflow-x-hidden">
            {children}
        </div>
        </div>
        </AuthProvider>
  )
}