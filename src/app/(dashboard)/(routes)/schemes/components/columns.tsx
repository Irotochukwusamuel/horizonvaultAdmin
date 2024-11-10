'use client';
import {ColumnDef} from '@tanstack/react-table';
import {Ban} from 'lucide-react';
import {cn} from '@/lib/utils';
import React from 'react';
import {format} from 'date-fns';
import DialogPop from '@/components/dialog-view';
import {parseCookies} from "nookies";
import {CommonApi} from "@/services/CommonAPI";

const cookies = parseCookies(null)
const common = new CommonApi(cookies?.sessionId)
export const SchemesColumns: ColumnDef<object>[] = [
    {
        header: 'ID',
        cell: ({row}) => row?.original?.id,
    },
    {
        accessorKey: 'name',
        header: 'Investment Name',
    },
    {
        accessorKey: 'interval',
        header: 'Interval',
    },
    {
        accessorKey: 'rate',
        header: 'Rate',
    },
    {
        accessorKey: 'maximum',
        header: 'Maximum ',
    },
    {
        accessorKey: 'minimum',
        header: 'Minimum ',
    },
    {
        header: 'Date Created',
        cell: ({row}) => format((row?.original?.created_at * 1000) as string, 'MMM dd, yyyy'),
    },
    {
        id: 'action',
        header: 'Delete Scheme',
        cell: ({row}) => {
            const scheme_id = row?.original?.id;
            return (
                <DialogPop
                    TriggerIcon={<Ban size={19} color="white"/>}
                    TriggerName={'Delete'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#D92D20]')}
                    DialogName={'Delete Scheme'}
                    DialogDesc={'Are you sure you want to delete this scheme ?'}
                    DialogCancelName={'Cancel'}
                    DialogActionName={ 'Delete Scheme'}
                    DialogActionCallback={async () => await common.DeleteScheme(scheme_id)}
                    SuccessMessage={'Scheme successfully deleted.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={'bg-[#D92D20]' }
                    DialogCancelClassName={'border-[#D92D20] text-[#D92D20]' }
                />
            );

        },
    },
];

