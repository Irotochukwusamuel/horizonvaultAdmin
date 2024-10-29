'use client';

import Button from '@/components/button';
import {Input} from '@/components/input';
import {forgotPassword} from '@/services/auth';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {AuthApi} from "@/services/AuthAPI";

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = new AuthApi()
    const {register, formState, handleSubmit, watch} = useForm<{
        email: string;
    }>({
        mode: 'onChange',
    });

    const onSubmit = async ({email}: { email: string }) => {
        try {
            setIsLoading(true);
            await auth.ForgotPassword(email);
            setIsLoading(false);
            toast.success('Recovery email sent successfully');
        } catch (error) {
            toast.error(error ?? 'Recovery email sent failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
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

            <Button
                variant='primary'
                type='submit'
                customWidth='full'
                disabled={!formState.isValid}
                loading={isLoading}
                className='min-h-11'
            >
                Send
            </Button>
        </form>
    );
}
