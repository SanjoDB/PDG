'use client';

import Login from '@/components/login';
import SignUp from '@/components/signup';
import { title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import { useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <section className="flex flex-row h-full">
      <div className="w-1/2 h-full bg-gray-100">
        <div className="flex flex-col justify-center items-center h-full p-10">
          <h1 className={title()}>
            Desarrollo de un juego serio para mejorar la ciberseguridad
            empresarial mediante la promoción de prácticas seguras de gestión de
            contraseñas
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full ">
        <div className="flex flex-row justify-end p-5 gap-5 mb-28">
          <Button
            color="primary"
            variant={isLogin ? 'solid' : 'bordered'}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesion
          </Button>
          <Button
            color="primary"
            variant={isLogin ? 'bordered' : 'solid'}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </Button>
        </div>
        {isLogin ? (
          <Login />
        ) : (
          <SignUp handleSuccess={() => setIsLogin(true)} />
        )}
      </div>
    </section>
  );
}
