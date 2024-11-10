'use client';
import React from 'react';
import WarningIcon from '@/assets/icons/warning.svg';
import {ChevronLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Investments} from '@/types/user';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';


type cardType = { label: string; value: string | number }[]
const InformationCard = ({title, data, color}: { title: string, data: cardType, color: string }) => {
    return (
        <section className="mt-14 w-full">

            <p className="text-[#2D3045] text-[18px] font-semibold">{title}</p>

            <div className={cn('mt-5 p-[20px] rounded-[6px] grid grid-cols-2 gap-[40px]', color)}>
                {
                    data?.map((item, key) => {
                        return (
                            <div key={key}>
                                <p className="text-[#6C757D] text-[14px] font-medium">{item?.label}</p>
                                <p className="text-[#2D3045] text-[17px] font-semibold">{item?.value}</p>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

const EmptyNode = () => {
    return (
        <div className="flex flex-col items-center justify-center border-[1px] border-[#EAECF0] rounded-[16px] h-[200px]">
            <div className="bg-[#FEF3F2] h-[48px] w-[48px] rounded-[50%] flex justify-center items-center">
                <WarningIcon className="w-[24px] h-[24px] stroke-[#D92D20]"/>
            </div>
            <p className="mt-5">Payment information unavailable</p>
        </div>
    );
};


const Details = ({investment_info}: { investment_info: Investments }) => {

    const navigate = useRouter();

    const User_field: cardType = [
        {label: 'Full name', value: `${investment_info?.first_name} ${investment_info?.last_name}`},
        {label: 'Amount', value: investment_info?.amount},
        {label: 'Email Address', value: investment_info?.email ?? 'N/A'},
        {label: 'Deposit Type', value: investment_info?.deposit_type},
        {label: 'Investment Interval', value: investment_info?.investment_interval ?? 'N/A'},
        {label: 'Investment Name', value: investment_info?.investment_name},
        {label: 'Investment Rate', value: investment_info?.investment_rate},
        {label: 'Investment Status', value: investment_info?.status},
        {label: 'Date Created', value: format(Number(investment_info?.created_at * 1000), 'dd/MM/yyyy')},
    ];


    return (
        <div className="mt-5">

            <div className=" cursor-pointer flex items-center gap-1 mb-2" onClick={() => navigate.back()}>
                <ChevronLeft/>
                Back
            </div>

            <div className=" flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Avatar className='h-[72px] w-[72px]'>
                        <AvatarFallback className="bg-gray-550 font-semibold text-base-black ">
                            {investment_info?.email?.charAt(0)?.toUpperCase() || 'A'}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-[18px] font-semibold">{investment_info?.first_name} {investment_info?.last_name}</p>
                </div>

            </div>

            <div className="flex justify-between items-center gap-5">
                <InformationCard title={'User Information'} data={User_field} color="bg-[#F6FEF9]"/>
            </div>


        </div>
    );
};

export default Details;
