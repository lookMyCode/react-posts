import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import routes from './AppRouting';
import { Navbar } from './shared/components/navbar/Navbar';
import { AuthContext } from './shared/contexts/AuthContext';
import { AuthHttpService } from './shared/http/AuthHttpService';
import DB from './shared/services/DB';



function App() {
  const [isAuth, setIsAuth] = useState(!!AuthHttpService.currentUser?.id);

  useEffect(() => {
    init();
    console.log()
  }, []);

  function init() {
    DB.init();
  }

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routes.map(route => {
            return <Route 
              key={route.path}
              path={route.path} 
              element={<route.component />} 
            />
          })}
          <Route
          path="*"
          element={<Navigate to="/404" replace />}
      />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
