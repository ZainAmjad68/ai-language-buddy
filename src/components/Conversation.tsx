import React, {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGrammarTips } from '../api/openai';
interface ConversationProps {
  currentState: string;
  conversationData: { role: string; content: string }[];
}

const Conversation: React.FC<ConversationProps> = ({ currentState, conversationData }) => {
  const [input, setInput] = useState("");

  const tipsQuery = useQuery(
    ["grammar", input], 
    () => fetchGrammarTips(input),
    {refetchOnWindowFocus: false, enabled: input != ""}
  );

  useEffect(() => {
    const elements = document.getElementsByTagName('div');
    let desiredElement = null;
    for (let i = 0; i < elements.length; i++) {
      desiredElement = elements[i];
      if (desiredElement.textContent != "" && desiredElement.textContent === input && tipsQuery.data?.choices[0].message.content) {
        const computedStyles = window.getComputedStyle(desiredElement);
        const details = document.createElement('details');
        details.style.alignSelf = computedStyles.alignSelf;
        const summary = document.createElement('summary');
        summary.textContent = 'Grammar Tips';
        const para = document.createElement('p');
        para.textContent = tipsQuery.data?.choices[0].message.content;
        details.appendChild(summary);
        details.appendChild(para);
        desiredElement.insertAdjacentElement('afterend', details);
        break;
      }
    }
  }, [input, tipsQuery.data]);

  const handleOnClick = (message: string) => {
    setInput(message);
  };

  if (currentState === 'loading' && conversationData.length === 0) {
    return (
      <div className="flex items-end justify-center h-full">
        <div className="text-center text-2xl font-bold my-3">Please type something to start the conversation!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-3">
      <h2 className="text-2xl font-bold mb-4">Conversation</h2>
      {conversationData.map((message, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 cursor-pointer ${
            message.role === 'user' ? 'bg-blue-200 self-end' : 'bg-green-200 self-start'
          }`}
          onClick={() => handleOnClick(message.content)}
        >
          {message.content}
        </div>
      ))}
      {(tipsQuery.status === 'loading' && input !== "") && <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>}
      {currentState === 'loading' && <div className="self-start">
        <span className="jumping-dots">
          <span className="dot-1"></span>
          <span className="dot-2"></span>
          <span className="dot-3"></span>
        </span>
      </div>}
    </div>
  );
};

export default Conversation;
