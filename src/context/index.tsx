"use client";

import React, { createContext, ReactNode, useContext } from "react";

type StoreType = {
  store: {
    store: {};
  };
  setStore: (store: any) => void;
};

const StoreContext = createContext<StoreType | any>({ store: {} });

export const GlobalStoreProvider = ({
  store: inirialSrtore = { store: {} },
  children,
}: {
  store: any;
  children: ReactNode;
}) => {
  const [store, setStore] = React.useState(inirialSrtore);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    console.log(context);
    throw new Error("useStore must be used within a MenuProvider");
  }
  return context;
};
