/// <reference types="vite-plugin-svgr/client" />

interface ImportMeta {
    env: {
        VITE_OPENAI_API_KEY: string
        VITE_OPENAI_CHAT_URL:string
        VITE_OPENAI_CHAT_MODEL:string
    };
}