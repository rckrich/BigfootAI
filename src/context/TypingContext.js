import React, { createContext, useState } from 'react';


const TypingContext = createContext();

const TypingContextProvider = ({ children }) => {
  const [isTypingAnim, setIsTypingAnim] = useState(false);

  return (
    <TypingContext.Provider value={{ isTypingAnim, setIsTypingAnim }}>
      {children}
    </TypingContext.Provider>
  );
};
export { TypingContext, TypingContextProvider };