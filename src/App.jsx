import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Body from './Components/Login_Body';
import Reset from './Components/Reset_User';
import { OldUserContext } from './Components/oldUserContext/oldUserContext';

function App() {
  const [oldData, setOldData] = useState([]);

  return (
    <div className="App">
      <OldUserContext.Provider value={{ oldData, setOldData }}>
        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </OldUserContext.Provider>
    </div>
  );
}

export default App;
