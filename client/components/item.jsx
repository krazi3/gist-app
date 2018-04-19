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
    return Object.keys(tags).map(tag => <React.Fragment><span className="Label Label--gray-darker">{tag}</span>&nbsp;&nbsp;</React.Fragment>)
  }

  render() {
    let { gist } = this.props;
    return (
      <li className="Box-row">
        <a target="_blank" href={gist.html_url}>
          <strong>{Object.keys(gist.files)[0]}</strong>
        </a>
        &nbsp;&nbsp;
        {this.renderTags(gist.files)}
        <ul>
          {this.state.forks.map(fork => <li>{fork.owner.login}</li>)}
        </ul>
      </li>
    )
  }
}