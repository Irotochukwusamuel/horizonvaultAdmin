import React from 'react';
import Details from '@/app/(dashboard)/(routes)/users/[id]/details';
import {getUserById} from '@/services/user';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";

const Page = async ({params}: { params: { id: number } }) => {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const user = await common.getUser(params.id)

    return (
        <div>
            <Details user={user}/>
        </div>
    );
};

export default Page;
