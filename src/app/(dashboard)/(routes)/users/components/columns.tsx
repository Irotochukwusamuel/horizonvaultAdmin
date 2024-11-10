'use client';
import {ColumnDef} from '@tanstack/react-table';
import {Ban, CheckCircle, ChevronRight, Edit, MinusIcon, PlusIcon, Trash2} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import {AppwriteUser, Investments, UserPayment} from '@/types/user';
import {cn, formatAmount} from '@/lib/utils';
import DialogPop from '@/components/dialog-view';
import {parseCookies} from 'nookies';
import {CommonApi} from "@/services/CommonAPI";
import {DialogInput} from "@/components/dialog-input";
import {UpdateStatus} from "@/app/(dashboard)/(routes)/investments/components/update-status";


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


const get_t_type = (type: type) => {
    switch (type) {
        case "transact_c2c":
            return "C2C-Transfer"
        case "transact_c2b":
            return "inflow"
        case "transact_b2c":
            return "outflow"
    }
}

export const PaymentDetailColumn: ColumnDef<UserPayment>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'network',
        header: 'Network',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        header: 'Transaction Type',
        cell: ({row}) => get_t_type(row.original.transaction_type),

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
        header: "Cancel",
        cell: ({row}) => {
            const transaction_id = row.original.id;
            return (
                <DialogPop
                    TriggerIcon={<Ban size={19} color="white"/>}
                    TriggerName={'Cancel'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#D92D20]')}
                    DialogName={'Cancel Transaction'}
                    DialogDesc={'Are you sure you want to cancel this transaction? You can approve the transaction later.'}
                    DialogCancelName={'Cancel'}
                    DialogActionName={'Cancel Transaction'}
                    DialogActionCallback={async () => await common.CancelTransaction(transaction_id)}
                    SuccessMessage={'Transaction successfully cancelled.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={'bg-[#D92D20]'}
                    DialogCancelClassName={'border-[#D92D20] text-[#D92D20]'}
                />
            );

        },
    },
    {
        id: 'Approve',
        header: "Approve",
        cell: ({row}) => {

            const transaction_id = row.original.id;

            return (
                <DialogPop
                    TriggerIcon={<CheckCircle size={14} color="white"/>}
                    TriggerName={'Approve'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#14912D]')}
                    DialogName={'Approve Transaction'}
                    DialogDesc={'Are you sure you want to approve this transaction? You can cancel the transaction later.'}
                    DialogCancelName={'Cancel'}
                    DialogActionName={'Approve Transaction'}
                    DialogActionCallback={async () => await common.ApproveTransaction(transaction_id)}
                    SuccessMessage={'Transaction successfully approved.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={'bg-[#14912D]'}
                    DialogCancelClassName={'border-[#14912D] text-[#14912D]'}
                />
            );

        },
    },
].filter(Boolean);

export const InvestmentDetailColumn: ColumnDef<Investments>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'investment_rate',
        header: 'Rate',
    },
    {
        accessorKey: 'deposit_type',
        header: 'Deposit Type',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        header: 'Type',
        accessorKey: 'investment_name',

    },

    {
        header: 'View',
        cell: ({row}) => {
            const row_info = row.original;
            return (
                <Link
                    href={`/investments/${row_info?.id}`}
                    className=" cursor-pointer flex items-center bg-[#2D3045] justify-center font-[12px] rounded-[4px] w-[80px] h-[28px] text-base-white">
                    View
                    <ChevronRight size={19} color="white"/>
                </Link>
            );

        },
    },

    {
        header: "Delete",
        cell: ({row}) => {
            const investment_id = row.original.id;
            return (
                <DialogPop
                    TriggerIcon={<Trash2 size={19} color="white"/>}
                    TriggerName={'Delete'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#D92D20]')}
                    DialogName={'Delete Investment'}
                    DialogDesc={'Are you sure you want to delete this Investment ?'}
                    DialogCancelName={'Delete'}
                    DialogActionName={'Delete Investment'}
                    DialogActionCallback={async () => await common.DeleteInvestment(investment_id)}
                    SuccessMessage={'Investment successfully deleted.'}
                    DialogClassName={'sm:max-w-[400px]'}
                    DialogActionClassName={'bg-[#D92D20]'}
                    DialogCancelClassName={'border-[#D92D20] text-[#D92D20]'}
                />
            );

        },
    },
    {
        id: 'Update_Status',
        header: "Update Status",
        cell: ({row}) => {

            const investmentId = row.original.id;

            return (
                <UpdateStatus
                    TriggerIcon={<Edit size={14} color="white"/>}
                    TriggerName={'Update'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[orange]')}
                    SuccessMessage={'Investment has been successfully updated!'}
                    DialogActionClassName={'bg-[#14912D]'}
                    DialogCancelClassName={'border-[#14912D] text-[#14912D]'}
                    investmentId={investmentId}
                    actionType='Debit'
                />
            );

        },
    },
].filter(Boolean);


export const WalletDetailColumn: ColumnDef<{ balance: number, wallet_id: string, wallet_name: string }>[] = [
    {
        header: 'Name',
        cell: ({row}) => <p className="font-semibold text-[15px]">{row?.original.wallet_name}</p>,
    },
    {
        accessorKey: 'wallet_id',
        header: 'Wallet Address',
    },
    {
        accessorKey: 'balance',
        header: 'Balance',
    },

    {
        id: 'Action',
        header: "Credit Account",
        cell: ({row}) => {
            const wallet = row.original.wallet_id;
            return (
                <DialogInput
                    TriggerIcon={<PlusIcon size={14} color="white"/>}
                    TriggerName={'Credit'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#14912D]')}
                    SuccessMessage={'Account has been successfully credited!'}
                    DialogActionClassName={'bg-[#14912D]'}
                    DialogCancelClassName={'border-[#14912D] text-[#14912D]'}
                    wallet_id={wallet}
                    actionType='Credit'
                />
            );

        },
    },

    {
        id: 'Action',
        header: "Debit Account",
        cell: ({row}) => {
            const wallet = row.original.wallet_id;
            return (
                <DialogInput
                    TriggerIcon={<MinusIcon size={14} color="white"/>}
                    TriggerName={'Debit'}
                    TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', '!bg-[#D92D20]')}
                    SuccessMessage={'Account has been successfully debited!'}
                    DialogActionClassName={'bg-[#14912D]'}
                    DialogCancelClassName={'border-[#14912D] text-[#14912D]'}
                    wallet_id={wallet}
                    actionType='Debit'
                />
            );

        },
    },
].filter(Boolean);