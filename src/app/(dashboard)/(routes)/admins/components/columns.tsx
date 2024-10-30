'use client';
import {ColumnDef} from '@tanstack/react-table';
import {Ban, CheckCircle} from 'lucide-react';
import {cn} from '@/lib/utils';
import React from 'react';
import {AppwriteUser} from '@/types/user';
import {format} from 'date-fns';
import DialogPop from '@/components/dialog-view';
import {disableUser, enableUser} from '@/services/user';
import {parseCookies} from "nookies";
import {CommonApi} from "@/services/CommonAPI";

const cookies = parseCookies(null)
const common = new CommonApi(cookies?.sessionId)
export const AdminColumns: ColumnDef<object>[] = [
    {
        header: 'ID',
        cell: ({row}) => row?.original?.id,

    },
    {
        accessorKey: 'wallet_name',
        header: 'Wallet Name',
    },
    {
        accessorKey: 'wallet_id',
        header: 'Wallet Address ',
    },
    {
        header: 'Date Created',
        cell: ({row}) => format((row?.original?.created_at * 1000) as string, 'MMM dd, yyyy'),
    },
    {
        id: 'action',
        header: 'Delete Wallet',
        cell: ({row}) => {
            const coin_id = row.original.id;
            const wallet_address = row.original.wallet_id;
            return (
                <DialogPop
                    TriggerIcon={<Ban size={19} color="white"/>}
                    TriggerName={'Delete'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#D92D20]')}
                    DialogName={'Delete Wallet'}
                    DialogDesc={'Are you sure you want to delete this wallet ?' }
                    DialogCancelName={'Cancel'}
                    DialogActionName={ 'Delete Wallet'}
                    DialogActionCallback={async () => await common.RemoveAdminWallet(wallet_address, coin_id)}
                    SuccessMessage={'Wallet successfully deleted.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={'bg-[#D92D20]' }
                    DialogCancelClassName={'border-[#D92D20] text-[#D92D20]' }
                />
            );

        },
    },
];

