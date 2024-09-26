import { ElementContextPopUp } from "../context/PopUpContext";
import React, { useContext } from "react";
import add from "../img/add.svg"
export const CreateChat = () => {

    const { changeValuePopUP } = useContext(ElementContextPopUp);
    const handleClick =( ) => {
        changeValuePopUP("new");
    }   
    



    return (
        <div className="rowContainer" style={{justifyContent: "space-evenly", width: "100%", }}>
                    <button className= "imgClear" onClick={handleClick}> <p className="CreateNewChatText">CREAR NUEVO CHAT</p> <img src={add}></img></button>
        </div>
    )
}