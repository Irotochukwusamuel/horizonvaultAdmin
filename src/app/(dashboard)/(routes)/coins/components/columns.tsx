'use client';
import {ColumnDef} from '@tanstack/react-table';
import {EditIcon, PlusIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import React from 'react';
import {format} from 'date-fns';
import {UpdateRate} from "@/app/(dashboard)/(routes)/coins/components/update-rate";

export const CoinsColumns: ColumnDef<object>[] = [
    {
        header: 'ID',
        cell: ({row}) => row?.original?.id,
    },
    {
        accessorKey: 'name',
        header: 'Coin Name',
    },
    {
        accessorKey: 'rate',
        header: 'Coin Rate',
    },
    {
        accessorKey: 'symbol',
        header: 'Symbol',
    },
    {
        header: 'Date Created',
        cell: ({row}) => format((row?.original?.created_at * 1000) as string, 'MMM dd, yyyy'),
    },
    {
        header: 'Last Updated',
        cell: ({row}) => format((row?.original?.last_updated * 1000) as string, 'MMM dd, yyyy'),
    },
    {
        id: 'action',
        header: 'Update Rate',
        cell: ({row}) => {
            const coin_id = row?.original?.id;
            return (
                <UpdateRate
                    TriggerIcon={<EditIcon size={14} color="white"/>}
                    TriggerName={'Update Rate'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#14912D]')}
                    SuccessMessage={'Coin Rate has been successfully updated!'}
                    DialogActionClassName={'bg-[#14912D]'}
                    DialogCancelClassName={'border-[#14912D] text-[#14912D]'}
                    coin_id={coin_id}
                    actionType='Update Rate'
                />
            );

        },
    },
];

