import Body from '@/app/(dashboard)/(routes)/coins/components/body';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const coins = await common.GetAllCoins()
    console.log(coins)
    return <Body data={coins ?? []}/>
}
