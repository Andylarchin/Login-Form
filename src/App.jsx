import React, { useState, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LuigiClient from '@luigi-project/client';
import Body from './Components/Login_Body';
import Reset from './Components/Reset_User';
import { OldUserContext } from './Components/oldUserContext/oldUserContext';


function App() {
  const [oldData, setOldData] = useState([]);

  const datas = useMemo(() => ({ oldData, setOldData }), []);

  return (
    <div className="App">
      <OldUserContext.Provider value={datas}>
        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </OldUserContext.Provider>
    </div>
  );
}

export default App;
