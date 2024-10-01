import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { MessagePlaceHolder } from "./MessagePlaceHolder";
import { ElementContextThread } from "../context/ThreadContext";
import React, { useState, useEffect, useContext } from 'react';


export const ChatBox = () => {

    const { Active } = useContext(ElementContextThread);
    const [UserMessage, setUserMessage] = useState("Hello what can you do");
    const [waiting, setWaiting] = useState(false);
    const [messages, setMessages] = useState([]);
    const assistant_id = "asst_My2L0JuJiUoSQPQItZS9llpc";
    const [pendingMessage, setPendingMessage] = useState(null);
    
    useEffect(() => {
        fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const typeAssistantMessage = (messageContent, callback) => {
        let currentIndex = 0;
        let typingMessage = "";
        const typingInterval = setInterval(() => {
            typingMessage += messageContent[currentIndex];
            currentIndex++;
            callback(typingMessage);
            if (currentIndex === messageContent.length) {
                clearInterval(typingInterval);
            }
        }, 50);
    }
    const handleMessageToThread =( ) => {
        if(UserMessage === ""){
           return;
        }else{

            const newUserMessage = {
                
                id: Date.now(),
                role: "user",
                content: [{ text: { value: UserMessage } }]
            };
            setMessages((prevMessages) => [newUserMessage, ...prevMessages]);
            setUserMessage("");
            setWaiting(true);
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
            .then(response => response.json()) 
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
            .then(data => {

                checkRunStatus(data.id)
            })

            .catch(error => console.error('Error:', error));
    }

    const checkRunStatus = (runId) => {
        console.log(runId);
        const interval = setInterval(() => {
            fetch(`https://api.openai.com/v1/threads/${Active}/runs/${runId}/`, {
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
                        setWaiting(false);
                        clearInterval(interval);
                    }
                    if (data.status === 'completed') {
                        clearInterval(interval);
                        fetchMessages().then((fetchMessages) => {
                            const assistantMessage = fetchMessages.find(
                                msg => msg.role === "assistant"
                            );
                            if (assistantMessage) {
                                typeAssistantMessage(
                                    assistantMessage.content[0].text.value,
                                    (partialMessage)=> {
                                        const updatedMessage ={
                                            ...assistantMessage,
                                            content: [{text: {value: partialMessage}}]
                                        };
                                        setMessages(prevMessages => [
                                            updatedMessage,
                                            ...prevMessages.filter(msg => msg.id != assistantMessage.id)
                                        ])
                                    }
                                )
                            }
                        });
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
                    {waiting === false ? <TypingIndicator className="typingOverride" content="Assistant is thinking" /> : <></>}
                </MessageList>

                <MessageInput onSend={() => {handleMessageToThread()}}  onChange={e =>  setUserMessage(e)}autoFocus placeholder="Type message here" className="overrideStyle" attachButton={false} fancyScroll={false} />
                </ChatContainer>
            </MainContainer>
            </div>
        </div>
    )
}