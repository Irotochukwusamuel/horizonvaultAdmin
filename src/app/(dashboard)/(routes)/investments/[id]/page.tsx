import React from 'react';
import Details from '@/app/(dashboard)/(routes)/investments/[id]/details';
import {getUserById} from '@/services/user';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";

const Page = async ({params}: { params: { id: number } }) => {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const investment = await common.GetInvestment(params.id)
    return (
        <div>
            <Details investment_info={investment}/>
        </div>
    );
};

export default Page;
