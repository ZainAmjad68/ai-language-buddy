import convict from "convict";

const config = convict({
  environment: {
    doc: "Specifies the running environment of app_sftp_import",
    format: ["production", "staging", "staging"],
    env: "HFP_ENV",
    default: "development",
  },
  openai: {
    url: {
      doc: "The url of the OpenAI API",
      format: String,
      default: "https://api.openai.com/v1",
    },
    api_key: {
      doc: "The API Key used with the OpenAI account",
      format: String,
      default: "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",
    },
    chat_postfix: {
      doc: "Chat Completion part of the OpenAI API",
      format: String,
      default: "/chat/completions",
    },
    completion_postfix: {
      doc: "Prompt Completion part of the OpenAI API",
      format: String,
      default: "/completions",
    },
    completion_model: {
      doc: "OpenAI Model to send the completion request to",
      format: String,
      default: "text-davinci-003"
    },
    chat_model: {
      doc: "OpenAI Chat Model to send the prompt to",
      format: String,
      default: "gpt-3.5-turbo"
    },
  }
});

export default config;
