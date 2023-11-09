import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { store } from "../store/store";
import { TouchBackend } from "react-dnd-touch-backend";
import CustomDragLayer from "../components/customDragLayer";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layouts } from "../components/common/layouts";
import { MyAppProps } from "../components/common/types";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const Layout = Layouts[Component.Layout] ?? ((page) => page);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DndProvider
          backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          <CustomDragLayer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DndProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
