import React, {useState} from 'react';
import TextInput from '../components/TextInput';
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { askGPT } from "../api/openai";

const Chat: React.FC = () => {
  const [inputData, setInputData] = useState("");
  // refetch whenever inputData changes, however don't fetch on first render
  // i.e.; only enable when input changes from initial state ("")
  const postQuery = useQuery(
      ["chat", inputData], 
      () => askGPT(inputData),
      {refetchOnWindowFocus: false, enabled: inputData != ""}
    );

    const handleFormSubmit = (value: string) => {
      setInputData(value);
    };

    if (postQuery.isLoading) {
      return (
        <div>
          <div>
            <h1>Loading...</h1>
          </div>
          <div className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-2">
              <TextInput placeholder="Say Something in German..." onSubmit={handleFormSubmit} />
          </div>
        </div>
      )
    }

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
          <h1>{JSON.stringify(postQuery.data)}</h1>
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-2">
            <TextInput placeholder="Say Something in German..." onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  };
  
export default Chat;