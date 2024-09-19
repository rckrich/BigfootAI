import "./login.css"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home';
import { LogIn } from './pages/LogIn';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="Appcontainer">
      <Router>
        <Routes>
          <Route path= "" element={<LogIn></LogIn>}/>
          <Route path= "home" element={<Home></Home>}/>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
