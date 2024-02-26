
import { randomUUID } from "crypto";


export default async function Profile() {
    return <>PROFILE { randomUUID().toString()}</>
}
