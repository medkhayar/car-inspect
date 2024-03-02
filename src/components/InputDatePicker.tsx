
import { BaseSingleInputFieldProps, DatePicker, DatePickerProps, DateValidationError, FieldSection, UseDateFieldProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React, { ReactElement, useEffect } from "react";

interface InputFieldProps
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

  
}

function InputField(props: InputFieldProps) {
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
  } = props;

  return (<div className={className}>
  
    <input placeholder={`${label}`}  type='text' className={inputClassName} 
      id={id}
      disabled={disabled}
      readOnly={true}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      value={`${value? value.format(dateFormat): ''}`} 
      onChange={()=>{}}
    />
    <span className=" inset-y-0 left-0 flex items-center pl-2">
    <button type="submit" className={`cursor-default relative flex  focus:outline-none focus:shadow-outline`} onClick={()=>{if(value){setValue(null)}else{setOpen?.((prev) => !prev)}}}>
    <span className="absolute w-px h-full inline-block text-white bg-gray-300 text-opacity-0"></span>
      <div className="px-1">
        
       {!value && icon}
       <div className="px-2px py-2px">
       {value && clearIcon}
       </div>
       </div>
    </button>
  </span>
    </div>
  );
}

export default function InputDatePicker(
  props: (Omit<DatePickerProps<Moment>, 'open' | 'onOpen' | 'onClose'>) & {
  className?,
  inputClassName?,
  dateFormat?,
  icon?,
  clearIcon,
  }
) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Moment|null>(props.value!);
  useEffect(()=>{
    setValue(props.value!)
  },[props.value])
  
  useEffect(()=>{
    if(!value){
      if(props.onAccept){
        props.onAccept(null)
      }
    }
  },[value])
  

  

  return (
    <DatePicker
      slots={{ field: InputField, ...props.slots }}
      slotProps={{ field: { setOpen,
        className:props.className,
        inputClassName:props.inputClassName, 
        dateFormat:props.dateFormat,
        icon:props.icon,
        clearIcon:props.clearIcon,
       setValue:setValue
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