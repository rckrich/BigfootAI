import { ChatHistoryPrefab } from "./ChatHistoryPrefab"
import { ChatHistoryPlaceholder } from "./ChatHistoryPlaceHolder"
import add from "../img/add.svg"
import account from "../img/account.svg";
import sidebar from "../img/sidebar.svg";
import { useState } from "react";
export const Sidebar = () => {
    const[isOpen, setIsOpen] = useState(true)
 
    return (
        <>
        {isOpen ?
            <div className="sidebarContainer">

            <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", paddingTop: "10px"}}>
                <img src= {account} alt="account"></img>
                <h3 className="TitleText">John Smith</h3>
                <img src= {sidebar} alt="sidebar"  onClick={()=> setIsOpen(!isOpen)}></img>
            </div>

            <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", paddingTop: "10px"}}>
                <div style={{paddingTop: "10px"}} className="rowContainer"><input className="sidebarInput" placeholder="Search"></input>
                <button className= "imgClear"><img  src={add} alt = "add"></img></button></div>
            </div>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPlaceholder></ChatHistoryPlaceholder>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPrefab></ChatHistoryPrefab>
            <ChatHistoryPlaceholder></ChatHistoryPlaceholder>

            </div>
    
         : <div className="sidebarClosed">

            <div className="rowContainer" style={{ paddingTop: "20px" }}>

             <img src= {sidebar} alt="sidebar"  onClick={()=> setIsOpen(!isOpen)}></img>
            </div>




         </div>
        }
        </>
        
    )
}