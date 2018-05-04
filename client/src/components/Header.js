import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import normalButton from '../assets/btn_google_signin_light_normal_web.png';
import focusButton from '../assets/btn_google_signin_light_focus_web.png';
import pressedButton from '../assets/btn_google_signin_light_pressed_web.png';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = { buttonState: normalButton };

  renderHeaderItems() {
    switch (this.props.auth) {
      case null:
        return [];
      case false:
        return [
          /*  <a href="/auth/google" className="login">
            <img
              src={this.state.buttonState}
              alt="Login with Google"
              onMouseOver={() => this.setState({ buttonState: focusButton })}
              onMouseOut={() => this.setState({ buttonState: normalButton })}
              onMouseDown={() => this.setState({ buttonState: pressedButton })}
            />
          </a> */
          <a className="button" href="/auth/google">
            <span>Login with Google</span>
          </a>
        ];
      default:
        return [
          <a key="0" href="/api/logout" className="logout">
            <h3>Logout</h3>
          </a>
        ];
    }
  }

  render() {
    return (
      <nav className="header">
        <div className="left-menu">
          <h1 className="logo">
            <Link to="/">VisionBoard</Link>
          </h1>
        </div>
        <div className="right-menu">{this.renderHeaderItems()}</div>
      </nav>
    );
  }
}

function mapStateToProps({ auth, cards }) {
  return { auth, cards };
}

export default connect(mapStateToProps, actions)(Header);
