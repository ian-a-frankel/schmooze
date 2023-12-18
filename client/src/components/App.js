import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Message from "../pages/Message";

function App() {

  
  
  return(
    <>
    <header>Schmooze</header>
    <NavBar />
    <Home />
    <Message />
    </>
  )
}

export default App;
