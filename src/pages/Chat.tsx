import React, {useState, useEffect} from 'react';
import TextInput from '../components/TextInput';
import Conversation from '../components/Conversation';
import WordByWord from '../components/WordByWord';
import Responses from '../components/Responses';
import { useQuery } from "@tanstack/react-query"
import { askGPT } from "../api/openai";
import { IChatContent } from '../types/IOpenAI';


function extractRelevantInfo(componentType: string, conversation: {role: string, content: string}[]) {
  console.log('conversation', conversation);
  if (componentType === "chat") {
    return conversation.map(value => {
      try {
        const promptResponse: IChatContent = JSON.parse(value.content);
        return { role: value.role, content: promptResponse.possible_responses[0].response };
      } catch (error) {
        return value;
      }
    })
  }
  if (componentType === "word-by-word-input") {
    try {
        const lastReply: IChatContent = JSON.parse(conversation.slice(-1)[0]?.content);
        return lastReply.input_word_to_word;
      } catch (error) {
        return [];
      }
    }
    if (componentType === "word-by-word-response") {
      try {
          const lastReply: IChatContent = JSON.parse(conversation.slice(-1)[0]?.content);
          return lastReply.response_word_to_word;
        } catch (error) {
          return [];
        }
    }
    if (componentType === "responses") {
      try {
          const lastReply: IChatContent = JSON.parse(conversation.slice(-1)[0]?.content);
          return lastReply.possible_responses.slice(1);
        } catch (error) {
          return [];
        }
      }
    if (componentType === "follow-up") {
      try {
          const lastReply: IChatContent = JSON.parse(conversation.slice(-1)[0]?.content);
          return lastReply.follow_up;
        } catch (error) {
          return [];
        }
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
      <div className='flex flex-row flex-wrap content-center'>
        <div className='flex flex-1 flex-col flex-wrap content-center justify-between'>
          <div>
            <h2 className='text-center text-xl font-bold mb-4'>Response Translation:</h2>
            <WordByWord currentState={postQuery.status} worByWordTranslation={extractRelevantInfo("word-by-word-response", conversation) as object}  />
          </div>
          <div>
            <h2 className='text-center text-xl font-bold mb-4'>Alternate Responses:</h2>
            <Responses type="response" currentState={postQuery.status} responses={extractRelevantInfo("responses", conversation) as { response: string; translation: string; }[]}  />
          </div>
        </div>

        <div className="flex flex-2-1 flex-col flex-wrap">
          <div>
            <Conversation currentState={postQuery.status} conversationData={extractRelevantInfo("chat", conversation) as { role: string; content: string; }[]} />
          </div>
          <div className="fixed bottom-0 flex-1 w-2/4 bg-white p-2">
              <TextInput placeholder="Say Something in German..." onSubmit={handleFormSubmit} />
          </div>
        </div>

        <div className='flex flex-1 flex-col flex-wrap content-center justify-between'>
          <div>
            <h2 className='text-center text-xl font-bold mb-4'>Response Translation:</h2>
            <WordByWord currentState={postQuery.status} worByWordTranslation={extractRelevantInfo("word-by-word-input", conversation) as object}  />
          </div>
          <div>
            <h2 className='text-center text-xl font-bold mb-4'>Follow-Up Things to Say:</h2>
            <Responses type="follow-up" currentState={postQuery.status} responses={extractRelevantInfo("follow-up", conversation) as { response: string; translation: string; }[]}  />
          </div>
        </div>
      </div>
    );
  };
  
export default Chat;