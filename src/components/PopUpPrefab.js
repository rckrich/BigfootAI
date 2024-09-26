import { ElementContextPopUp } from "../context/PopUpContext";
import React, { useContext } from "react";
import { ElementContextThread } from "../context/ThreadContext";


export const PopUpPrefab = ({identifier}) => {

  const { changeValuePopUP } = useContext(ElementContextPopUp);
  const { changeActive, value } = useContext(ElementContextThread);
  const handleInputChange = () => {
    changeValuePopUP("");
  };
  console.log(identifier);


  const handleNewThread =( ) => {
      fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,  
            'Content-Type': 'application/json',
            'OpenAI-Beta' : 'assistants=v2'    
          },
          body: JSON.stringify({
            
          })
        })
          .then(response => response.json())
          .then(data => changeActive(data.id))
          .then(data => console.log(data))
  
          .catch(error => console.error('Error:', error));
        changeValuePopUP("");
  }

  const handleEliminateThread =( ) => {
    fetch(`https://api.openai.com/v1/threads/${value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,  
        'Content-Type': 'application/json',
        'OpenAI-Beta' : 'assistants=v2'    
      },
      body: JSON.stringify({
        
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))

      .catch(error => console.error('Error:', error));
    changeValuePopUP("");
  }

  if(identifier === "new") {
    return (
      <div className="popUpContainer">
          <div className="popUpMessage">
          <h3 style={{ paddingTop: "3%", paddingBottom: "1%" }}>Ingrese título de la conversación</h3>

          <div style={{paddingTop: "0px", paddingBottom: "15px", width: "100%", display: "flex", justifyContent: "center"}}><input
            
            type="text"
            name="text"
            className="input"
          /></div>
          
          <div className="rowContainer" style={{width: "100%" , height: "100%", justifyContent: "space-evenly"}}>
          <button
            className="styleCancelButtonPopUpDesktop"
            onClick={() => {
              handleInputChange();
            }}
          >
            <h3 style={{ color: "white" }}>Cancelar</h3>
          </button>
          <button
            className="styleButtonPopUpDesktop"
            onClick={() => {
              handleNewThread();
            }}
          >
            <h3 style={{ color: "white" }}>Aceptar</h3>
          </button>
          </div>
        </div>
      </div>
    );
  }

  if(identifier === "eliminate") {
    return (
      <div className="popUpContainer">
          <div className="popUpMessage">
          <h3 style={{ paddingTop: "3%", paddingBottom: "1%", textAlign: "center" }}>¿Está seguro que desea eliminar la conversación </h3>

          
          <div className="rowContainer" style={{width: "100%" , height: "100%", justifyContent: "space-evenly"}}>
          <button
            className="styleButtonPopUpDesktop"
            onClick={() => {
              handleInputChange();
            }}
          >
            <h3 style={{ color: "white" }}>Cancelar</h3>
          </button>
          <button
            className="styleCancelButtonPopUpDesktop"
            onClick={() => {
              handleEliminateThread();
            }}
          >
            <h3 style={{ color: "white" }}>Eliminar</h3>
          </button>
          </div>
        </div>
      </div>
    );
  }

  if(identifier=== "edit"){
    return (
      <div className="popUpContainer">
          <div className="popUpMessage">
          <h3 style={{ paddingTop: "3%", paddingBottom: "1%" }}>Ingrese nuevo título de la conversación</h3>

          <div style={{paddingTop: "0px", paddingBottom: "15px", width: "100%", display: "flex", justifyContent: "center"}}><input
            
            type="text"
            name="text"
            className="input"
          /></div>
          
          <div className="rowContainer" style={{width: "100%" , height: "100%", justifyContent: "space-evenly"}}>
          <button
            className="styleCancelButtonPopUpDesktop"
            onClick={() => {
              handleInputChange();
            }}
          >
            <h3 style={{ color: "white" }}>Cancelar</h3>
          </button>
          <button
            className="styleButtonPopUpDesktop"
            onClick={() => {
              handleInputChange();
            }}
          >
            <h3 style={{ color: "white" }}>Aceptar</h3>
          </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <></>
  )
};
