import React, { useState } from 'react';
import LevelCard from './levelCard';
import { ScrollShadow } from '@nextui-org/react';
import { useLevel } from '@/hooks/useLevel';
import Level from '@/interfaces/Level';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/useUser';
import Loader from '@/components/loader';
import Question from '@/interfaces/Question';
import ActivityModal from '@/components/ActivityModal';
import { toast } from 'sonner';

export default function MapLevel() {
  const acceptanceRate = process.env.ACCEPTANCE_RATE || '0.8';
  const { useUserByEmail, updateLevelStatusByEmail } = useUser();
  const { data: session } = useSession();
  const { user, loading: userLoading } = useUserByEmail(session?.user?.email!);
  const {
    data,
    error,
    loading: levelLoading,
    refresh: refreshLevels,
  } = useLevel();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<Level | null>(null);
  const handleLevelClick = (level: Level) => {
    if (level) {
      setCurrentNode(level);
      setModalOpen(true);
    }
  };

  const handleCloseModal = (score: number, isCompleted: boolean) => {
    if (!currentNode) return;
    if (isCompleted) {
      const email = session?.user?.email;
      updateLevelStatusByEmail(email!, score, currentNode.id)
        .then((_: any) => {
          toast.success('Nivel completado');
          refreshLevels().then((_) => console.log('Levels refreshed'));
        })
        .catch((e: any) => console.error(e));
    } else {
      toast.error('No has completado el nivel');
    }
    setModalOpen(false);
    setCurrentNode(null);
  };

  const renderModal = () => {
    if (!currentNode) return null;
    return (
      <ActivityModal
        onClose={handleCloseModal}
        questions={currentNode.questions}
        articles={currentNode.articles}
      />
    );
  };

  const dependsOn = (level: Level): boolean => {
    if (level.dependsOn.length === 0) return false;
    const userStatusMap = new Map(Object.entries(user.levelStatus));
    return level.dependsOn.every((id) => {
      if (userStatusMap.has(id.toString())) {
        const levelStatus = userStatusMap.get(id.toString());
        const maxLevelPoints = data
          .find((l) => l.id === id)
          // @ts-ignore
          ?.questions.reduce(
            (acc: number, question: Question) => acc + question.points,
            0,
          );
        const points = levelStatus?.points || 0;
        const progressPercentage = points / maxLevelPoints;
        return !(progressPercentage >= parseFloat(acceptanceRate));
      }
      return true;
    });
  };

  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className="w-full flex-grow items-center"
    >
      <div className="relative flex flex-col items-center justify-center space-y-8 py-10">
        {levelLoading || userLoading ? (
          <Loader />
        ) : (
          data.map((level) => (
            <LevelCard
              key={level.id}
              onClick={() => handleLevelClick(level)}
              level={level}
              userStatus={user.levelStatus[level.id] || { points: 0 }}
              dependsOn={dependsOn}
            />
          ))
        )}
      </div>
      {modalOpen && renderModal()}
    </ScrollShadow>
  );
}
