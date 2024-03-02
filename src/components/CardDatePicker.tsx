
import { BaseSingleInputFieldProps, DatePicker, DatePickerProps, DateValidationError, FieldSection, MobileDatePicker, UseDateFieldProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React, { ReactElement, useEffect } from "react";

interface CardFieldProps
  extends UseDateFieldProps<Moment>,
    BaseSingleInputFieldProps<
      Moment | null,
      Moment,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?:string,
  inputClassName?:string,
  dateFormat?:string,
  icon?:ReactElement,
  clearIcon?:ReactElement,
  setValue?:any
  style?:any

  
}

function CardField(props: CardFieldProps) {
  const {
    setOpen,
    label,
    value,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
    className,
    inputClassName,
    dateFormat,
    icon,
    clearIcon,
    setValue,
    style
  } = props;

  return (<div className={className} style={style}>
  
    <input placeholder={`${label}`}  type='text' className='hidden'
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      value={`${value? value.format(dateFormat): ''}`} 
      onChange={()=>{}}
    />
    
    <div className={'relative group  rounded cursor-pointer shadow h-full w-full bg-white '} onClick={() => setOpen?.((prev) => !prev)}>
    
   
   <div className="  blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
     
   </div>
   
   <div className={`relative h-full overflow-hidden px-7 py-6  ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col sm:flex-row lg:flex-col items-top justify-start items-center`}>
  
     <div  className={`w-16 h-16 p-4 flex-shrink-0 `}  >
     <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
     </div>
  
     
     <div className="space-y-0 px-4">
       <p className="text-gray-700 text-sm font-semibold">{`${value? value.format(dateFormat): ''}`} </p>
       
     </div>

 </div></div>
    
    </div>
  );
}

export default function CardDatePicker(
  props: (Omit<DatePickerProps<Moment>, 'open' | 'onOpen' | 'onClose'>) & {
  className?,
  inputClassName?,
  dateFormat?,
  icon?,
  clearIcon,
  style?
  }
) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Moment|null>(props.value!);
  useEffect(()=>{
    setValue(props.value!)
  },[props.value])

  return (
    <MobileDatePicker
      slots={{ field: CardField, ...props.slots }}
      slotProps={{ field: { setOpen,
        className:props.className,
        inputClassName:props.inputClassName, 
        dateFormat:props.dateFormat,
        icon:props.icon,
        clearIcon:props.clearIcon,
       setValue:setValue,
       style:props.style
      } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      label={props.label}
      value={value}
      onChange={(value,ctx)=>{setValue(value);if(props.onChange)props.onChange(value,ctx)}}
    />
  );
}