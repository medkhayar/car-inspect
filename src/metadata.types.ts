import { ReactElement } from "react"

export type TypeMetaV1={
        version:number,
        description:Localized,
        icon : {
            type: IconTypeV1,
            content:string
        }
}

export type Localized={
    ar:string,
    fr:string,
    en:string
}

export enum IconTypeV1{
    svg = "svg",
    url= "url",
    base64= "base46"
}


export enum AlertTypeV1{
    error="error",
    info="info",
    warning="warning",
    confirm="confirm"
}

export type AlertData={
    type?:AlertTypeV1,
    title:string,
    message:string,
    detailsControl? : ReactElement
}