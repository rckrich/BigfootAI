
import { Sidebar } from "../components/Sidebar.js"
import {ChatBox} from "../components/ChatBox.js"
export const Home = () => {
    return (
        <div className="rowContainer" style={{maxWidth: "100vw", maxHeight: "100vh", minWidth: "100vw", minHeight: "100vh"}}>
            <Sidebar></Sidebar>
            <ChatBox></ChatBox>
        </div>
    )
}