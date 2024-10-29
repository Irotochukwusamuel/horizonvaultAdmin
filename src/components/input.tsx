'use client';
import * as React from 'react';

import Typography from './typography';
import { useState } from 'react';

import EyeOpenIcon from '@/assets/icons/eye.svg';
import EyeCloseIcon from '@/assets/icons/eye-closed.svg';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  requiredLabel?: string;
  hideable?: boolean;
  errorText?: string;
  inputClassName? : string
  childbutton? : React.ReactNode
  WrappperClass? : string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      id,
      name,
      label,
      requiredLabel,
      type,
      errorText,
      disabled,
      hideable,

      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn('flex flex-col gap-[6px]', className)}>
        <label htmlFor={id || name} className='flex'>
          <Typography variant='body-2' className='text-gray-200'>
            {label || requiredLabel}
          </Typography>
          {requiredLabel ? <span className='text-warning'>*</span> : null}
        </label>

        <div className='relative'>
          <div className={props.WrappperClass}>
            <input
              name={name}
              id={id}
              className={cn(
                'bg-background flex h-[44px] w-full rounded-md border border-gray-500 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-base-black focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                errorText && 'border-error-100 focus:border-error-100', inputClassName,
              )}
              ref={ref}
              type={!showPassword && hideable ? 'password' : type}
              {...props}
            />
            {props.childbutton}
          </div>

          {errorText && !disabled && (
            <Typography
              variant="btn-text-small"
              className={cn(
                errorText
                  ? 'text-error-100'
                  : 'text-gray-300,mt-[6px] break-words',
              )}
            >
              {errorText}
            </Typography>
          )}

          {hideable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowPassword((prevShow) => !prevShow);
              }}
              className={cn(
                'absolute right-[18px] top-[50%] z-50 -translate-y-[50%] cursor-pointer',
                errorText && 'top-[33%]'
              )}
            >
              {showPassword ? (
                <EyeOpenIcon className='h-[16px] w-[16px] stroke-base-black stroke-[1.44px]' />
              ) : (
                <EyeCloseIcon className='h-[16px] w-[16px] stroke-base-black stroke-[1.44px]' />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
