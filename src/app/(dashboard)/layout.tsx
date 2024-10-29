'use client';

import {useUserStore} from '@/lib/store';
import Header from './components/header';
import Sidebar from './components/sidebar';
import {destroyCookie, parseCookies} from 'nookies';
import {getUser} from '@/services/auth';
import {useQuery} from '@tanstack/react-query';
import {usePathname} from 'next/navigation';
import {CommonApi} from "@/services/CommonAPI";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const {setUser, user} = useUserStore();
    const pathName = usePathname();
    const cookies = parseCookies(null)
    const common = new CommonApi(cookies?.sessionId)
    // Fetch and set user
    const {} = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => {
            try {
                const res = await common.me()
                setUser(res);
                return res;
            } catch (e) {
                destroyCookie(null, 'sessionId');
                localStorage?.removeItem('user');
                return user;
            }
        },
        enabled: !['/', 'forgot-password', 'reset-password'].includes(pathName),
    });

    return (
        <div className='flex h-full min-w-[1280px] flex-col overflow-x-auto'>
            <Header/>
            <div className='flex w-full flex-1 overflow-hidden'>
                <div className='relative h-full w-[280px] border-r border-gray-550 bg-base-white'>
                    <Sidebar/>
                </div>
                <div className='relative flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden p-10'>
                    {children}
                </div>
            </div>
        </div>
    );
}
