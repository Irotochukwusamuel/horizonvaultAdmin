'use client';

import * as React from 'react';

import Typography from './typography';
import clsx from 'clsx';

import tw from 'twin.macro';
import { cn } from '@/lib/utils';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  requiredLabel?: string;
  errorText?: string;
  inputStyles?: string;
  boldLabel?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      id,
      name,
      label,
      requiredLabel,
      errorText,
      disabled,
      inputStyles,
      boldLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx(className, 'flex flex-col gap-[6px]')}>
        <label htmlFor={id || name} className='flex'>
          <Typography
            variant='body-2'
            fontWeight={boldLabel ? 'bold' : 'regular'}
            className='text-gray-200'
          >
            {label || requiredLabel}
          </Typography>
          {requiredLabel ? <span className='text-error-100'>*</span> : null}
        </label>

        <div className='relative'>
          <textarea
            name={name}
            id={id}
            className={cn(
              'bg-background flex max-h-[180px] min-h-[180px] w-full resize-none rounded-md border border-gray-500 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-base-black focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              inputStyles
            )}
            ref={ref}
            {...props}
          />

          {errorText && !disabled && (
            <SubText
              variant='btn-text-small'
              className={errorText ? 'text-error-100' : 'text-gray-300'}
            >
              {errorText}
            </SubText>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

const SubText = tw(Typography)`mt-[6px] break-words`;

export { Textarea };
