'use client';

import Typography from '@/components/typography';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';

import DashboardIcon from '@/assets/icons/dashboard.svg';
import CourseIcon from '@/assets/icons/courses.svg';
import UsersIcon from '@/assets/icons/users.svg';
import PaymentIcon from '@/assets/icons/payment.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import CogIcon from '@/assets/icons/cog.svg';
import AdminIcon from '@/assets/icons/admin.svg';

import { logout } from '@/services/auth';

export default function Sidebar() {
  const pathName = usePathname();

  const SidebarItem = ({
    icon,
    title,
    route,
    onClick,
    variant,
  }: {
    icon: ReactNode;
    title: string;
    route: string;
    onClick?: VoidFunction;
    variant?: 'default' | 'logout';
  }) => (
    <Link
      href={route}
      onClick={onClick}
      className={clsx(
        'flex items-center gap-[12px] rounded-[6px] px-[12px] py-[8px] hover:bg-gray-600',
        variant === 'logout' ? 'stroke-error-100' : 'stroke-base-black',
        pathName === `${route}` ? 'bg-gray-600' : ''
      )}
    >
      {icon}
      <Typography
        variant='body-1'
        fontWeight='semibold'
        className={variant === 'logout' ? 'text-error-100' : 'text-base-black'}
      >
        {title}
      </Typography>
    </Link>
  );

  function sidebarItems() {
    const items = [

      {
        icon: <UsersIcon className={iconClassName} />,
        title: 'Customers',
        route: '/users',
      },
      {
        icon: <AdminIcon className={iconClassName} />,
        title: 'Admin Wallets',
        route: '/admins',
      },
      {
        icon: <PaymentIcon className={iconClassName} />,
        title: 'Transactions',
        route: '/transactions',
      },
      {
        icon: <DashboardIcon className={iconClassName} />,
        title: 'Investments',
        route: '/investments',
      },
      {
        icon: <CourseIcon className={iconClassName} />,
        title: 'Schemes',
        route: '/schemes',
      },
      {
        icon: <CogIcon className={iconClassName} />,
        title: 'Coins',
        route: '/coins',
      },
      {
        icon: <LogoutIcon className={iconClassName} />,
        title: 'Logout',
        route: '/',
        variant: 'logout',
        onClick: () => logout(),
      },
    ];

    return items as ComponentProps<typeof SidebarItem>[];
  }

  const iconClassName = 'w-[24px] h-[24px] stroke-inherit';

  return (
    <div className='flex h-full w-full flex-col gap-[24px] px-[20px] py-10'>
      {sidebarItems().map((item) => (
        <SidebarItem key={item.route} {...item} />
      ))}
    </div>
  );
}
