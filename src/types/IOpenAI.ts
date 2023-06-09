  export interface IApiOptions {
    max_tokens?: string
    temperature?: string
  }

  export interface ICompletionParams {
    model: string
    prompt: string,
    options?: IApiOptions
  }

  export interface IChatParams {
    model: string;
    messages: IChatMessage[];
    options?: IApiOptions;
  }  

  export interface IChatMessage {
    role: string;
    content: string;
  }
  
  export interface ICompletionResult {
    "id": string,
    "object": string,
    "created": number,
    "model": string,
    "choices": Array<{
      "message": { role: string, content: string }
      "index": number,
      "finish_reason": string
    }>,
    "usage": {
      "prompt_tokens": number,
      "completion_tokens": number,
      "total_tokens": number
    }
}
  