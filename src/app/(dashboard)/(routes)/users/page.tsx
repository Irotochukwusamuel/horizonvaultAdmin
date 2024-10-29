import Body from '@/app/(dashboard)/(routes)/users/components/body';
import {CommonApi} from "@/services/CommonAPI";
import {cookies} from "next/headers";

export default async function Page() {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const users = await common.Users(1, 20000)
    return <Body data={users} />
}
