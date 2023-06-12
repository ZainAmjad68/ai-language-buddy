import React, {useState, useEffect} from 'react';
import TextInput from '../components/TextInput';
import Conversation from '../components/Conversation';
import { useQuery } from "@tanstack/react-query"
import { askGPT } from "../api/openai";
import { IChatContent } from '../types/IOpenAI';


function extractRelevantInfo(componentType: string, conversation: {role: string, content: string}[]) {
  if (componentType === "chat") {
    return conversation.map(value => {
      try {
        const promptResponse: IChatContent = JSON.parse(value.content);
        return { role: value.role, content: promptResponse.possible_response };
      } catch (error) {
        return value;
      }
    })
  }
}

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<{role: string, content: string}[]>([]);

  // refetch whenever inputData changes, however don't fetch on first render
  // i.e.; only enable when input changes from initial state ("")
  const postQuery = useQuery(
      ["chat", input], 
      () => askGPT(input),
      {refetchOnWindowFocus: false, enabled: input != ""}
    );

  useEffect(() => {
    setConversation((previousConvo) => {
      const newReply = postQuery.data?.choices.slice(-1)[0]?.message;
      if (newReply) {
        return [...previousConvo, newReply];
      }
      return previousConvo;
    });
  }, [postQuery.data]);

    const handleFormSubmit = (value: string) => {
      setInput(value);
      setConversation((previousConvo) => {
        if (value) {
          return [...previousConvo, {role: "user", content: value}];
        }
        return previousConvo;
      });
    };

    if (postQuery.isError) {
      return (
        <div>
          <div>
            <h1>{JSON.stringify(postQuery.error)}</h1>
          </div>
          <div className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-2">
              <TextInput placeholder="Say Something in German..." onSubmit={handleFormSubmit} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <Conversation currentState={postQuery.status} conversationData={extractRelevantInfo("chat", conversation) as { role: string; content: string; }[]} />
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-2">
            <TextInput placeholder="Say Something in German..." onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  };
  
export default Chat;