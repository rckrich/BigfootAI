import React, { createContext, useState, useContext } from "react";
import { ElementContextPopUp } from "../context/PopUpContext";
const ElementContextThread = createContext();

const ElementProviderThread= ({ children }) => {
  const { changeValuePopUP } = useContext(ElementContextPopUp);
  const [value, setValue] = useState("");

  const [Active, setActive] = useState("");
  const changeValueThread = (newValue) => {
    setValue(newValue);
  };

  const changeActive = (newValue, newTitle, newLastMessage,token ) => {
    setActive(newValue);

    fetch('http://165.22.178.7/api/v1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        "thread_id": newValue,
        "title": newTitle,
        "last_message": newLastMessage
      })
    })
      .catch(error => console.error('Error:', error));
    changeValuePopUP("");



  };

  return (
    <ElementContextThread.Provider value={{ value, changeValueThread, Active, changeActive }}>
      {children}
    </ElementContextThread.Provider>
  );
};

export { ElementContextThread, ElementProviderThread };
