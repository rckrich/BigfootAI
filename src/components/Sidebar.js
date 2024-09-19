import { ChatHistoryPrefab } from "./ChatHistoryPrefab"
import add from "../img/add.svg"
import account from "../img/account.svg";
import sidebar from "../img/sidebar.svg";

export const Sidebar = () => {
    return (
        <div className="sidebarContainer">

            <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", paddingTop: "10px"}}>
                <img src= {account} alt="account"></img>
                <h3 style={{color: "white"}}>John Smith</h3>
                <img src= {sidebar} alt="sidebar"></img>
            </div>

            <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", paddingTop: "10px"}}>
                <div style={{paddingTop: "10px"}} className="rowContainer"><input className="sidebarInput" placeholder="Search"></input>
                <button className= "imgClear"><img  src={add} alt = "add"></img></button></div>
            </div>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPrefab></ChatHistoryPrefab>

        </div>
    )
}