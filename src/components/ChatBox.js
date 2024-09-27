import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { MessagePlaceHolder } from "./MessagePlaceHolder";
import { ElementContextThread } from "../context/ThreadContext";
import React, { useState, useEffect, useContext } from 'react';
import { TypingAni } from "./TypingAni";
import { Await } from "react-router-dom";


export const ChatBox = () => {

    const { Active } = useContext(ElementContextThread);
    const [UserMessage, setUserMessage] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [messages, setMessages] = useState([]);
    const assistant_id = "asst_My2L0JuJiUoSQPQItZS9llpc";
    const [newMessageToType, setnewMessageToType] = useState();
    let messageList = [];

    useEffect(() => {
        fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleMessageToThread =( ) => {
        if(UserMessage === ""){
           return;
        }else{

            const newUserMessage = {
                
                id: Date.now(),
                role: "user",
                content: [{ text: { value: UserMessage } }]
            };
            setMessages(prevMessages => [...prevMessages, newUserMessage]);

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

        const interval = setInterval(() => {
            fetch(`https://api.openai.com/v1/threads/${Active}/runs/${runId}`, {
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
                        setnewMessageToType(false);
                        setWaiting(false);
                        clearInterval(interval);
                    }
                    if (data.status === 'completed') {
                        setnewMessageToType(true);
                        clearInterval(interval);
                        setWaiting(false);
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

                if(data.length !== 0){
                    
                    setMessages(data.data.reverse());
                }
                
            })
            .catch(error => console.error('Error fetching messages:', error));
    }

    if(true){
        messageList.push(<></>)
        if(messages !== undefined){
            for (let index = 0; index < messages.length; index++) {

                if(index === messages.length - 1 && newMessageToType) {
                    if(messages[index].role === "user"){
                        messageList.push(<Message key={messages[index].id} model={{
                            message: messages[index].content[0].text.value,
                            sender: messages[index].role,
                            direction: "outgoing"
                        }}></Message>)
                    }else{
                        let helper = messages[index].content[0].text.value;
                        messageList.push(<TypingAni WordToType={{helper}}></TypingAni>)
                    }
                    
                }else{
                    if(messages[index].role === "user"){
                        messageList.push(<Message key={messages[index].id} model={{
                            message: messages[index].content[0].text.value,
                            sender: messages[index].role,
                            direction: "outgoing"
                        }}></Message>)
                    }
                    if(messages[index].role === "assistant"){
                        messageList.push(<Message key={messages[index].id} model={{
                            message: messages[index].content[0].text.value,
                            sender: messages[index].role,
                            direction: "incoming"
                        }}></Message>)
                    }
                }
            }
        }

    }

    return (
        <div className="ChatboxContainer">
            <h3 style={{textAlign: "center", width: "100%", paddingTop:"10px", paddingBottom: "10px", backgroundColor: "rgba(49, 24, 24, 0.69)"}} className="TitleText">Tiktok Trends 2024</h3>
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <MainContainer className="overrideStyle">
                <ChatContainer className="overrideStyle">
                <MessageList className="overrideStyleMessageList" >
                    <>{messageList}</>
                    {waiting === true ? <TypingIndicator className="typingOverride" content="Assistant is thinking" /> : <></>}
                </MessageList>

                <MessageInput onSend={() => {handleMessageToThread()}}  onChange={e =>  setUserMessage(e)}autoFocus placeholder="Type message here" className="overrideStyle" attachButton={false} fancyScroll={false} />
                </ChatContainer>
            </MainContainer>
            </div>
        </div>
    )
}