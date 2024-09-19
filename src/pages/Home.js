
import { Sidebar } from "../components/Sidebar.js"
import {ChatBox} from "../components/ChatBox.js"
export const Home = () => {
    return (
        <div className="rowContainer">
            <Sidebar></Sidebar>
            <ChatBox></ChatBox>
        </div>
    )
}