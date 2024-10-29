import React, { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className='flex h-full flex-col'>{children}</div>;
}
