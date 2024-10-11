import { ChatHistoryPrefab } from "./ChatHistoryPrefab"
import { ChatHistoryPlaceholder } from "./ChatHistoryPlaceHolder"
import logout from "../img/salir.png";
import account from "../img/account.svg";
import sidebar from "../img/sidebar.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext} from "react";
import{ CreateChat} from "./CreateChat";
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from "../pages/AuthContext";
import { ElementContextThread } from "../context/ThreadContext";
export const Sidebar = () => {
  const {Active, value} = useContext(ElementContextThread);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const gotToNewPage= async ()=>{
    const response = fetch("http://165.22.178.7/api/v1/logout",{
      method: "POST",
      headers: {
          'Authorization': `Bearer ${userData.access_token}`,
      },
    })
      .then(navigate("/"))
      .catch(error => console.error('Error:', error))
  }
  const handlethreadsUserByUser= async () => {
    fetch(`http://165.22.178.7/api/v1/threads/${limit}/${offset}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.access_token}`
      },
    })
    .then(response => {
      if (!response.ok) {
      throw new Error(`Error del servidor`);
    }
    return response.json();
    })
    .then(data => {
        console.log(data);
        setData(data);
    })
    .then()
    .catch(error => console.error('Error:', error));
  }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
          {children}
          <img src={account} alt="sidebar" style={{width: "40px"}}></img>
        </a>
      ));
    const[isOpen, setIsOpen] = useState(true)
    const[isDisplay, setIsDisplay] = useState(false)
    const botonRef = useRef(null);
    const navigate = useNavigate()
    const { userData } = useContext(AuthContext);
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
      useEffect(() => {
        handlethreadsUserByUser();
        console.log(data);
      }, [Active, value])
    return (
        <>
        {isOpen ?
            <div className="ColumnContainer" style={{justifyContent: "flex-start", height: "100vh"}}>
                <div className="rowContainer" style={{ width: "100%", paddingTop: "10px",alignItems: "center", justifyContent: "space-evenly"}}>
                    <Dropdown className= "imgClear">
                    <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => gotToNewPage()}><img src={logout} style={{color: "black", paddingRight: "20px", width: "35px", paddingBottom: "2.2%"}}></img>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <h2 className="TitleText" style={{ textAlign: "center", fontSize: "22px", paddingTop: "2.2%"}}>{userData.user.name}</h2>
                    <img src= {sidebar} alt="sidebar" style={{width: "30px"}}  onClick={()=> setIsOpen(!isOpen)}></img>
                </div>
                <div className="sidebarContainer">


                  {
                    data.thread_bundles !== undefined && data.thread_bundles !== null && data.thread_bundles !== 0 ? <ChatHistoryPlaceholder></ChatHistoryPlaceholder> : data.thread_bundles.map(item => (
                      <ChatHistoryPrefab></ChatHistoryPrefab>
                    ))
                  }

                </div>
                <CreateChat></CreateChat>
            </div>

         : <div className="sidebarClosed">

            <div className="rowContainer" style={{ paddingTop: "30px"}}>

             <img src= {sidebar} alt="sidebar"style={{ width: "30px"}} onClick={()=> setIsOpen(!isOpen)}></img>
            </div>

         </div>
        }
        </>
    )
}