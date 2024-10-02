import more from "../img/more.svg";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { ElementContextPopUp } from "../context/PopUpContext";
export const ChatHistoryPrefab = () => {

    const { changeValuePopUP } = useContext(ElementContextPopUp);
    const [isClicked, setIsClicked] = useState(false);
    const botonRef = useRef(null);
    const handleClickOutside = (event) => {
        if (botonRef.current && !botonRef.current.contains(event.target)) {
          setIsClicked(false);
        }
      };
    const handleClick = () => {
        if (isClicked) {

        }
        setIsClicked(!isClicked);
    };

    const handleClickDelete = () => {
        changeValuePopUP("eliminate");
    } 

    const handleClickEdit = () => {
        changeValuePopUP("edit");
    } 

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    return (
        <div style={{paddingTop: "10px", width: "100%", paddingRight: "5px"}}>
            <div className="ChatHistoryPrefabContainer" style={{position: "relative"}}>
                <div className="rowContainer" style={{justifyContent: "space-between", width: "100%", height:"100%", }}>
                    <div className="ColumnContainer" style={{paddingLeft: "10px", paddingRight: "5px", alignItems: "flex-start", height:"100%", justifyContent:"center"}}>
                        <p className="ChatHistoryTime" style={{paddingBottom: "5px"}}>1 Month Ago</p>
                        <p className="ChatHistoryText">Tiktok Trends 2024</p>
                    </div>

                    <button className= "imgClear" onClick={handleClick} ref={botonRef}>
                    
                        <img src={more} alt="more"  style={{paddingRight: "10px", paddingTop: "25px", width: "40px"}}/>
                    </button>
                    {isClicked && (
                        <div className="dropdown-menu show" style={{
                            position: "absolute",
                            top: "60px",
                            left: "85px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            width: "10px",
                            maxWidth: "10px",
                            padding: "5px",
                            maxHeight: "100px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <button className="dropdown-item" onClick={handleClickEdit} >
                                Editar
                            </button>
                            <button className="dropdown-item" onClick={handleClickDelete}>
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}