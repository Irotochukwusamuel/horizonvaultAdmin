'use client';
import {ColumnDef} from '@tanstack/react-table';
import {Ban, CheckCircle, ChevronRight, Trash2} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import {AppwriteUser, UserPayment} from '@/types/user';
import {format} from 'date-fns';
import {cn, formatAmount} from '@/lib/utils';
import DialogPop from '@/components/dialog-view';
import {parseCookies} from 'nookies';
import {CommonApi} from "@/services/CommonAPI";


const cookies = parseCookies(null)
const common = new CommonApi(cookies?.sessionId)
export const CustomerColumns: ColumnDef<AppwriteUser>[] = [
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        header: 'IsDisabled',
        cell: ({row}) => {
            console.log(row.original.isDeactivated)
            return row.original.isDeactivated ? 'Yes' : 'No'
        },

    },
    {
        header: 'Role',
        cell: ({row}) => row.original.is_admin ? 'Admin' : 'User',
    },

    {
        header: 'View',
        cell: ({row}) => {
            const row_info = row.original;
            return (
                <Link
                    href={`/users/${row_info?.id}`}
                    className=" cursor-pointer flex items-center bg-[#2D3045] justify-center font-[12px] rounded-[4px] w-[80px] h-[28px] text-base-white">
                    View
                    <ChevronRight size={19} color="white"/>
                </Link>
            );

        },
    },

     {
        header: "Ban/UnBan",
        cell: ({row}) => {
            const doc_email = row.original.email;
            const is_deactivated = row.original.isDeactivated;
            return (
                <DialogPop
                    TriggerIcon={!is_deactivated ? <Ban size={19} color="white"/> : <CheckCircle size={14} color="white"/>}
                    TriggerName={!is_deactivated ? 'Ban' : 'UnBan'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', !is_deactivated ? '!bg-[#D92D20]' : '!bg-[#14912D]')}
                    DialogName={!is_deactivated ? 'Disable User' : 'Enable User'}
                    DialogDesc={!is_deactivated ? 'Are you sure you want to disable this user? You can enable the user later.' : 'Are you sure you want to enable this user? You can disable the user later.'}
                    DialogCancelName={'Cancel'}
                    DialogActionName={!is_deactivated ? 'Disable User' : 'Enable User'}
                    DialogActionCallback={async () => !is_deactivated ? await common.DeactivateUser(doc_email) : await common.ActivateUser(doc_email)}
                    SuccessMessage={!is_deactivated ? 'User successfully disabled.' : 'User successfully enabled.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={!is_deactivated ? 'bg-[#D92D20]' : 'bg-[#14912D]'}
                    DialogCancelClassName={!is_deactivated ? 'border-[#D92D20] text-[#D92D20]' : 'border-[#14912D] text-[#14912D]'}
                />
            );

        },
    },
    {
        id: 'makeAdmin',
        header: "Admin",
        cell: ({row}) => {

            const doc_email = row.original.email;
            const is_admin = row.original.is_admin;
            return (
                <DialogPop
                    TriggerIcon={is_admin ? <Ban size={19} color="white"/> : <CheckCircle size={14} color="white"/>}
                    TriggerName={!is_admin ? 'Add as Admin' : 'Remove as Admin'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', is_admin ? '!bg-[#D92D20]' : '!bg-[#14912D]')}
                    DialogName={is_admin ? 'Remove as Admin' : 'Add as Admin'}
                    DialogDesc={is_admin ? 'Are you sure you want to remove  this user as admin? You can enable the user later.' : 'Are you sure you want to enable this user as admin? You can disable the user later.'}
                    DialogCancelName={'Cancel'}
                    DialogActionName={!is_admin ? 'Add As Admin' : 'Remove As Admin'}
                    DialogActionCallback={async () => is_admin ? await common.RemoveAdmin(doc_email) : await common.AddAdmin(doc_email)}
                    SuccessMessage={is_admin ? 'User successfully added as admin.' : 'User successfully removed as admin.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={is_admin ? 'bg-[#D92D20]' : 'bg-[#14912D]'}
                    DialogCancelClassName={is_admin ? 'border-[#D92D20] text-[#D92D20]' : 'border-[#14912D] text-[#14912D]'}
                />
            );

        },
    },
].filter(Boolean);


export const PaymentDetailColumn: ColumnDef<UserPayment>[] = [
    {
        id: 'Course',
        accessorKey: 'course.course_name',
        header: 'Course',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (row) =>
            formatAmount((row.getValue() as number) / 100, 'NGN', 'en-NG', true),
    },
    {
        accessorKey: '$createdAt',
        header: 'Date',
        cell: (row) => format(row.getValue() as string, 'MMM dd, yyyy'),

    },


];