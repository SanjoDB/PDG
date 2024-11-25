'use client';

import { title } from '@/components/primitives';
import { UserCard } from '@/components/UserCard';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className={`${title()} mt-3`}>Perfil</h1>
      <UserCard />
      <div className="flex w-5/6 mt-5 h-full"></div>
    </div>
  );
}
