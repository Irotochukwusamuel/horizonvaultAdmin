import Body from '@/app/(dashboard)/(routes)/investments/components/body';
import {CommonApi} from "@/services/CommonAPI";
import {cookies} from "next/headers";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const investments = await common.GetAllInvestments()
    return <Body data={investments} />
}
