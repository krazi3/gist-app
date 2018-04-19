import React, { Component } from 'react';
import axios from 'axios';
import Item from './item.jsx';
import { getPageLinks } from '../utils';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gists: [],
      navigation: {},
    }
  }

  search(event, url) {
    event.preventDefault();
    axios.get(url || `https://api.github.com/users/${this.state.username}/gists`)
      .then(response => {
        this.setState({
          gists: response.data,
          navigation: getPageLinks(response.headers),
        })
      })
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <form onSubmit={event => this.search(event, '')}>
          <label>Enter Github Username</label>
          <input name="username" type="text" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
          <button>Search</button>
          {this.state.gists.map(gist => <Item gist={gist}/>)}
          {this.state.navigation.prev ? <button type="button" onClick={event => this.search(event, this.state.navigation.prev)}>Prev</button> : null}
          {this.state.navigation.next ? <button type="button" onClick={event => this.search(event, this.state.navigation.next)}>Next</button> : null}
        </form>
      </div>
    )
  }
}