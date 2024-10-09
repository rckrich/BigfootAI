import React, { createContext, useState } from "react";

const ElementContextAccess = createContext();

const ElementProviderAccess= ({ children }) => {
  const [valueToken, setValueToken] = useState("");
  const changeValueToken = (newValue) => {
    setValueToken(newValue);
  };

  return (
    <ElementContextAccess.Provider value={{ valueToken, changeValueToken}}>
      {children}
    </ElementContextAccess.Provider>
  );
};

export { ElementContextAccess, ElementProviderAccess };
