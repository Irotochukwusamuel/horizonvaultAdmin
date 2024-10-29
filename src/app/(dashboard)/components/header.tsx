'use client';


import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useUserStore} from '@/lib/store';
import {ChevronDown} from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import Logo from "@/assets/images/Horiznlogo.png"

export default function Header() {
    const {user} = useUserStore();
    const {first_name, last_name, email} = user || {};

    return (
        <div className='flex h-[80px] w-full items-center justify-between border-b border-gray-500  bg-base-white px-[44px]'>
            <Link href='/users'>
                <Image src={Logo} alt={'logo'}/>
            </Link>

            <div className='flex items-center gap-[8px]'>
                <div className='relative'>
                    <Avatar>
                        <AvatarFallback className='bg-gray-550 font-semibold text-base-black'>
                            {email?.charAt(0)?.toUpperCase() || 'A'}
                        </AvatarFallback>
                    </Avatar>
                    <span className='absolute bottom-0 left-7 h-[10px] w-[10px] rounded-full border border-base-white bg-success-100'></span>
                </div>
            </div>
        </div>
    );
}
