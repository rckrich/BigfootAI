import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, MessageTextContent } from "@chatscope/chat-ui-kit-react";
import { MessagePlaceHolder } from "./MessagePlaceHolder";
import { ElementContextThread } from "../context/ThreadContext";
import React, { useState, useEffect, useRef, useContext } from 'react';


export const ChatBox = () => {

    const { Active } = useContext(ElementContextThread);
    const [UserMessage, setUserMessage] = useState("Hello what can you do");
    const [checkRun, setCheckRun] = useState(false);
    const [messages, setMessages] = useState([]);
    const apiKey = "";
    const assistant_id = "asst_My2L0JuJiUoSQPQItZS9llpc";

    console.log(Active);
    useEffect(() => {
        
        console.log("uwu");
        handleMessageToThread();
        
    },[])

    const handleMessageToThread =( ) => {
        if(UserMessage === ""){
            
        }else{
            fetch(`https://api.openai.com/v1/threads/${Active}/messages`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,  
                  'Content-Type': 'application/json',
                  'OpenAI-Beta' : 'assistants=v2',
                 
                },
                body: JSON.stringify({
                    "role": "user",
                    "content": `${UserMessage}`
                })
              })
                .then(response => console.log(response.json()))
                .then(data => handleRun())
                .then(data => console.log(data))
        
                .catch(error => console.error('Error:', error));
        }
        
    }

    const handleRun =( ) => {
        fetch(`https://api.openai.com/v1/threads/${Active}/runs`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,  
              'Content-Type': 'application/json',
              'OpenAI-Beta' : 'assistants=v2',
            },
            body: JSON.stringify({
                "assistant_id" : `${assistant_id}`
            })
          })
            .then(response => console.log(response.json()))
            .then(data => checkRunStatus(data.run_id))
            .then(data => console.log(data))
    
            .catch(error => console.error('Error:', error));
    }

    const checkRunStatus = (runId) => {
        const interval = setInterval(() => {
            fetch(`https://api.openai.com/v1/threads/thread_abc123/runs/${runId}/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
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
                        
                        console.log('Run status:', data.status);
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
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
            }
        })
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages);  
                console.log('Messages fetched:', data.messages);
            })
            .catch(error => console.error('Error fetching messages:', error));
    }

    return (
        <div className="ChatboxContainer">
            <h3 style={{textAlign: "center", width: "100%", paddingTop:"10px", paddingBottom: "10px", backgroundColor: "rgba(49, 24, 24, 0.69)"}} className="TitleText">Tiktok Trends 2024</h3>
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
            
            <MainContainer className="overrideStyle">
                <ChatContainer className="overrideStyle">
                <MessageList className="overrideStyle"> 
                    <Message 
                    model={{
                        message: "Hello my friend",
                        sentTime: "just now",
                        sender: "Joe",
                    }}
                    />

                    <Message 
                    model={{
                        message: "bla bla",
                        sentTime: "just now",
                        sender: "pepe",
                        direction: "incoming",
                    }}
                    />  
                    <MessagePlaceHolder></MessagePlaceHolder>

                </MessageList>
                <MessageInput onSend={() => {handleMessageToThread()}}  onChange={e =>  setUserMessage(e)}autoFocus placeholder="Type message here" className="overrideStyle" attachButton={false} fancyScroll={false} />
                </ChatContainer>
            </MainContainer>
            </div>
        </div>
    )
}