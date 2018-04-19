import React, { Component } from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props)
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
      <p>{Object.keys(gist.files)[0]} {this.renderTags(gist.files)}</p>
    )
  }
}