'use client';
import { ToastContainer, TypeOptions, IconProps } from 'react-toastify';

import CloseIcon from '@/assets/icons/close.svg';
import InfoIcon from '@/assets/icons/info-circle.svg';
import CheckIcon from '@/assets/icons/check-circle.svg';
import clsx from 'clsx';

const clsName = (type: TypeOptions | undefined) =>
  type === 'error'
    ? 'bg-[#F3B8B3] border border-error-100'
    : type === 'info'
    ? 'bg-[#C87DEE]'
    : 'bg-success-10 border border-success-100';

const Icon = (props: IconProps) =>
  props?.type === 'error' ? (
    <InfoIcon className='h-[22px] w-[22px] stroke-error-100' />
  ) : props?.type === 'info' ? (
    <InfoIcon className='h-[22px] w-[22px] stroke-purple-100' />
  ) : (
    <CheckIcon className='h-[22px] w-[22px] stroke-success-100' />
  );

export function Toaster() {
  return (
    <ToastContainer
      icon={(props) => Icon(props)}
      toastClassName={(props) =>
        `flex rounded-lg items-center overflow-hidden cursor-pointer max-w-[calc(100%_-_24px)] w-fit mx-auto top-2 ${clsName(
          props?.type
        )}`
      }
      bodyClassName={(props) =>
        clsx(
          'flex items-center px-[12px] py-[8px] w-full text-[16px] font-normal leading-[24px] whitespace-nowrap overflow-x-hidden text-ellipsis',
          props?.type === 'error' ? 'text-error-100' : 'text-success-100'
        )
      }
      className='bottom-[-8px] h-[48px] max-w-full lg:max-w-[800px]'
      position='top-center'
      closeButton={(props) => (
        <button className='mr-[12px]'>
          <CloseIcon
            className={clsx(
              'h-[20px] w-[20px]',
              props.type === 'success'
                ? 'stroke-success-100'
                : 'stroke-error-100'
            )}
          />
        </button>
      )}
      hideProgressBar
      autoClose={5000}
      limit={1}
      // pauseOnHover
    />
  );
}
