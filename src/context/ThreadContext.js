import React, { createContext, useState } from "react";

const ElementContextThread = createContext();

const ElementProviderThread= ({ children }) => {
  const [value, setValue] = useState("");

  const changeValueThread = (newValue) => {
    setValue(newValue);
  };

  return (
    <ElementContextThread.Provider value={{ value, changeValueThread }}>
      {children}
    </ElementContextThread.Provider>
  );
};

export { ElementContextThread, ElementProviderThread };
