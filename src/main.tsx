import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Routes from './routes';
import './styles/index.css';


const queryClient = new QueryClient();

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
              <Routes />
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>,
  );
