'use client';

import { title } from '@/components/primitives';
import RankedTable from '@/components/rankedTable';
import { useSession } from 'next-auth/react';

export default function AboutPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className={`${title()} mt-3`}>Tabla de clasificación</h1>
      <div className="flex w-5/6 mt-5 h-full">
        <RankedTable />
      </div>
    </div>
  );
}
