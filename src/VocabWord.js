import React, { Component, Fragment } from 'react';
import { Button, Icon, Image } from 'semantic-ui-react'
import { List} from 'semantic-ui-react'
import './style.css'
import ModalWord from './ModalWord';
import speech from 'speech-synth';

import {bindActionCreators} from 'redux';
import actions from './actions/index';

import {connect} from 'react-redux';

class VocabWord extends Component {


  delete(id){
    this.props.delete(id);
  }


   voiceWord = (word) =>{
      speech.say(word);
   }

   openWord = (word) => {
    console.log(word);
    this.props.actions.selectVocabWord(word);
    this.props.actions.toggleVocabModal(true);
   }

  render() {
    var descriptionVisible = false;
    return (
      <List.Item >
        <Fragment>
          <Image avatar src={this.props.image} />
          <List.Content className="word-content" onClick={this.openWord.bind(this, this.props.word)}>
            <List.Header as='a'>{this.props.name} - {this.props.transcription} - {this.props.translation}</List.Header>
            {descriptionVisible ?         
              <List.Description className="word-meaning">
                  <b>{this.props.meaning}</b>
              </List.Description> :null
            }
          </List.Content>
        </Fragment>  
      <List.Content>
            <Button.Group>
              <span onClick={this.voiceWord.bind(this, this.props.name)} className="word-icon-wrapper" title="Озвучить">
                 <Icon name = 'right microphone'/>
              </span>
              <span onClick={this.delete.bind(this, this.props.id)} className="word-icon-wrapper" title="Удалить">
                  <Icon name='right trash alternate outline' />
              </span>
            </Button.Group>              
      </List.Content>
    </List.Item>
    );
  }
}

function mapStateToProps(state){
  return {store: state.reducer};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(VocabWord);