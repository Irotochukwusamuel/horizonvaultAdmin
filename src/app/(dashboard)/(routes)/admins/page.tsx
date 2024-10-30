import Body from '@/app/(dashboard)/(routes)/admins/components/body';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const admins_wallets = await common.admin_wallet_list()
    return <Body data={admins_wallets}/>
}
