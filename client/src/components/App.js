// App.js

import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from './Signup/Signup';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Create from '../pages/Create';
import ChatBox from './ChatBox/ChatBox';


function App()  {
  return (
    <Router>
      <>
        <header>Schmooze</header>
        <NavBar />
        <Router>
          <Route path="/home" component={Home} />
          <Route path="/message" component={Message} />
          <Route path="/create" component={Create} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat" component={ChatBox} />
          <Route path="/" exact component={Home} />
        </Router>
      </>
    </Router>
  );
}

export default App;
