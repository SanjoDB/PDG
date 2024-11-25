'use client';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';
import { Select, SelectItem } from '@nextui-org/react';
import { Organization } from '@/interfaces/Organization';
import { useState } from 'react';

interface SignUpProps {
  handleSuccess: () => void;
}

// @ts-ignore
export default function SignUp({ handleSuccess }: SignUpProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const { data, createOrganization } = useOrganization();
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };
    setPasswordCriteria(criteria);
    return Object.values(criteria).every(Boolean);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.loading('Cargando...');
    let organization: Organization;
    if (data.newOrganization) {
      organization = await createOrganization(data.newOrganization);
    } else {
      const [id, name] = data.organization.split('-');
      organization = {
        id: id,
        name: name,
      };
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        organization: organization,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      toast.success('Registered successfully');
      handleSuccess();
    } else if (res.status === 400) {
      const error = await res.json();
      toast.error(error.message);
    }
  });

  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={onSubmit} className="flex flex-col w-3/4 gap-5">
        <h1 className="font-bold text-4xl mb-4">Registrese</h1>

        <Input
          label="Nombre"
          // @ts-ignore
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          {...register('name', {
            required: {
              value: true,
              message: 'El nombre es requerido',
            },
          })}
          placeholder="Ingrese su nombre"
        />

        <Input
          label="Correo"
          // @ts-ignore
          errorMessage={errors.email?.message}
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

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'La contraseña es requerida',
            validate: validatePassword,
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Contraseña"
              // @ts-ignore
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              placeholder="********"
              onChange={(e) => {
                field.onChange(e);
                validatePassword(e.target.value);
              }}
            />
          )}
        />

        <Input
          type="password"
          label="Confirmar Contraseña"
          // @ts-ignore
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'La contraseña es requerida',
            },
          })}
          placeholder="********"
        />

        <div className="password-criteria">
          <p
            className={
              passwordCriteria.length ? 'text-green-500' : 'text-red-500'
            }
          >
            Al menos 8 caracteres
          </p>
          <p
            className={
              passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'
            }
          >
            Al menos una letra mayúscula
          </p>
          <p
            className={
              passwordCriteria.number ? 'text-green-500' : 'text-red-500'
            }
          >
            Al menos un número
          </p>
          <p
            className={
              passwordCriteria.symbol ? 'text-green-500' : 'text-red-500'
            }
          >
            Al menos un símbolo
          </p>
        </div>

        <h3 className="font-bold text-lg my-2">Organización (Opcional)</h3>
        <div className="flex flex-row gap-5">
          <Select
            label="Organización"
            // @ts-ignore
            errorMessage={errors.organization?.message}
            isInvalid={!!errors.organization}
            {...register('organization')}
            placeholder="Seleccione una organización"
            isDisabled={
              watch('newOrganization') !== '' && watch('organization') === ''
            }
          >
            {data?.map((organization) => (
              <SelectItem key={`${organization.id}-${organization.name}`}>
                {organization.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Crear nueva organización"
            placeholder="Ingrese el nombre de la organización"
            {...register('newOrganization')}
            isDisabled={
              watch('organization') !== '' && watch('newOrganization') === ''
            }
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
