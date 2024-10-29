import Typography from '@/components/typography';
import {ReactNode} from 'react';

import Logo from '@/assets/icons/logo.svg';

export default function AuthWrapper({
                                        title,
                                        subtitle,
                                        children,
                                    }: {
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div className='flex flex-1 flex-col items-center justify-center'>
            <div className='flex w-[560px] flex-col items-center gap-[24px] rounded-[12px] border border-gray-550 p-[40px]'>
                <p className='font-semibold text-[20px]'>Horizon Vault</p>
                <div className='flex flex-col items-center'>
                    <Typography
                        variant='header-3'
                        fontWeight='semibold'
                        className='leading-[44px] text-base-black'
                    >
                        {title}
                    </Typography>
                    <Typography variant='body-1' className='text-center text-gray-300'>
                        {subtitle}
                    </Typography>
                </div>

                <div className='flex w-full flex-col gap-[20px]'>{children}</div>
            </div>
        </div>
    );
}
