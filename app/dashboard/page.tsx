'use client';

import MapLevel from '@/components/mapLevel';
import { title } from '@/components/primitives';
import { useSession } from 'next-auth/react';
import YoutubeButton from '@/components/YoutubeButton';

export default function AboutPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col h-screen min-h-0 items-center mt-3">
      <h1 className={title()}>Bienvenido {session?.user?.name} !</h1>
      <YoutubeButton />
      <MapLevel />
    </div>
  );
}
