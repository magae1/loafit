"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.subscribe(() => {
      localStorage.setItem("redux-data", JSON.stringify(store.getState()));
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
