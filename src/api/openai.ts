import { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  ICompletionResult,
  IApiParams,
  IApiOptions,
} from '../types/IOpenAI';
import API from './api';
import urlJoin from "url-join";

import config from "../../config";

const API_Key = config.get('openai.api_key');
const ChatUrl = urlJoin(config.get('openai.url'),config.get('openai.chat_postfix'));

export async function authenticate(prompt: string, model?: string): Promise<ICompletionResult> {
    API.setAuthHeader(API_Key);
    const response = await API.post<ICompletionResult, AxiosResponse<ICompletionResult>, IApiParams>(ChatUrl, 
        {
            model,
            prompt
        });

    return response.data;
}

export async function reauthenticate(
  prompt: string,
  model?: string,
): Promise<ICompletionResult> {
    const response = await API.post<ICompletionResult, AxiosResponse<ICompletionResult>, IApiParams>(ChatUrl, 
    {
        model,
        prompt,
    });

    return response.data;
}
