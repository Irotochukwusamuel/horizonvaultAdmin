'use client';
import DialogPop from '@/components/dialog-view';
import React from 'react';
import { Input } from '@/components/input';
import { useForm } from 'react-hook-form';
import { Role } from '@/lib/utils';
import tw from 'twin.macro';
import { User } from '@/types/user';
import { createAdmin } from '@/services/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<Partial<User>>(
    {
      mode: 'onBlur',
      defaultValues: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: Role.ADMIN,
      },
    },
  );


  const onSubmit = async (data: Partial<User>) => {
    try {
      const res = await createAdmin(data);
      if (res?.$id) {
        toast.success('Admin added successfully');
        router.refresh();
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Failed to create admin');
    }
  };


  const CreatAdmin = () => {
    return (
      <form
        className="my-5 flex flex-col gap-[24px]"
      >
        <InputsRowContainer>
          <Input
            {...register('first_name', {
              required: 'First name is required',
            })}
            requiredLabel="First Name"
            placeholder="First Name"
            errorText={formState.errors?.first_name?.message}
          />
          <Input
            {...register('last_name', {
              required: 'Last name is required',
            })}
            requiredLabel="Last Name"
            placeholder="Last Name"
            errorText={formState.errors?.last_name?.message}
          />
        </InputsRowContainer>

        <InputsRowContainer>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            label="Email Address"
            placeholder="Email Address"
            errorText={formState.errors.email?.message}
          />
          <Input
            {...register('phone', {
              validate: (v) => {
                if (
                  v &&
                  !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
                    v,
                  )
                ) {
                  return 'Invalid phone number';
                }
                return true;
              },
            })}
            label="Phone Number"
            placeholder="Phone Number"
            errorText={formState.errors?.phone?.message}
          />

        </InputsRowContainer>

      </form>
    );
  };

  return (
    <section>
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-[30px] text-base-black font-bold">Admins</p>
        </div>

        <DialogPop
          TriggerName="Create Admin"
          TriggerClassName="bg-base-black text-[16px] text-base-white"
          DialogName="Create Admin"
          DialogDesc={CreatAdmin()}
          DialogCancelName="Cancel"
          DialogActionName="Create Admin"
          DialogActionCallback={handleSubmit(onSubmit)}
          DisableActionButton={(formState.isDirty && !formState.isValid) || formState.isSubmitting}
          DialogClassName={'sm:max-w-[500px]'}
          DialogActionClassName="bg-[#2D3045]"
          DialogCancelClassName="border-[#2D3045] text-base-black"

        />
      </header>

    </section>
  );
};

const InputsRowContainer = tw.div`grid grid-cols-2 gap-[20px]`;

export default Header;
