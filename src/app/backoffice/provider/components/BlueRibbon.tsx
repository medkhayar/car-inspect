import Marquee from "react-fast-marquee"

export default function BlueRibbon(){
    return <div className={` search relative z-[5] transition-all ease-in-out duration-100 flex flex-col w-full bg-picton-blue-400 justify-center items-center  py-2 `}>
    <div id='steps' className='flex flex-col w-full max-w-8xl mx-auto items-center justify-center'>
    <div className={`flex flex-col transition-all duration-100  ease-in-out lg:flex-row  p-4  w-full   z-10 rounded  `}>

      <div className=' flex flex-1   justify-center items-center  marquee '>
        <Marquee className="flex flex-col" pauseOnHover={true}>
          <div className="px-4 text-white font-semibold flex items-center">
            <img src="/assets/te.png" className="h-12 w-12 p-2 mx-2 bg-white rounded-full"/>
            <span>This app is brought to you by total energy</span>
          </div>
        </Marquee>
      </div>
      
    </div>
   
 </div>
 <ul className='circles'>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
 </ul>
  </div>
}