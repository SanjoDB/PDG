import { CardHeader, CardFooter, Card, CardBody } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
// @ts-ignore
import Level from '@/interfaces/level';
import { useEffect, useState } from 'react';
// @ts-ignore
import Question from '@/interfaces/Question';

interface LevelCardProps {
  level: Level;
  onClick: () => void;
  userStatus: { points: number };
  dependsOn: (level: Level) => boolean;
}

function LevelCard({ level, userStatus, onClick, dependsOn }: LevelCardProps) {
  const acceptanceRate = process.env.ACCEPTANCE_RATE || '0.8';
  const [completionStatus, setCompletionStatus] = useState<string>('');
  const [isDependent, setIsDependent] = useState<boolean>(false);
  // @ts-ignore
  const maxLevelPoints = level.questions.reduce(
    (acc: number, question: Question) => acc + question.points,
    0,
  );

  useEffect(() => {
    setIsDependent(dependsOn(level));
  }, [dependsOn, level, userStatus]);

  useEffect(() => {
    const progressPercentage = userStatus.points / maxLevelPoints;

    if (progressPercentage >= parseFloat(acceptanceRate)) {
      setCompletionStatus('complete');
    } else {
      setCompletionStatus('incomplete');
    }
  }, [userStatus.points, maxLevelPoints, acceptanceRate]);

  return (
    <Card
      className={`flex flex-col w-4/5 p-3 h-[350px] ${
        isDependent
          ? 'border-2 border-violet-500/50 shadow-lg shadow-violet-300/50'
          : completionStatus === 'complete'
            ? 'border-2 border-green-500/50 shadow-lg shadow-green-300/50'
            : 'border-2 border-rose-500/50 shadow-lg shadow-rose-300/50'
      }`}
    >
      <CardHeader className="flex flex-col items-start flex-none h-[100px]">
        <h1 className="font-bold text-4xl">Nivel {level.id}</h1>
        <h2 className="text-gray-600">{level.name}</h2>
        <p className="text-sm text-right">
          Puntos: {userStatus.points} / {maxLevelPoints}
        </p>
      </CardHeader>
      <CardBody className="flex-grow items-start gap-10 p-6 flex flex-row overflow-y-auto min-h-[120px]">
        <Image
          alt="Nivel 1"
          src={level.image}
          className="overflow-hidden rounded-lg"
          height="54"
          width="96"
        />
        <div className="grid gap-2">
          <p className="text-lg font-medium">Descripción</p>
          <p className="text-md font-sans">{level.description}</p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-none p-2 justify-end gap-2 h-[60px]">
        <Button
          variant="bordered"
          onClick={onClick}
          disabled={isDependent}
          title={
            isDependent
              ? `Depende del nivel: ${level.dependsOn.toString()}`
              : 'Haz clic para comenzar'
          }
        >
          Comenzar
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LevelCard;
