import React, { useState } from 'react';
import ArticleModal from './ArticleModal'; // Import the ArticleModal component
import QuestionsModal from './QuestionsModal';

interface ActivityModalProps {
  onClose: () => void;
  questions: any[];
  articles: any[];
}

const ActivityModal: React.FC<ActivityModalProps> = ({ onClose, questions }) => {


  const [isArticlesRead, setIsArticlesRead] = useState<boolean>(false);

  const handleArticleFinish = () => {
    setIsArticlesRead(true);
  };

  const [clickedButtons, setClickedButtons] = useState({
    element1: false,
    element2: false,
    element3: false,
    element4: false,
    element5: false,
    element6: false,
  });

  const handleClick = (element: string) => {
    setClickedButtons(prevState => ({
      ...prevState,
      [element]: true,
    }));
  };

  const allButtonsClicked = Object.values(clickedButtons).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 p-4 bg-white border rounded-lg shadow-lg w-5/6 h-auto flex">
        <div className="relative w-full h-full">
            {!allButtonsClicked ? (
            <div className="relative w-2/3 h-2/3 mx-auto">
              <img src="/img/clickTest.png" alt="Background" className="w-full h-full object-cover" />
              <div
              className="absolute"
              style={{ top: '90px', left: '96px' }}
              onClick={() => handleClick('element1')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element1.png" alt="Click 1" />
                <span>Click 1</span>
              </button>
              </div>
              <div
              className="absolute"
              style={{ top: '350px', left: '400px' }}
              onClick={() => handleClick('element2')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element2.png" alt="Click 2" />
                <span>Click 2</span>
              </button>
              </div>
              <div
              className="absolute"
              style={{ top: '90px', left: '750px' }}
              onClick={() => handleClick('element3')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element3.png" alt="Click 3" />
                <span>Click 3</span>
              </button>
              </div>
              <div
              className="absolute"
              style={{ top: '530px', left: '60px' }}
              onClick={() => handleClick('element4')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element4.png" alt="Click 4" />
                <span>Click 4</span>
              </button>
              </div>
              <div
              className="absolute"
              style={{ top: '550px', left: '400px' }}
              onClick={() => handleClick('element5')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element5.png" alt="Click 5" />
                <span>Click 5</span>
              </button>
              </div>
              <div
              className="absolute"
              style={{ top: '500px', left: '750px' }} 
              onClick={() => handleClick('element6')}
              >
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element6.png" alt="click 6" />
                <span>Click 6</span>
              </button>
              </div>
            </div>
            ) : (
              <QuestionsModal onClose={onClose} questions={questions} />
            )}
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;