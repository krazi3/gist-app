import React, { Component } from 'react';
import axios from 'axios';
import { getPageLinks } from '../utils';

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forks: [],
    }
  }

  componentDidMount() {
    let { gist } = this.props;
    axios.get(gist.forks_url)
      .then(response => {
        if(response.headers && response.headers.link) {
          let links = getPageLinks(response.headers);
          return axios.get(links.last)
        }
        return response;
      })
      .then(response => {
        if(response.data && response.data.length) {
          this.setState({
            forks: response.data.reverse().slice(0, 3)
          })
        }
      })
  }

  renderTags(files) {
    let tags = {};
    Object.keys(files).forEach(name => {
      if(Object.keys(tags).length == 3) {
        return;
      }
      tags[files[name].language] = '';
    })
    return Object.keys(tags).map(tag => <span className="badge badge-secondary">{tag}</span>)
  }

  render() {
    let { gist } = this.props;
    return (
      <div>
        <p>{Object.keys(gist.files)[0]} {this.renderTags(gist.files)}</p>
        <ul>
          {this.state.forks.map(fork => <li>{fork.owner.login}</li>)}
        </ul>
      </div>
    )
  }
}