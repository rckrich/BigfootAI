import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ElementProviderPopUp } from "./context/PopUpContext";
import { ElementProviderThread } from "./context/ThreadContext";
import { ElementProviderAccess } from "./context/AccessContext";
import { ElementProviderSidebar } from "./context/SidebarContext";
import { TypingContextProvider } from './context/TypingContext';
import { AuthProvider } from "./pages/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <TypingContextProvider>
      <ElementProviderSidebar>
        <AuthProvider>
          <ElementProviderPopUp>
            <ElementProviderThread>
                <ElementProviderAccess>
                    <App />
                </ElementProviderAccess>
            </ElementProviderThread>
          </ElementProviderPopUp>
        </AuthProvider>
      </ElementProviderSidebar>
    </TypingContextProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
