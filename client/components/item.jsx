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
        {this.state.forks.length ? (
          <div style={{marginTop: 15}}>
            <span className="text-bold">Recent Forks</span>
            <ul className="list-style-none" style={{marginTop: 10}}>
              {this.state.forks.map(fork => (
                <li style={{display: 'inline-block'}}>
                  <img className="avatar avatar-small" width="32" height="32" src={fork.owner.avatar_url}/>
                  &nbsp;
                  <a target="_blank" href={fork.html_url} style={{color: '#424242'}}>{fork.owner.login}</a>
                  &nbsp;&nbsp;
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </li>
    )
  }
}