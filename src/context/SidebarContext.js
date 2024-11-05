import React, { createContext, useState } from "react";

const ElementContextSidebar = createContext();

const ElementProviderSidebar = ({ children }) => {
  const [valueSB, setValue] = useState(false);

  const changeValueSideBar = (newValue) => {
    setValue(newValue);
  };

  return (
    <ElementContextSidebar.Provider value={{ valueSB, changeValueSideBar  }}>
      {children}
    </ElementContextSidebar.Provider>
  );
};

export { ElementContextSidebar, ElementProviderSidebar };
