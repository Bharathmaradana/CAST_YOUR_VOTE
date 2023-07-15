import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Rooms from "./Components/Dashboard/Rooms";
import Addrepresent from "./Components/Dashboard/Addrepresent";
import Home from "./Components/LandingPage/Home";
import Timer from "./Components/Timer";
import Timeout_1 from "./Components/Dashboard/Timeout_1";
import MainResults from "./Components/Dashboard/MainResults";
import ProfilePage from "./Components/Dashboard/Profile";
import Analytics from "./Components/Dashboard/Analytics";
import MainDashboard from "./Components/Dashboard/MainDashboard";
import TimerComponent from "./Components/Timer/TimerComponent";

export const store = createContext();
function App() {
  const [token, settoken] = useState(null);
  return (
    <div className="App">
      <store.Provider value={[token, settoken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
           
            <Route path="/Rooms" element={<Rooms />} />
            <Route path="/addrepresent" element={<Addrepresent />} />
            <Route path="/timeout" element={<Timeout_1 />} />
            <Route path="/result" element={<MainResults />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Dashboard" element={<MainDashboard/>}/>
            <Route path="/TimerComponent" element={<TimerComponent/>}/>
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
