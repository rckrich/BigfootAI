import React, { useState, useEffect, useContext  } from 'react';
import { Message, } from "@chatscope/chat-ui-kit-react";

import { ElementContextAni } from '../context/AniContext';


export const TypingAni = ({WordToType, scroll}) => {
    
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    const [lastActive, setLastActive] = useState(Date.now());
    const str = WordToType.helper;
    const {valueAni, changeValueAni, setUseButton } = useContext(ElementContextAni);
    
    useEffect(() => {
        if(!valueAni){
            changeValueAni(true);
        }
        if(str === value){
            changeValueAni(false);
            setUseButton(false);
            return;
        }
        
        const timeout = setTimeout(() => {
            console.log(count);
            setCount(count+1);
            let stringTemp = value;
            if(str !== value) {
                for (let index = value.length; index < count; index++) {
                    stringTemp = stringTemp + str[index]
                    if(scroll !== undefined){
                        scroll();
                    }
                }
                setValue(stringTemp);
            }
        }, 1)
    })

    useEffect(() => {

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {

              setLastActive(Date.now());
            } else if (document.visibilityState === "visible") {
              
              const now = Date.now();
              const diff = (now - lastActive)
              let temp = count + diff;
                temp = Math.round(temp);
    
                if(str !== value) {
                    
                    if(str.length < temp){
                        setValue(str);
                        changeValueAni(false);
                        setUseButton(false);
                    }else{
                        console.log(temp)
                        setCount(temp);
                    }
                    
            }
            }
          };
      
          document.addEventListener("visibilitychange", handleVisibilityChange);
      
          return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
          };
    }, [lastActive] )

    const handleBlur = () => {
        console.log('Input blurred');
    };

    

    return (
        <Message onBlur={handleBlur} key={"0101010"} model={{
                            message: value,
                            sender: "assistant",
                            direction: "incoming"
                        }}></Message>

    )
}