import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateScore extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGame = this.onChangeGame.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      game: '',
      score: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGame(e) {
    this.setState({
      game: e.target.value
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const score = {
      username: this.state.username,
      game: this.state.game,
      score: this.state.score,
      date: this.state.date,
    };
  
    console.log(score);

    axios.post('http://localhost:5000/scores/add', score)
    .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Add a New High Score</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
            <label>Game Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.game}
                onChange={this.onChangeGame}
                />
          </div>
          <div className="form-group"> 
            <label>First Place: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>

          <div className="form-group">
            <label>First Place Score: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.score}
                onChange={this.onChangeScore}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Add Score" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}