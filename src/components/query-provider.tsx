"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryClientProviderProps) => {
  const QueryClient = getQueryClient();

  return (
    <QueryClientProvider client={QueryClient}>{children}</QueryClientProvider>
  );
};
