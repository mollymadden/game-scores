import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Score = props => (
  <tr>
    <td>{props.score.username}</td>
    <td>{props.score.game}</td>
    <td>{props.score.score}</td>
    <td>{props.score.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.score._id}>edit</Link> | <a href="#" onClick={() => { props.deleteScore(props.score._id) }}>delete</a>
    </td>
  </tr>
)

export default class ScoresList extends Component {
  constructor(props) {
    super(props);

    this.deleteScore = this.deleteScore.bind(this)

    this.state = {scores: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/scores/')
      .then(response => {
        this.setState({ scores: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteScore(id) {
    axios.delete('http://localhost:5000/scores/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      scores: this.state.scores.filter(el => el._id !== id)
    })
  }

  scoreList() {
    return this.state.scores.map(currentscore => {
      return <Score score={currentscore} deleteScore={this.deleteScore} key={currentscore._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Scores</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Game</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.scoreList() }
          </tbody>
        </table>
      </div>
    )
  }
}