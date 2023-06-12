import React from 'react';

interface ConversationProps {
  currentState: string;
  conversationData: { role: string; content: string }[];
}

const Conversation: React.FC<ConversationProps> = ({ currentState, conversationData }) => {
  if (currentState === 'loading' && conversationData.length === 0) {
    return <div>Please type something to start the conversation!</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {conversationData.map((message, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 ${
            message.role === 'user' ? 'bg-blue-200 self-end' : 'bg-green-200 self-start'
          }`}
        >
          {message.content}
        </div>
      ))}
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
