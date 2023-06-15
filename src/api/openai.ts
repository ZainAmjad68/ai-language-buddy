/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ICompletionResult,
} from '../types/IOpenAI';
import API from './api';
import chatPrompt from "./prompts/german-to-english.json";
import tipsPrompt from "./prompts/language-tips.json";

const API_Key = import.meta.env.VITE_OPENAI_API_KEY!;
const ChatUrl = import.meta.env.VITE_OPENAI_CHAT_URL!;
let modelToUse = import.meta.env.VITE_OPENAI_CHAT_MODEL;

let dataToSend : { role: string, content: string }[] = []; 

function prepareChatData(userPrompt: string) {
    dataToSend = JSON.parse(JSON.stringify(chatPrompt));
    dataToSend.push({
        role: "user",
        content: userPrompt
    })
}

function prepareTipsData(text: string) {
    dataToSend = JSON.parse(JSON.stringify(tipsPrompt));
    dataToSend.push({
        role: "user",
        content: text
    })
}

export async function askGPT(prompt: string, model?: string): Promise<ICompletionResult> {
    prepareChatData(prompt);
    API.setAuthHeader(API_Key);
    if (model) {
        modelToUse = model;
    }
    const response = await API.post(ChatUrl, 
        {
            model: modelToUse,
            messages: dataToSend
        });
    return response.data;
}

export async function fetchGrammarTips(text: string): Promise<ICompletionResult> {
    prepareTipsData(text);
    API.setAuthHeader(API_Key);
    const response = await API.post(ChatUrl, 
        {
            model: modelToUse,
            messages: dataToSend
        });
    return response.data;
}