import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import Header from "./Components/Header";
import Home from "./Components/Home";




function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        
      </Routes> 
    </div>
  );
}

export default App;
