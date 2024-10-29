'use client';

import { account } from '@/appwrite';
import Button from '@/components/button';
import { Input } from '@/components/input';
import Typography from '@/components/typography';
import { useUserStore } from '@/lib/store';
import { LoginForm as TLoginForm } from '@/types/user';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {AuthApi} from "@/services/AuthAPI";

export default function LoginForm({}) {
  const [isLoading, setIsLoading] = useState(false);
  const auth = new AuthApi()
  const { register, formState, handleSubmit } = useForm<TLoginForm>({
    mode: 'onChange',
  });
  const { setUser } = useUserStore();
  const { push } = useRouter();

  const onSubmit = async (data: TLoginForm) => {
    setIsLoading(true);
    try {
      const user = await auth.SignIn(data.password, data.email)
      if (!user) {
        setIsLoading(false);
        return;
      }
      console.log(user);
      // Get db user
      if (user?.is_admin) {
        setUser(user!);
        setCookie(null, 'sessionId', user.access_token);
        setIsLoading(false);
        push('/users', undefined, { showProgressBar: true });
      } else {
        setIsLoading(false);
        toast.error('Not authorized. Please contact your administrator.');
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error)
      toast.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-[20px]'
    >
      <Input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        })}
        label='Email'
        placeholder='Email Address'
        errorText={formState.errors.email?.message}
      />
      <div className='flex flex-col'>
        <Input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          label='Password'
          placeholder='Password'
          hideable
          errorText={formState.errors?.password?.message}
          className='mb-1'
        />

        <Link href='/forgot-password' className='mb-1 self-end'>
          <Typography
            variant='body-2'
            fontWeight='semibold'
            className='text-base-black'
          >
            Forgot Password?
          </Typography>
        </Link>
      </div>

      <Button
        variant='primary'
        type='submit'
        customWidth='full'
        disabled={!formState.isValid}
        loading={isLoading}
        className='min-h-11'
      >
        Log In
      </Button>
    </form>
  );
}
