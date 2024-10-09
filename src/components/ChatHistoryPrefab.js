import more from "../img/more.svg";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { ElementContextPopUp } from "../context/PopUpContext";
import Dropdown from 'react-bootstrap/Dropdown';
export const ChatHistoryPrefab = () => {

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
          {children}
          <img src={more} alt="more"/>
        </a>
      ));
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
                    <Dropdown className= "imgClear" style={{
                        paddingRight: "15px", 
                        paddingTop: "25px", 
                        width: "40px"
                    }}>
                    <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Eliminar</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}