  export interface IApiOptions {
    max_tokens?: string
    temperature?: string
  }

  export interface IApiParams {
    model?: string
    prompt: string,
    options?: IApiOptions
  }
  
  export interface ICompletionResult {
    "id": string,
    "object": string,
    "created": number,
    "model": string,
    "choices": Array<{
      "text": string,
      "index": number,
      "logprobs": string | null,
      "finish_reason": string
    }>,
    "usage": {
      "prompt_tokens": number,
      "completion_tokens": number,
      "total_tokens": number
    }
}
  