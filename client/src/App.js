import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions';
import './App.css';

import Header from './components/Header';
import Content from './components/Content';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Route path="/" component={Header} />
          <Route exact path="/" component={Content} />
          <Route exact path="/:user" component={Content} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth, cards }) {
  return { auth, cards };
}

export default connect(mapStateToProps, actions)(App);
