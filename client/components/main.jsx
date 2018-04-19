import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gists: [],
    }
  }

  search(event) {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.username}/gists`)
      .then(response => {
        this.setState({
          gists: response.data,
        })
      })
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <form onSubmit={event => this.search(event)}>
          <label>Enter Github Username</label>
          <input name="username" type="text" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
          <button>Search</button>
          {this.state.gists.map(gist => <p>{Object.keys(gist.files)[0]}</p>)}
        </form>
      </div>
    )
  }
}