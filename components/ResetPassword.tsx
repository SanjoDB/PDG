import { toast } from 'sonner';
import { auth } from '@/config/firebase';
import { sendPasswordResetEmail } from '@firebase/auth';
import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

interface ResetPasswordProps {
  onClose: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Correo enviado');
        onClose();
      })
      .catch(() => {
        toast.error('Correo no enviado');
      });
  };

  return (
    <div className="h-full w-full p-4 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Restablecer contraseña</h1>
      <Input
        label="Correo"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4"
      >
        Restablecer contraseña
      </Button>
      <Button
        onClick={onClose}
        color="primary"
        className="w-full p-3 rounded-lg mt-2"
        variant="bordered"
      >
        Cancelar
      </Button>
    </div>
  );
};
