import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'px-[20px] py-[12px] bg-secondary-main text-base leading-[24.34px] text-base-white font-normal hover:bg-secondary-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border p-[12px] w-[40px] h-[40px]',
        view: 'text-xs leading-[18px] bg-secondary-main px-[8px] py-[4px] text-base-white font-normal w-[57px] h-[26px] hover:bg-secondary-hover',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        small:
          'flex items-center gap-x-1 px-[8px] py-[4px] text-[12px] leading-[18px] font-normal text-base-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: { icon: React.ReactNode; position?: 'left' | 'right' };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          'flex items-center gap-[4px]': icon,
          'flex-row-reverse': icon?.position === 'right',
        })}
        ref={ref}
        {...props}
      >
        <div className='flex items-center gap-[4px]'>
          {icon?.position !== 'right' && icon?.icon}
          {props.children}
          {icon?.position === 'right' && icon?.icon}
        </div>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
