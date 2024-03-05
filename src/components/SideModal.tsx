export default function SideModal({title,component, onValidate, onCancel, isLoading=false}){
    return <div className="fixed z-30 flex justify-end top-0 left-0 h-screen w-screen">
        
        <label onClick={onCancel} className=" absolute top-0 left-0 w-full h-full bg-black/10" ></label>
        <div className="absolute flex flex-col top-0 right-0 h-full bg-white shadow z-10 w-380 max-w-[85%] ">
            <div className="p-4 text-sm font-semibold border-b-2 border-[#eeeeee] min-h-14">{title}</div>
            <div className="flex max-h-full flex-1 flex-col relative overflow-auto">
                {component}
            </div>
        </div>
    </div>
}