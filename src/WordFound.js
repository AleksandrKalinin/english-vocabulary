import React, { Component, Fragment } from 'react';
import {Button} from 'semantic-ui-react'


import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class WordFound extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  } 


  closeSearchModal = () => {
    this.props.actions.toggleSearchModal(false);
  }


  render() {

    return (     
      <div className = "word-modal__overlay">
        <div className="word-modal">
          <div className="word-modal__image">
            <img src="word-modal__picture" src = {this.props.word.image}/>
          </div>
          <div className="word-modal__description">
            <p className="word-modal__title">{this.props.word.name} - {this.props.word.translation}</p>
            <p className="word-modal__meaning">{this.props.word.definition}</p>   
            <Button primary onClick={this.closeSearchModal}>Закрыть</Button>              
          </div>
        </div>              
      </div>        
    );
  }
}

function mapStateToProps(state){
  return { store: state.reducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordFound);