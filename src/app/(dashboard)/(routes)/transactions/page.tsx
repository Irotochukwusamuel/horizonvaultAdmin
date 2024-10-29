import Body from '@/app/(dashboard)/(routes)/transactions/components/body';
import {CommonApi} from "@/services/CommonAPI";
import {cookies} from "next/headers";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const transactions = await common.Transactions(1, 20000)
    return <Body data={transactions} />
}
