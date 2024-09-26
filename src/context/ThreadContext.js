import React, { createContext, useState } from "react";

const ElementContextThread = createContext();

const ElementProviderThread= ({ children }) => {
  const [value, setValue] = useState("");
  const [Active, setActive] = useState("thread_MCDiMYq30qeSYOTXenXhPuS9");
  const changeValueThread = (newValue) => {
    setValue(newValue);
  };

  const changeActive = (newValue) => {
    console.log(newValue);
    setActive(newValue);
  };

  return (
    <ElementContextThread.Provider value={{ value, changeValueThread, Active, changeActive }}>
      {children}
    </ElementContextThread.Provider>
  );
};

export { ElementContextThread, ElementProviderThread };
