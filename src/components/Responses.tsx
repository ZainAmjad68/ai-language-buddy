import React from 'react';

interface ResponseProps {
  currentState: string;
  responses: {response: string, translation: string}[];
  type: string
}

const ResponseList: React.FC<ResponseProps> = ({ currentState, responses, type }) => {
  return (
    <div className="flex flex-col space-y-4 m-4">
      {currentState === 'loading' ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-gray-500 text-center">
            {type==="response" ? (<span>THIS WILL CONTAIN SOME ALTERNATE RESPONSES TO YOUR TEXT.</span>): (<span>THESE ARE SOME FOLLOW UP QUESTIONS THAT YOU CAN ASK.</span>)}
          </h2>
        </div>
      ) : (
        <ul className="bg-gray-100 p-4 rounded-lg w-max max-w-[80%]">
          {responses.map((item, index) => (
            <div key={index}>
              <div className="font-bold">{item.response}</div>
              <div className="text-sm text-gray-500">{item.translation}</div>
            </div>
        ))}
        </ul>
      )}
    </div>
  );
};

export default ResponseList;
