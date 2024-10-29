'use client';
import { RefreshCwIcon } from 'lucide-react';

export default function Loader() {
  return (
    <div className='flex h-full w-full flex-1 items-center justify-center'>
      <RefreshCwIcon className='h-[72px] w-[72px] animate-spin text-purple-100' />
    </div>
  );
}
