import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type Variant =
  | 'header-1'
  | 'header-2'
  | 'header-3'
  | 'header-4'
  | 'header-4-sm'
  | 'header-5'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'body-4'
  | 'label-text'
  | 'btn-text'
  | 'btn-text-small';

type fontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export default function Typography({
  children,
  variant = 'body-1',
  className,
  fontWeight = 'regular',
  title,
}: {
  children: ReactNode;
  variant: Variant;
  fontWeight?: fontWeight;
  className?: string;
  key?: string | number;
  title?: string;
}) {
  return (
    <p
      className={cn(
        variantStylesMap[variant],
        fontWeightStylesMap[fontWeight],
        className
      )}
      title={title}
    >
      {children}
    </p>
  );
}

const fontWeightStylesMap: Record<fontWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const variantStylesMap: Record<Variant, string> = {
  'header-1': 'text-[48px] leading-[60px]',
  'header-2': 'text-[40px] leading-[57px]',
  'header-3': 'text-[36px] leading-[54px]',
  'header-4': 'text-[24px] leading-[27px]',
  'header-4-sm': 'text-[18px] leading-normal',
  'header-5': 'text-[30px] leading-[38px]',
  'body-1': 'text-[16px] leading-normal',
  'body-2': 'text-[15px] leading-[22.5px]',
  'body-3': 'text-[13px] leading-[19.5px]',
  'body-4': 'text-[18px] leading-[28px]',
  'label-text': 'text-[20px] leading-[30px]',
  'btn-text': 'text-[16px] leading-normal',
  'btn-text-small': 'text-[14px] leading-normal',
};
