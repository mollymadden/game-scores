import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ScoresList from "./components/scores-list.component";
import EditScore from "./components/edit-score.component";
import CreateScore from "./components/create-score.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ScoresList} />
        <Route path="/edit/:id" component={EditScore} />
        <Route path="/create" component={CreateScore} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;