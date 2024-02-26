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
