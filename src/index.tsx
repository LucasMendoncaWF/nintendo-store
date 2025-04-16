import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import Main from 'app/components/pageStructure/Main';

import './index.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function SilentFallback() {
  return null;
}

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={SilentFallback}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
