import React from 'react';

interface WordByWordProps {
  currentState: string;
  worByWordTranslation: object;
}

const WordByWord: React.FC<WordByWordProps> = ({ currentState, worByWordTranslation }) => {
  return (
    <div className="flex flex-col space-y-4 m-4">
      {currentState === 'loading' ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-gray-500 text-center">
            WE WILL DISPLAY A WORD TO WORD TRANSLATION OF THE CONVERSATION HERE.
          </h2>
        </div>
      ) :         <ul className="bg-gray-100 p-4 rounded-lg w-max">
      {Object.entries(worByWordTranslation).map(([key, translation], i) => (
        <li key={i} className="flex items-center space-x-2">
          <span className="font-bold">{key}</span>
          <span className="text-gray-500">=</span>
          <span>{translation}</span>
        </li>
      ))}
    </ul>
}
    </div>
  );
};

export default WordByWord;
