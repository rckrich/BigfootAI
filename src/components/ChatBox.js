import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, InputToolbox, SendButton } from "@chatscope/chat-ui-kit-react";
import { ElementContextThread } from "../context/ThreadContext";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { TypingAni } from "./TypingAni";
import { AuthContext } from "../pages/AuthContext";
import { ElementContextSidebar } from "../context/SidebarContext";

export const ChatBox = () => {

    const { Active, Title } = useContext(ElementContextThread);
    const { userData, setUserData } = useContext(AuthContext);
    const { valueSB } = useContext(ElementContextSidebar);
    const [UserMessage, setUserMessage] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [messages, setMessages] = useState([]);
    const containerRef = useRef(null);
    const assistant_id = "asst_zrSOh8NUnr9XkoSAcZOkFP8d";
    const [newMessageToType, setnewMessageToType] = useState();
    const [fileIds, setFileIds] = useState({});
    const [filePopup, setFilePopup] = useState({ visible: false, filename: '', x: 0, y: 0 });
    let messageList = [];

    useEffect(() => {
        if(Active !== undefined && Active !== null && Active !== "") {
            setMessages([]);
            fetchMessages();
        }else{
            setMessages([]);
        }
    },[Active])


    const scrolltoBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollToBottom();
        }
    };

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
            scrolltoBottom();
            fetch(`https://api.openai.com/v1/threads/${Active}/messages`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${userData.open_ia_key}`,
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
              'Authorization': `Bearer ${userData.open_ia_key}`,
              'Content-Type': 'application/json',
              'OpenAI-Beta' : 'assistants=v2',
            },
            body: JSON.stringify({
                "assistant_id" : `${assistant_id}`,
                "model" : "gpt-4o-mini",
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
                    'Authorization': `Bearer ${userData.open_ia_key}`,
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
        fetch(`https://api.openai.com/v1/threads/${Active}/messages?limit=100`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.open_ia_key}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
            }
        })
        .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.length !== 0){
                    formatArrayText(data.data.reverse());
                }
            })
            .catch(error => console.error('Error fetching messages:', error));
    }
    const fetchfiles = async (filesid) => {
        try {
            const response = await fetch(`https://api.openai.com/v1/files/${filesid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData.open_ia_key}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return data.filename;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };
    const extractLinkAndBracketContent = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let link = text.match(urlRegex);
        const textWithoutLink = text.replace(urlRegex, '').trim();

        if(link !== null){
            if(!isImageUrl(link)){
                link = null;
            }
        }

        return {
            textWithoutLink: textWithoutLink,
            link: link ? link[0] : null,
          };
    }
    
    const isImageUrl = (url) => {
        const cleanUrl = url[0].split('?')[0];
        const clean2 = cleanUrl.split('#')[0]
        return (/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i).test(clean2);
    }

    const handleFileHover = async (fileId, x, y) => {
        const filename = await fetchfiles(fileId);
        if (filename) {
            setFilePopup({ visible: true, filename, x, y });
        }
    };

    function formatText(text) {
        let helper = text;
        formatSource(text);
        helper.content[0].text.value = text.content[0].text.value.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        helper.content[0].text.value = text.content[0].text.value.replace(
            /### (.*)/g,
            '<span style="font-weight:bold; font-size:1.2em;">$1</span>'
        );
        helper.content[0].text.value = text.content[0].text.value.replace(/- /g, '• ');
        helper.content[0].text.value = helper.content[0].text.value.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" style="color: blue; text-decoration: underline;">$1</a>');
        helper.content[0].text.value = text.content[0].text.value.replace(/【/g, ' [')
        .replace(/】/g, ']')
        .replace(/\[(\d+):(\d+)†[^\]]*\]/g, (match, p1, p2) => {
             const fileId = text.content[0].text.annotations[0].file_citation.file_id;
                setFileIds(prevIds => ({ ...prevIds, [`${p1}:${p2}`]: fileId }));

                return `<span class="hoverable-ref" style="cursor: pointer;" data-file-id="${fileId}">[${p1}:${p2}]</span>`;
        });
        return helper;
    }
    const hideFilePopup = () => {
        setFilePopup({ ...filePopup, visible: false });
    };

    useEffect(() => {
        const handleMouseOver = (event) => {
            if (event.target.classList.contains("hoverable-ref")) {
                const fileId = event.target.getAttribute("data-file-id");
                const { clientX: x, clientY: y } = event;
                handleFileHover(fileId, x, y);
            }
        };
        

        const handleMouseOut = (event) => {
            if (event.target.classList.contains("hoverable-ref")) {
                hideFilePopup();
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    const formatArrayText = (text) => {
        setMessages([]);
        for (let index = 0; index < text.length; index++) {
            setMessages(prevMessages => [...prevMessages, formatText(text[index])]);
        }
      };

    function formatSource(text){
        let helper = text;
        if(helper.content[0].text.annotations.length > 0){
            const annotation = helper.content[0].text.annotations[0];
        if (annotation.file_citation && annotation.file_citation.file_id) {
            setFileIds(prev => ({
                ...prev,
                [`${helper.id}`]: annotation.file_citation.file_id
            }));
        }
    }
    }
    

    
    let isDisabled
    if(Active !== undefined && Active !== null && Active !== ""){
        isDisabled = false;
    }else{
        isDisabled = true;
    }

    if(true){
        messageList.push(<></>)
        if(messages !== undefined){
            for (let index = 0; index < messages.length; index++) {
                let result = extractLinkAndBracketContent(messages[index].content[0].text.value);
                if(result.link !== null){
                    console.log(result.link);
                    if(index === messages.length - 1 && newMessageToType) {
                        let helper = result.textWithoutLink;
                        messageList.push(<TypingAni WordToType={{helper}} ></TypingAni>)
                    }else{
                        if(messages[index].role === "assistant"){
                            messageList.push(<Message key={messages[index].id} model={{
                                message: result.textWithoutLink,
                                sender: messages[index].role,
                                direction: "incoming"
                            }}></Message>)
                        }
                    }


                    messageList.push(<img src={result.link} alt="ImgFromAssistant" style={{ paddingTop: "15px", paddingBottom: "15px", maxWidth: "50vw", maxHeight: "50vh"}}></img>)


                }else{
                    if(index === messages.length - 1 && newMessageToType) {
                        if(messages[index].role === "user"){
                            messageList.push(<Message key={messages[index].id} model={{
                                message: messages[index].content[0].text.value,
                                sender: messages[index].role,
                                direction: "outgoing"
                            }}></Message>)
                        }else{
                            let helper = messages[index].content[0].text.value;
                            messageList.push(<TypingAni WordToType={{helper}} ></TypingAni>)
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

    }

    let classHelper
    if(valueSB){
        classHelper = "ChatboxContainer";
    }else{
        classHelper = "ChatboxContainerClose";
    }

    return (
        <div className={classHelper}>
            <h3 style={{ height: "10vh", textAlign: "center", width: "100%", paddingTop:"10px", paddingBottom: "10px", backgroundColor: "#FFFFFF", color: "black", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.02)", fontWeight: "bold" }} className="TitleText">
                {Title.length > 30 ? `${Title.substring(0, 30)}...` : Title}
            </h3>
            <div style={{  height: "89vh", width: "100%" }}>
            <MainContainer className="overrideStyle">
                <ChatContainer className="overrideStyleChatContainer" >
                <MessageList scrollBehavior={"auto"} className="overrideStyleMessageList" ref={containerRef} style={{paddingLeft: "40px", paddingRight: "40px", height: "89vh", overflowY: "auto"}} >
                    <>{messageList}</>
                    {waiting === true ? <TypingIndicator className="typingOverride" content="Kodex está pensando..." /> : <></>}
                </MessageList>
                <MessageInput disabled={isDisabled} onSend={() => {handleMessageToThread()}}  onChange={e =>  setUserMessage(e)}autoFocus placeholder="Escriba su mensaje aquí" className="overrideStyleInput" attachButton={false} fancyScroll={false}>
                </MessageInput>
                </ChatContainer>
            </MainContainer>
            {filePopup.visible && (
                <div
                    style={{
                        position: "absolute",
                        top: filePopup.y - 50,
                        left: filePopup.x,
                        transform: "translateX(-50%)",
                        backgroundColor: "white",
                        color: "black",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        pointerEvents: "none",
                        zIndex: 1000,
                    }}
                >
                    {filePopup.filename}
                </div>
            )}
            <button
                            onClick={scrolltoBottom}
                            style={{
                                position: "fixed",
                                bottom: "100px",
                                right: "70px",
                                padding: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#ededf8",
                                color: "black",
                                border: "none",
                                cursor: "pointer",
                                zIndex: "100",
                                width: "40px",
                            }}
                        >
                            ↓
                        </button>
            </div>
            
        </div>
        
    )
}
