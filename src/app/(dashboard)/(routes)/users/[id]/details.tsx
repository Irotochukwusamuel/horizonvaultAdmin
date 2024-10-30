'use client';
import React from 'react';
import Image from 'next/image';
import WarningIcon from '@/assets/icons/warning.svg';
import {ChevronLeft} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {AppwriteUser} from '@/types/user';
import {DataTable} from '@/components/data-table';
import {CustomerColumns, PaymentDetailColumn, WalletDetailColumn} from '@/app/(dashboard)/(routes)/users/components/columns';
import {format} from 'date-fns';
import profile from '@/assets/images/profile.jpg';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';


type cardType = { label: string; value: string | number }[]
const InformationCard = ({title, data, color}: { title: string, data: cardType, color: string }) => {
    return (
        <section className="mt-14 w-full">

            <p className="text-[#2D3045] text-[18px] font-semibold">{title}</p>

            <div className={cn('mt-5 p-[20px] rounded-[6px] grid grid-cols-3 gap-[40px]', color)}>
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


const Details = ({user}: { user: { user: object, transactions: object, wallets: object } }) => {

    const navigate = useRouter();

    const user_info : AppwriteUser = user?.user

    console.log("user_info", user)

    const User_field: cardType = [
        {label: 'Full name', value: `${user_info?.first_name} ${user_info?.last_name}`},
        {label: 'Username', value: user_info?.username},
        {label: 'Email Address', value: user_info?.email ?? 'N/A'},
        {label: 'Is Email Verified', value: user_info?.isEmailVerified ? 'Yes' : "No" ?? 'N/A'},
        {label: 'Phone Number', value: user_info?.msisdn ?? 'N/A'},
        {label: 'Is Active', value: user_info?.isDeactivated ? 'No' : 'Yes' ?? 'N/A'},
        {label: 'Is Admin', value: user_info?.is_admin ? 'Yes' : 'No' ?? 'N/A'},
        {label: 'Date Joined', value: format(Number(user_info?.created_at * 1000), 'dd/MM/yyyy')},
    ];

    const current_row = () => {
        let row: { balance: number, wallet_id: string, wallet_name: string } = user?.wallets
        return row;
    };


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
                            {user_info?.email?.charAt(0)?.toUpperCase() || 'A'}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-[18px] font-semibold">{user_info?.first_name} {user_info?.last_name}</p>
                </div>

            </div>

            <div className="flex justify-between items-center gap-5">
                <InformationCard title={'User Information'} data={User_field} color="bg-[#F6FEF9]"/>
            </div>

            <div className="mt-5">
                <p className="text-[#2D3045] text-[18px] font-semibold"> User Wallets</p>


                <div>
                    <DataTable
                        searchKey="wallet_name"
                        hasFooter
                        paginationSize={10}
                        regular
                        columns={WalletDetailColumn}
                        data={current_row()}

                    />
                </div>
            </div>


        </div>
    );
};

export default Details;
