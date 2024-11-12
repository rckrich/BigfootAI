import { ElementContextPopUp } from "../context/PopUpContext";
import React, { useContext } from "react";
import add from "../img/editSquare.svg"
export const CreateChat = () => {

    const { changeValuePopUP } = useContext(ElementContextPopUp);
    const handleClick =( ) => {
        changeValuePopUP("new");
    }

    return (
        <div className="createChatContainer" >
                    <button className= "imgClear" onClick={handleClick} style={{alignItems: "center", backgroundColor: "rgba(41, 43, 58, 0.3)", borderRadius: "50px", width: "82%", height: "45%", justifyContent: "center"}}> <h4 className="ChatHistoryTime">Crear nuevo chat</h4> <img src={add} style={{paddingLeft: "10px"}}></img></button>
        </div>
    )
}