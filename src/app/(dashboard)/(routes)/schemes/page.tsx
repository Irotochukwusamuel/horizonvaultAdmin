import Body from '@/app/(dashboard)/(routes)/schemes/components/body';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const schemes = await common.GetAllSchemes()
    return <Body data={schemes ?? []}/>
}
