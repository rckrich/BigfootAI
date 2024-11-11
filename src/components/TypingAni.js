import React, { useState, useEffect, useContext  } from 'react';
import { Message, } from "@chatscope/chat-ui-kit-react";
import { TypingContextProvider } from '../context/TypingContext';


export const TypingAni = ({WordToType, scroll}) => {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    const { isTyping, setIsTyping } = useContext(TypingContextProvider);
    const str = WordToType.helper;

    useEffect(() => {
        console.log(isTyping);
        setIsTyping(true);
        if(str === value){
            setIsTyping(false);
            return;
        }
        const timeout = setTimeout(() => {
            setCount(count+1);
            if(str !== value) {
                for (let index = 0; index < count; index++) {
                    setValue(value + str[index])
                    if(scroll !== undefined){
                        scroll();
                    }
                }
            }
        }, 20)
    })

    return (

        <Message key={"0101010"} model={{
                            message: value,
                            sender: "assistant",
                            direction: "incoming"
                        }}></Message>

    )
}