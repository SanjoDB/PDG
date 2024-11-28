import React, { useState } from 'react';
import ArticleModal from './ArticleModal'; // Import the ArticleModal component
import QuestionsModal from './QuestionsModal';

interface ActivityModalProps {
  onClose: () => void;
  questions: any[];
  articles: any[];
}

const ActivityModal: React.FC<ActivityModalProps> = ({ onClose, questions }) => {
  // Estado para gestionar si los artículos fueron leídos
  const [isArticlesRead, setIsArticlesRead] = useState<boolean>(false);
  const handleArticleFinish = () => {
    setIsArticlesRead(true);
  };

  // Estado para gestionar qué elementos fueron clickeados
  const [clickedButtons, setClickedButtons] = useState({
    element1: false,
    element2: false,
    element3: false,
    element4: false,
    element5: false,
    element6: false,
  });

  // Estado para gestionar el texto del input
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensaje de error

  // Verificar si todos los botones fueron clickeados
  const allButtonsClicked = Object.values(clickedButtons).every((clicked) => clicked);

  // Función para manejar los clics en los elementos
  const handleClick = (element: string) => {
    setClickedButtons((prevState) => ({
      ...prevState,
      [element]: true,
    }));
  };

  // Función para manejar el avance
  const handleAdvance = () => {
    // Si todos los botones fueron clickeados y el texto es 'continue', avanzamos
    if (allButtonsClicked && inputText.trim().toLowerCase() === 'continue') {
      setErrorMessage(''); // Limpiar cualquier mensaje de error
      onClose(); // Cerrar el modal actual
      // Redirigir al siguiente modal (QuestionsModal)
      <QuestionsModal onClose={onClose} questions={questions} />;
    } else {
      // Si no se cumple, mostrar mensaje de error
      setErrorMessage('Por favor, escribe "continue" para avanzar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 p-4 bg-white border rounded-lg shadow-lg w-5/6 h-auto flex">
        <div className="relative w-full h-full">
          {/* Imagen de fondo y botones clickeables */}
          <div className="relative w-2/3 h-2/3 mx-auto">
            <img src="/img/clickTest.png" alt="Background" className="w-full h-full object-cover" />
            <div className="absolute" style={{ top: '90px', left: '96px' }} onClick={() => handleClick('element1')}>
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element1.png" alt="Click 1" />
              </button>
            </div>
            <div className="absolute" style={{ top: '350px', left: '400px' }} onClick={() => handleClick('element2')}>
              <button className="bg-transparent border-none cursor-pointer">
                <img src="/path/to/your/clickable-element2.png" alt="Click 2" />
              </button>
            </div>
            <div className="absolute" style={{ top: '90px', left: '750px' }} onClick={() => handleClick('element3')}>
                <button className="bg-transparent border-none cursor-pointer">
                  <img src="/path/to/your/clickable-element3.png" alt="Click 3" />
                </button>
              </div>
              <div className="absolute" style={{ top: '530px', left: '60px' }} onClick={() => handleClick('element4')}>
                <button className="bg-transparent border-none cursor-pointer">
                  <img src="/path/to/your/clickable-element4.png" alt="Click 4" />
                </button>
              </div>
              <div className="absolute" style={{ top: '550px', left: '400px' }} onClick={() => handleClick('element5')}>
                <button className="bg-transparent border-none cursor-pointer">
                  <img src="/path/to/your/clickable-element5.png" alt="Click 5" />
                </button>
              </div>
              <div className="absolute" style={{ top: '500px', left: '750px' }} onClick={() => handleClick('element6')}>
                <button className="bg-transparent border-none cursor-pointer">
                  <img src="/path/to/your/clickable-element6.png" alt="Click 6" />
                </button>
              </div>
          </div>

          {/* Modal de entrada para continuar */}
          {allButtonsClicked && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
              <div className="text-center p-4 bg-gray-100 bg-opacity-100 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Escribe 'continue' para avanzar"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mb-2 p-2 border rounded"
                  style={{ width: '400px' }}
                />
                <div className="mt-2">
                  <button
                    onClick={handleAdvance}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Avanzar
                  </button>
                </div>
                {/* Mostrar mensaje de error si no se escribió "continue" */}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;