import Header from '@/app/(dashboard)/(routes)/admins/components/header';
import React from 'react';
import {cookies} from "next/headers";
import {CommonApi} from "@/services/CommonAPI";


export default async function Layout({children}: { children: React.ReactNode }) {
    const token = cookies().get('sessionId')?.value as string
    const common = new CommonApi(token)
    const wallet_list = await common.wallet_list()
    return <section>
        <Header wallet_list={wallet_list}/>
        {children}
    </section>;
}
