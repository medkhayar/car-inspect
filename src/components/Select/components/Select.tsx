import React, { useCallback, useEffect, useRef, useState } from "react";

import { COLORS, DEFAULT_THEME, THEME_DATA } from "../constants";
import useOnClickOutside from "../hooks/use-onclick-outside";

import { ChevronIcon, CloseIcon } from "./Icons";
import Options from "./Options";
import SearchInput from "./SearchInput";
import SelectProvider from "./SelectProvider";
import Spinner from "./Spinner";
import { Option, Options as ListOption, SelectProps } from "./type";
import SingletonRouter, { Router, useRouter } from 'next/router';

const Select: React.FC<SelectProps & {containerClass?:any,selectClass?:any,selecetedLabelClass?:any , dropDownClosed?:any,title?:string,setIsOpen?:any}> = ({
    options = [],
    value = null,
    onChange,
    onSearchInputChange,
    placeholder = "Select...",
    searchInputPlaceholder = "Search...",
    isMultiple = false,
    isClearable = false,
    isSearchable = false,
    isDisabled = false,
    loading = false,
    menuIsOpen = false,
    noOptionsMessage = "No options found",
    primaryColor = DEFAULT_THEME,
    formatGroupLabel = null,
    formatOptionLabel = null,
    classNames,
    containerClass="",
    selectClass="",
    selecetedLabelClass="",
    title='',
    dropDownClosed,
    setIsOpen
}) => {
    const [open, setOpen] = useState<boolean>(menuIsOpen);
    const [list, setList] = useState<ListOption>(options);
    const [inputValue, setInputValue] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    const searchBoxRef = useRef<HTMLInputElement>(null);


    
    useEffect(()=>{
        if(setIsOpen){setIsOpen(open)}
    },[open])
    useEffect(()=>{
        setOpen(menuIsOpen)
    },[menuIsOpen])
    useEffect(() => {
        const formatItem = (item: Option) => {
            if ("disabled" in item) return item;
            return {
                ...item,
                disabled: false
            };
        };

        setList(
            options.map(item => {
                if ("options" in item) {
                    return {
                        label: item.label,
                        options: item.options.map(formatItem)
                    };
                } else {
                    return formatItem(item);
                }
            })
        );
    }, [options]);

    useEffect(() => {
        if (isSearchable) {
            if (open) {
                searchBoxRef.current?.select();
            } else {
                setInputValue("");
            }
        }
    }, [open, isSearchable]);

    const toggle = useCallback(() => {
        if (!isDisabled) {
            if(open){
            if(dropDownClosed){dropDownClosed()}
            }
            setOpen(!open);
            
        }
    }, [isDisabled, open]);

    const closeDropDown = useCallback(() => {
        if (open) {
            setOpen(false); 
            if(dropDownClosed){dropDownClosed()}
        }else{
        }
        
    }, [open]);


    useOnClickOutside(ref, () => {
        closeDropDown();
    });

    const onPressEnterOrSpace = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            e.preventDefault();
            if ((e.code === "Enter" || e.code === "Space") && !isDisabled) {
                toggle();
            }
        },
        [isDisabled, toggle]
    );

    const handleValueChange = useCallback(
        (selected: Option) => {
            function update() {
                if (!isMultiple && !Array.isArray(value)) {
                    closeDropDown();
                    onChange(selected);
                }

                if (isMultiple && (Array.isArray(value) || value === null)) {
                    onChange(value === null ? [selected] : [...value, selected]);
                }
            }

            if (selected !== value) {
                update();
            }
        },
        [closeDropDown, isMultiple, onChange, value]
    );

    const clearValue = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onChange(null);
        },
        [onChange]
    );

    const removeItem = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, item: Option) => {
            if (isMultiple && Array.isArray(value) && value.length) {
                e.stopPropagation();
                const result = value.filter(current => item.value !== current.value);
                onChange(result.length ? result : null);
            }
        },
        [isMultiple, onChange, value]
    );

    const getSelectClass = useCallback(() => {
        let ringColor = THEME_DATA.ring[DEFAULT_THEME];
        if (COLORS.includes(primaryColor)) {
            ringColor = THEME_DATA.ring[primaryColor as keyof typeof THEME_DATA.ring];
        }

        let borderFocus = THEME_DATA.borderFocus[DEFAULT_THEME];
        if (COLORS.includes(primaryColor)) {
            borderFocus =
                THEME_DATA.borderFocus[primaryColor as keyof typeof THEME_DATA.borderFocus];
        }
        const baseClass =
            "flex text-sm text-gray-500 border  rounded  transition-all duration-300 focus:outline-none";
        const defaultClass = `${baseClass} ${
            /*isDisabled
                ? "bg-gray-200"
                :*/ selectClass?selectClass:`bg-white   ${borderFocus} focus:ring ${ringColor}`
        }`;

        return classNames && classNames.menuButton
            ? classNames.menuButton({ isDisabled })
            : defaultClass;
    }, [classNames, isDisabled, primaryColor]);

    const getTagItemClass = useCallback(
        (item: Option) => {
            const baseClasse = "bg-gray-200 border rounded-sm flex space-x-1";
            const disabledClass = isDisabled ? "border-gray-500 px-1" : "pl-1";
            return classNames?.tagItem
                ? classNames.tagItem({ item, isDisabled })
                : `${baseClasse} ${disabledClass}`;
        },
        [classNames, isDisabled]
    );

    return (  
        <SelectProvider
            otherData={{
                formatGroupLabel,
                formatOptionLabel,
                classNames
            }}
            value={value}
            handleValueChange={handleValueChange}
        >
            <div tabIndex={0} className={`relative w-full ${containerClass}`} ref={ref}>
                <div
                    aria-expanded={open}
                    onKeyDown={onPressEnterOrSpace}
                    onClick={toggle}
                    className={getSelectClass()}
                >
                    <div className={`grow pl-2.5 ${(value &&(value! as Option).icon)?'':'py-2'} pr-2 flex flex-wrap gap-1`}>
                        {!isMultiple ? (
                            <div className="Select-inView flex items-center truncate line-clamp-1 cursor-default select-none">
                                {!value ? <span className="text-gray-400">{placeholder}</span> :
                                (value && !(value! as Option).icon && !(value! as Option).image) && (!Array.isArray(value) ? value.label :'')
                                }
                                {((value && (value! as Option).icon) && <>{(value! as Option).icon} 
                                <span className={`flex flex-col ${selecetedLabelClass}`}>
                                    {(value as Option).label} 
                                </span></>)}
                                
                                {((value && (value! as Option).image) && <>{(value! as Option).image} 
                                <span className={`flex flex-col ml-4 ${selecetedLabelClass}`} >
                                    {(value as Option).label} 
                                </span></>)}
                                
                            </div>
                        ) : (
                            <>
                                {value === null && placeholder}

                                {Array.isArray(value) &&
                                    value.map((item, index) => (
                                        <div className={getTagItemClass(item)} key={index}>
                                            <p
                                                className={
                                                    classNames?.tagItemText
                                                        ? classNames.tagItemText
                                                        : "text-gray-600 truncate cursor-default select-none"
                                                }
                                            >
                                                {item.label}
                                            </p>
                                            {!isDisabled && (
                                                <div
                                                    role="button"
                                                    tabIndex={-1}
                                                    onClick={e => removeItem(e, item)}
                                                    className={
                                                        classNames?.tagItemIconContainer
                                                            ? classNames.tagItemIconContainer
                                                            : "flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-200 hover:text-red-600"
                                                    }
                                                >
                                                    <CloseIcon
                                                        className={
                                                            classNames?.tagItemIcon
                                                                ? classNames.tagItemIcon
                                                                : "w-3 h-3 mt-0.5"
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>

                    <div className="flex flex-none items-center py-1.5">
                        {loading && (
                            <div className="px-1.5">
                                <Spinner primaryColor={primaryColor} />
                            </div>
                        )}

                        {isClearable && !isDisabled && value !== null && (
                            <>
                        <div className="h-full">
                        <span className="w-px h-full inline-block text-white bg-gray-300 text-opacity-0" />
                        </div>
                            <div className="px-1.5 cursor-pointer" onClick={clearValue}>
                                <CloseIcon
                                    className={
                                        classNames?.closeIcon
                                            ? classNames.closeIcon
                                            : "w-5 h-5 p-0.5"
                                    }
                                />
                            </div>
                            </>
                        )}


                        {(!value || (!isClearable && value)) && <>
                        <div className="h-full">
                            <span className="w-px h-full inline-block text-white bg-gray-300 text-opacity-0" />
                        </div>
                        <div className="px-1">
                            <ChevronIcon
                                className={`transition duration-300 w-6 h-6 p-0.5${
                                    open ? " transform rotate-90 text-gray-500" : " text-gray-300"
                                }`}
                            />
                        </div>
                        </>}
                    </div>
                </div>

                {open && !isDisabled && (
                    <div className="fixed  flex justify-center items-center  top-0 left-0 lg:top-auto lg:left-auto lg:absolute w-full  h-full lg:h-auto lg:m-0 md:w-full bg-black/50 z-[99] lg:z-[9] lg:bg-transparent" onClick={()=>toggle()}>
                    <div onClick={(e)=>[e.stopPropagation()]}
                        className={
                            classNames?.menu
                                ? classNames.menu
                                : " p-2 scale-110 lg:scale-100 w-[80%] max-w-md max-h-[475px] lg:w-full flex flex-col h-[75%]  bg-white shadow-lg border rounded lg:py-1  lg:px-0 lg:mt-1.5 text-sm text-gray-700"
                        }
                    >
                        <div className="lg:hidden text-sm font-semibold p-2">{title}</div>
                        <hr className="lg:hidden mt-2 py-1"></hr>
                        {isSearchable && (
                            <SearchInput
                                ref={searchBoxRef}
                                value={inputValue}
                                placeholder={searchInputPlaceholder}
                                onChange={e => {
                                    if (
                                        onSearchInputChange &&
                                        typeof onSearchInputChange === "function"
                                    )
                                        onSearchInputChange(e);
                                    setInputValue(e.target.value);
                                }}
                            />
                        )}

                        <Options
                            list={list}
                            noOptionsMessage={noOptionsMessage}
                            text={inputValue}
                            isMultiple={isMultiple}
                            value={value}
                            primaryColor={primaryColor || DEFAULT_THEME}
                        />
                    </div>
                    </div>
                )}
            </div>
        </SelectProvider>
        
    );
};

export default Select;
