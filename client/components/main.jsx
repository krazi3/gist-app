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
        <h1 className="h1" style={{marginTop: 50}}>Welcome</h1>
        <p>A tiny app to search for Gists on Github</p>
        <form onSubmit={event => this.search(event, '')}>
          <dl className="form-group">
            <dt>
              <label>Enter Github Username</label>
            </dt>
            <dd>
              <input name="username" type="text" className="form-control" value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
              <button className="btn">Search</button>
            </dd>
          </dl>
        </form>
        {this.state.gists.length ? (
          <div className="Box" style={{marginBottom: 20}}>
            <ul>
              {this.state.gists.map(gist => <Item gist={gist}/>)}
            </ul>
          </div>
        ) : null}
        {Object.keys(this.state.navigation).length ? (
          <div className="text-center" style={{marginBottom: 20}}>
            <button type="button" className="btn btn-outline" onClick={event => this.search(event, this.state.navigation.prev)} disabled={!this.state.navigation.prev}>Prev</button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-outline" onClick={event => this.search(event, this.state.navigation.next)} disabled={!this.state.navigation.next}>Next</button>
          </div>
        ) : null}
      </div>
    )
  }
}