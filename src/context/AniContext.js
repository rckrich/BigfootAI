import React, { createContext, useState } from "react";

const ElementContextAni = createContext();

const ElementProviderAni = ({ children }) => {
  const [valueAni, setValueAni] = useState(false);

  const changeValueAni = (newValue) => {
    setValueAni(newValue);
  };

  return (
    <ElementContextAni.Provider value={{ valueAni, changeValueAni  }}>
      {children}
    </ElementContextAni.Provider>
  );
};

export { ElementContextAni, ElementProviderAni };
