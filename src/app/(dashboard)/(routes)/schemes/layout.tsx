import Header from '@/app/(dashboard)/(routes)/schemes/components/header';
import React from 'react';


export default async function Layout({children}: { children: React.ReactNode }) {
    return <section>
        <Header/>
        {children}
    </section>;
}
