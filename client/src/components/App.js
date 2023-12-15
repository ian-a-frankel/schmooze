import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "../pages/Home";

function App() {

  
  
  return(
    <>
    <header>Schmooze</header>
    <NavBar />
    <Home />
    </>
  )
}

export default App;
