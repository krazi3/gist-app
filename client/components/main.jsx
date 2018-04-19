import React, { Component } from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <form>
          <label>Enter Github Username</label>
          <input name="username" type="text" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}