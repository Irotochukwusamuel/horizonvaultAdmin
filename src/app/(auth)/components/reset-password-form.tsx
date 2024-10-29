'use client';

import Button from '@/components/button';
import { Input } from '@/components/input';
import { resetPassword } from '@/services/auth';
import { ResetPasswordForm as TResetPasswordForm } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {AuthApi} from "@/services/AuthAPI";

export default function ResetPasswordForm() {
  const { get } = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const auth = new AuthApi()
  const userId = get('userId') || '';
  const secret = get('secret') || '';

  const { push } = useRouter();

  const { register, formState, handleSubmit, watch } =
    useForm<TResetPasswordForm>({
      mode: 'onChange',
    });

  const onSubmit = async (data: TResetPasswordForm) => {
    setIsLoading(true);
    const res = await resetPassword({ ...data, userId, secret });
    setIsLoading(false);
    if (res?.$id) {
      toast.success('Password reset successfully');
      push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          validate: {
            hasNumber: (value) =>
              /\d/.test(value) || 'Password must include at least one number',
            hasLowercase: (value) =>
              /[a-z]/.test(value) ||
              'Password must include at least one lowercase letter',
            hasUppercase: (value) =>
              /[A-Z]/.test(value) ||
              'Password must include at least one uppercase letter',
          },
        })}
        label='New Password'
        placeholder='New Password'
        errorText={formState.errors?.password?.message}
        hideable
      />
      <Input
        {...register('passwordConfirm', {
          validate: (value) => {
            if (watch('password') != value) {
              return 'Your passwords do not match';
            }
          },
          required: 'Confirm Password is required',
        })}
        label='Confirm Password'
        placeholder='Confirm Password'
        errorText={formState.errors?.passwordConfirm?.message}
        hideable
      />

      <Button
        variant='primary'
        type='submit'
        customWidth='full'
        disabled={!formState.isValid}
        loading={isLoading}
        className='min-h-11'
      >
        Reset Password
      </Button>
    </form>
  );
}
