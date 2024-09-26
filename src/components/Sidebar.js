import { ChatHistoryPrefab } from "./ChatHistoryPrefab"
import { ChatHistoryPlaceholder } from "./ChatHistoryPlaceHolder"

import account from "../img/account.svg";
import sidebar from "../img/sidebar.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import{ CreateChat} from "./CreateChat"
export const Sidebar = () => {
    const[isOpen, setIsOpen] = useState(true)
    const[isDisplay, setIsDisplay] = useState(false)
    const botonRef = useRef(null);
    const navigate = useNavigate()
    const toggleDropdown = () => {
        setIsDisplay(!isDisplay);
    };
    const handleLogout = () => {
        navigate("/");
    }
    const handleClickOutside = (event) => {
        if (botonRef.current && !botonRef.current.contains(event.target)) {
          setIsDisplay(false);
        }
      };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    return (
        <>
        {isOpen ?
            <div className="ColumnContainer" style={{justifyContent: "flex-start",}}>
                <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", paddingTop: "10px", alignItems: "center"}}>
                    <button className= "imgClear" onClick={toggleDropdown} ref={botonRef}> <img src={account} alt="sidebar"></img>
                    </button>
                    {isDisplay && (
                        <div className="dropdown-menu show" style = {{
                            position: "absolute",
                            top: "40px",
                            left: "15px",
                            zIndex: 1000,
                        }}>
                            <button className="dropdown-item" onClick={handleLogout} >
                                Logout
                            </button>
                        </div>
                    )}
                    <h3 className="TitleText">John Smith</h3>
                    <img src= {sidebar} alt="sidebar"  onClick={()=> setIsOpen(!isOpen)}></img>
                </div>
                <div className="sidebarContainer">

                

                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPlaceholder></ChatHistoryPlaceholder>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPlaceholder></ChatHistoryPlaceholder>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                <ChatHistoryPrefab></ChatHistoryPrefab>
                </div>
                <CreateChat></CreateChat>
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