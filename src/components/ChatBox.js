import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, MessageTextContent } from "@chatscope/chat-ui-kit-react";
import { MessagePlaceHolder } from "./MessagePlaceHolder";
import { ElementContextThread } from "../context/ThreadContext";
import React, { useState, useEffect, useRef, useContext } from 'react';


export const ChatBox = () => {

    const { Active } = useContext(ElementContextThread);
    const [UserMessage, setUserMessage] = useState("Hello what can you do");
    const [messages, setMessages] = useState([]);
    const assistant_id = "asst_My2L0JuJiUoSQPQItZS9llpc";

    useEffect(() => {
        

        fetchMessages();

        
    },[])

    const handleMessageToThread =( ) => {
        if(UserMessage === ""){
            
        }else{
            fetch(`https://api.openai.com/v1/threads/${Active}/messages`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,  
                  'Content-Type': 'application/json',
                  'OpenAI-Beta' : 'assistants=v2',
                 
                },
                body: JSON.stringify({
                    "role": "user",
                    "content": `${UserMessage}`
                })
              })
                .then(data => handleRun())
        
                .catch(error => console.error('Error:', error));
        }
        
    }

    const handleRun =( ) => {
        fetch(`https://api.openai.com/v1/threads/${Active}/runs`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,  
              'Content-Type': 'application/json',
              'OpenAI-Beta' : 'assistants=v2',
            },
            body: JSON.stringify({
                "assistant_id" : `${assistant_id}`
            })
          })
          .then(response => response.json()) 
            .then(data => checkRunStatus(data.id))
    
            .catch(error => console.error('Error:', error));
    }

    const checkRunStatus = (runId) => {
        const interval = setInterval(() => {
            fetch(`https://api.openai.com/v1/threads/thread_abc123/runs/${runId}/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v2',
                }
            })
                .then(response => response.json())
                .then(data => {
                    if(data.status === undefined) {
                        clearInterval(interval);  
                    }
                    if (data.status === 'completed') {
                        clearInterval(interval);  
                        fetchMessages();  
                    } else {
                        
                    }
                })
                .catch(error => {
                    clearInterval(interval);
                    console.error('Error:', error);
                });
        }, 3000);  
    }

    const fetchMessages = () => {
        fetch(`https://api.openai.com/v1/threads/${Active}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
            }
        })
        .then(response => response.json()) 
            .then(data => {
                setMessages(data.data.reverse());
                console.log(messages);
            })
            .catch(error => console.error('Error fetching messages:', error));
        
    }

    return (
        <div className="ChatboxContainer">
            <h3 style={{textAlign: "center", width: "100%", paddingTop:"10px", paddingBottom: "10px", backgroundColor: "rgba(49, 24, 24, 0.69)"}} className="TitleText">Tiktok Trends 2024</h3>
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
            
            <MainContainer className="overrideStyle">
                <ChatContainer className="overrideStyle">
                <MessageList className="overrideStyleMessageList" > 
                {messages !== <></> ? <>{messages.map(item => (
                        <>{item.role === "user" ? <Message key={item.id} model={{
                            message: item.content[0].text.value,
                            sender: item.role,
                            direction: "outgoing"
                        }}></Message> : <Message model={{
                            message: item.content[0].text.value,
                            sender: item.role,
                            direction: "incoming"
                        }}></Message> }</>
                    ))}</> : null}

                </MessageList>
                <MessageInput onSend={() => {handleMessageToThread()}}  onChange={e =>  setUserMessage(e)}autoFocus placeholder="Type message here" className="overrideStyle" attachButton={false} fancyScroll={false} />
                </ChatContainer>
            </MainContainer>
            </div>
        </div>
    )
}