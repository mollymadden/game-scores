import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CA Game Scores Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Leaderboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add a New High Score</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Add New Player</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}