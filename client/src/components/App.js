import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Message from "../pages/Message";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Create from "../pages/Create";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";

function App() {

  const routes = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/messages",
      element: <Message />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/signup",
      element: <Signup />
    }

  ]

  const router = createBrowserRouter(routes)
  
  return(
    <>
    <header>Schmooze</header>
    <RouterProvider router={router}/>
    {/* <NavBar /> */}
    
    </>
  )
}

export default App;
