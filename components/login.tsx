'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { ResetPassword } from '@/components/ResetPassword';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    toast.info('Iniciando sesion...', { duration: 1000 });
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Sesion iniciada', { duration: 1000 });
      router.push('/dashboard');
    }
  });

  const handleDialogClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={onSubmit} className="flex flex-col  w-3/4 gap-5 ">
        <h1 className="font-bold text-4xl mb-4">Iniciar sesion</h1>

        <Input
          label="Correo"
          errorMessage={errors.email?.message?.toString()}
          isInvalid={!!errors.email}
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'El correo es requerido',
            },
          })}
          placeholder="Ingrese su correo"
        />
        <div>
          <Input
            type="password"
            label="Contraseña"
            errorMessage={errors.password?.message?.toString()}
            isInvalid={!!errors.password}
            {...register('password', {
              required: {
                value: true,
                message: 'La contraseña es requerida',
              },
            })}
            placeholder="********"
          />

          <div>
            <a
              className="text-sm mt-2 block hover:underline cursor-pointer"
              onClick={() => dialogRef.current?.showModal()}
            >
              Olvidé mi contraseña
            </a>

            <dialog
              ref={dialogRef}
              className="w-1/4 h-1/4 p-2 rounded-lg shadow-md z-50"
            >
              <ResetPassword onClose={handleDialogClick} />
            </dialog>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
