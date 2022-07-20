import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export const withQueryClient = (component: () => React.ReactNode) => () => (
  <QueryClientProvider client={queryClient}>
    {component()}
  </QueryClientProvider>
);
