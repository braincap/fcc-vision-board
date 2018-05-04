import React, { Component } from 'react';
import NewCard from './NewCard';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './Card';
import Masonry from 'react-masonry-component';


const masonryOptions = {
  transitionDuration: 10
};

class Content extends Component {
  componentWillMount() {
    this.props.getCards();
  }

  render() {
    const userIDBoard = this.props.match.params.user;
    return (
      <section className="content">
        
        <Masonry className={'my-gallery-class'} options={masonryOptions}>
          {this.props.auth && !userIDBoard ? <NewCard /> : ''}
          {this.props.cards
            .filter(card => !userIDBoard || card._user === userIDBoard)
            .map(card => (
              <Card
                key={card._id}
                {...card}
                currentUserID={this.props.auth ? this.props.auth._id : ''}
              />
            ))}
        </Masonry>
      </section>
    );
  }
}

function mapStateToProps({ auth, cards }) {
  return { auth, cards };
}

export default connect(mapStateToProps, actions)(Content);
