import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export const ChatBox = () => {
    return (
        <div className="ChatboxContainer">
            <h3 style={{textAlign: "center", width: "100%", paddingTop:"10px", paddingBottom: "10px", color: "white", backgroundColor: "rgba(49, 24, 24, 0.39)"}}>Tiktok Trends 2024</h3>
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
                </MessageList>
                <MessageInput placeholder="Type message here" className="overrideStyle" />
                </ChatContainer>
            </MainContainer>
            </div>
        </div>
    )
}