import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Conversation from "../pages/Conversation";
import {createBrowserRouter, RouterProvider, Switch, Route, useParams} from "react-router-dom"
import Create from "../pages/Create";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import ListOfChats from "../pages/ListOfChats";

const URL = "/api"

const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const params = useParams()

  // CHECK SESSION //
  useEffect(() => {
    fetch(URL + '/check_session')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(userData => {
          setCurrentUser(userData)
          
        })
      }
    })
  }, [])

  console.log(currentUser)
  


  // SIGNUP //
  async function attemptSignup(userInfo) {
    const res = await fetch(URL + '/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  // LOGIN //
  async function attemptLogin(userInfo) {
    const res = await fetch(URL + '/login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  // LOGOUT //
  function logout() {
    setCurrentUser(null)
    fetch(URL + '/logout', { method: "DELETE" })
  }

  const routes = [
    {
      path: "/",
      element: <Home currentUser={currentUser} />
    },
    {
      path: `/conversations/:id`,
      element: <Conversation currentUser={currentUser}/>
    },
    {
      path: "/listOfChats",
      element: <ListOfChats currentUser={currentUser} URL={URL}/>
    },
    {
      path: "/create",
      element: <Create currentUser={currentUser} />
    },
    {
      path: "/login",
      element: <Login attemptLogin={attemptLogin} currentUser={currentUser}/>
    },
    {
      path: "/logout",
      element: <Logout logout={logout} currentUser={currentUser}/>
    },
    {
      path: "/signup",
      element: <Signup attemptSignup={attemptSignup} currentUser={currentUser} />
    }

  ]

  const router = createBrowserRouter(routes)
  
  return(
    <>
    <header style = {{background : "#ffffff", color :"#ffffff"}}>
    <img class="logo" src="/logo.png" alt="Schmooze"/>
    </header>
    <RouterProvider router={router}/>
    {/* <NavBar /> */}
    
    </>
  )
}

export default App;
