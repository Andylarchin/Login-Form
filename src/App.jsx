import React, { useState } from "react";
import "./App.css";
import Body from "./Components/Login_Body/Login_Body";
import Reset_User from "./Components/Reset_User/Reset_User";
import { Routes, Route } from "react-router-dom";
import { OldUserContext } from "./Components/oldUserContext/oldUserContext";

function App() {
  const [oldData, setOldData] = useState([]);

  return (
    <div className="App">
      <OldUserContext.Provider value={{ oldData, setOldData }}>
        <Routes>
          <Route exact path="/" element={<Body />}></Route>
          <Route path="/reset" element={<Reset_User />}></Route>
        </Routes>
      </OldUserContext.Provider>
    </div>
  );
}

export default App;
