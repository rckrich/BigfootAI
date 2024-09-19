import { ChatHistoryPrefab } from "./ChatHistoryPrefab"
import add from "../img/add.svg"
import account from "../img/account.svg";
import sidebar from "../img/sidebar.svg";

export const Sidebar = () => {
    return (
        <div className="sidebarContainer">

            <div className="rowContainer">
                <img src= {account} alt="account"></img>
                <h3 style={{color: "white"}}>John Smith</h3>
                <img src= {sidebar} alt="sidebar"></img>
            </div>

            <div className="rowContainer">
                <div style={{paddingTop: "10px"}}><input className="sidebarInput" placeholder="Search"></input></div>
                <button><img src={add} alt = "add"></img></button>
            </div>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPrefab></ChatHistoryPrefab>

        </div>
    )
}