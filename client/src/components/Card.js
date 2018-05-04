import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import vision from '../assets/vision_new_card.jpg';

class Card extends Component {
  state = {
    liked: false,
    cardImage: ''
  };

  componentDidMount() {
    this.setState({
      liked: this.props.likedBy.includes(this.props.currentUserID),
      cardImage: this.props.inputImageURL
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      liked: nextProps.likedBy.includes(nextProps.currentUserID),
      cardImage: nextProps.inputImageURL
    });
  }

  handleHeartClick = () => {
    if (this.props._user === this.props.currentUserID) {
      return;
    }
    this.state.liked
      ? this.props.unlikeCard(this.props._id, this.props.currentUserID)
      : this.props.likeCard(this.props._id, this.props.currentUserID);
  };

  handleDeleteClick = () => {
    this.props.deleteCard(this.props._id);
  };

  render() {
    return (
      <div
        className={`card ${
          this.props._user === this.props.currentUserID ? 'self' : ''
        }`}
      >
        <img
          className="card-image"
          src={this.state.cardImage}
          alt="Vision Card"
          onError={e => {
            this.setState({ cardImage: vision });
          }}
        />
        <div className="card-info">
          <div className="card-title-bar">
            <h3 className="card-title">{this.props.title}</h3>
            {this.props._user === this.props.currentUserID ? (
              <h5
                title="Delete"
                className="delete"
                onClick={this.handleDeleteClick}
              >
                x
              </h5>
            ) : (
              ''
            )}
          </div>
          <div className="card-stats">
            <h4>
              by <Link to={`/${this.props._user}`}>{this.props.name}</Link>
            </h4>
            <h3
              className={`heart ${this.state.liked ? 'liked' : ''}`}
              onClick={this.handleHeartClick}
            >
              {this.state.liked ? '❤' : '♡'}
            </h3>
            <h4 className="count">{this.props.likedBy.length}</h4>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, actions)(Card);
