import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SignInPage from './components/SignIn/signin';


import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./components/Home/home";
import Dashboard from './components/Dashboard/dashboard';
import Resources from './components/Resources/page';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route exact path="/" element={<App customComponent={Home}/>}/>
          <Route exact path="/dashboard" element={<App customComponent={Dashboard}/>}/>
          <Route exact path="/resources" element={<App customComponent={Resources}/>}/>
          <Route exact path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
