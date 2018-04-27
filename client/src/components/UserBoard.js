import React, { Component } from 'react';

class UserBoard extends Component {
  render() {
    console.log(this.props.match.params.user);

    return <div>UserBoard</div>;
  }
}

export default UserBoard;
