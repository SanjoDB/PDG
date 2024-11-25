import { User } from '@/interfaces/User';
import { Card, CardBody, CardHeader, Button, Avatar } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

export function UserCard() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Card className="w-full max-w-md h-full p-10 mt-10">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <Avatar showFallback src="https://images.unsplash.com/broken" />
          </Avatar>
          <div className="grid gap-1">
            <div className="font-medium">{session?.user?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="grid gap-6">
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="text-sm font-medium">Level</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="font-medium">1</div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="text-sm font-medium">Points</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="font-medium">12,500</div>
            <span className="text-gray-500 dark:text-gray-400">/ 15,000</span>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="text-sm font-medium">Organization</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="font-medium">
              {(session?.user as User)?.organization?.name}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
