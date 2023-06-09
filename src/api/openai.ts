/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ICompletionResult,
} from '../types/IOpenAI';
import API from './api';
import json from "./prompts/german-to-english.json";

const API_Key = import.meta.env.VITE_OPENAI_API_KEY!;
const ChatUrl = import.meta.env.VITE_OPENAI_CHAT_URL!;
let modelToUse = import.meta.env.VITE_OPENAI_CHAT_MODEL;

let dataToSend : { role: string, content: string }[] = []; 

function prepareDataToPost(userPrompt: string) {
    // Read the file asynchronously

    console.log('json',json);
    dataToSend = JSON.parse(JSON.stringify(json));
    console.log('dataToSend',dataToSend);
    dataToSend.push({
        role: "user",
        content: userPrompt
    })
    console.log('dataToSend', dataToSend);
}

export async function askGPT(prompt: string, model?: string): Promise<ICompletionResult> {
    prepareDataToPost(prompt);
    API.setAuthHeader(API_Key);
    if (model) {
        modelToUse = model;
    }
    const response = await API.post(ChatUrl, 
        {
            model: modelToUse,
            messages: dataToSend
        });
    console.log('this is the result', response.data);
    return response.data;
}