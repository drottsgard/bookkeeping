import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BookkeepingApp from "./BookkeepingApp";

interface ReactQueryProviderProps {
  children: ReactElement;
}

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export function MainApp() {
  return (
    <ReactQueryProvider>
      <BookkeepingApp />
    </ReactQueryProvider>
  );
}
