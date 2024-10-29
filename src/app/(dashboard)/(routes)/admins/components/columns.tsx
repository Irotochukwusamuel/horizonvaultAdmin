'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Ban, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { AppwriteUser } from '@/types/user';
import { format } from 'date-fns';
import DialogPop from '@/components/dialog-view';
import { disableUser, enableUser } from '@/services/user';


export const AdminColumns: ColumnDef<AppwriteUser>[] = [
  {
    id: 'fullName',
    accessorFn: (row) => `${row?.first_name} ${row?.last_name}`,
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone No',
  },
  {
    accessorKey: '$createdAt',
    header: 'Date Joined',
    cell: (row) => format(row.getValue() as string, 'MMM dd, yyyy'),
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const doc_id = row.original.$id;
      const is_active = row.original.is_deleted;
      return (
        <DialogPop
          TriggerIcon={!is_active ? <Ban size={19} color="white" /> : <CheckCircle size={14} color="white" />}
          TriggerName={!is_active ? 'Disable' : 'Enable'}
          TriggerClassName={cn('!bg-transparent cursor-pointer flex items-center  justify-center font-[12px] rounded-[4px] text-base-white', !is_active ? '!bg-[#D92D20]' : '!bg-[#14912D]')}
          DialogName={!is_active ? 'Disable Admin' : 'Enable Admin'}
          DialogDesc={!is_active ? 'Are you sure you want to disable this admin? You can enable the user later.' : 'Are you sure you want to enable this admin? You can disable the user later.'}
          DialogCancelName={'Cancel'}
          DialogActionName={!is_active ? 'Disable Admin' : 'Enable Admin'}
          DialogActionCallback={() => !is_active ? disableUser(doc_id) : enableUser(doc_id)}
          SuccessMessage={!is_active ? 'Admin successfully disabled.' : 'Admin successfully enabled.'}
          DialogClassName={'sm:max-w-[400px]'}
          DialogActionClassName={!is_active ? 'bg-[#D92D20]' : 'bg-[#14912D]'}
          DialogCancelClassName={!is_active ? 'border-[#D92D20] text-[#D92D20]' : 'border-[#14912D] text-[#14912D]'}
        />
      );

    },
  },
];

