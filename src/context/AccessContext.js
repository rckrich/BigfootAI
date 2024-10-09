import React, { createContext, useState } from "react";

const ElementContextAccess = createContext();

const ElementProviderAccess= ({ children }) => {
  const [value, setValue] = useState("");
  const changeValueThread = (newValue) => {
    setValue(newValue);
  };

  return (
    <ElementContextAccess.Provider value={{ value, changeValueThread}}>
      {children}
    </ElementContextAccess.Provider>
  );
};

export { ElementContextAccess, ElementProviderAccess };
