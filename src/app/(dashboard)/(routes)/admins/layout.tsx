import Header from '@/app/(dashboard)/(routes)/admins/components/header';
import React from 'react';


export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>
    <Header />
    {children}
  </section>;
}
