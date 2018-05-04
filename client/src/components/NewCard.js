import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import vision from '../assets/vision_new_card.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class NewCard extends Component {
  state = {
    title: '',
    inputImageURL: '',
    displayImage: vision
  };

  errorNotify = message => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, inputImageURL, displayImage } = this.state;
    if (title.length <= 0) {
      this.errorNotify('Please enter a title');
      return;
    }
    if (displayImage === vision || !inputImageURL.length) {
      this.errorNotify('Please enter valid image URL');
      return;
    }

    this.props.publishCard(title, inputImageURL, this.props.auth.name);
    this.setState({ title: '', inputImageURL: '', displayImage: vision });
  };

  render() {
    return (
      <div className={`new card`}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
        />
        <img
          className="vision-image"
          src={this.state.displayImage}
          alt="New Vision Card"
          onError={e => {
            this.setState({ displayImage: vision });
          }}
        />
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
            placeholder="Title"
          />
          <input
            type="text"
            onChange={e =>
              this.setState({
                inputImageURL: e.target.value,
                displayImage: e.target.value
              })
            }
            value={this.state.inputImageURL}
            placeholder="Image URL"
            onClick={e => e.target.select()}
          />
          <div className="submit-bar">
            <button type="submit" className="publish">
              Publish
            </button>{' '}
            <pre> as {this.props.auth ? this.props.auth.name : ''}</pre>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(NewCard);
