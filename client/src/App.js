import React from "react";
import { BrowserRouter as Router } from "react-router-dom"

import 'semantic-ui-css/semantic.min.css'

import "./ApplicationStyle.css"

import { UserProvider } from "./AuthenticateUser/UserState"

import AuthenticateUser from "./AuthenticateUser"



function App() {


  return (
    <Router>
      <UserProvider>
        <AuthenticateUser/>
      </UserProvider>
    </Router>
  );
}

export default App;
