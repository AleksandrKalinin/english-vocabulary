import React, { Component, Fragment } from 'react';
import { Button, Icon, Image } from 'semantic-ui-react'
import { List} from 'semantic-ui-react'
import './style.css'
import ModalWord from './ModalWord';


class VocabWord extends Component {

  newFunction(){
    this.props.newFunction();
  }

  delete(id){
       this.props.delete(id);
   }

   voiceWord(el){
      this.props.voiceWord(el);
   }

   voiceWordFromModal(el){
      this.props.voiceWordFromModal(el);
   }   

  showNewModal = (id) => {
    this.props.showNewModal(id)
  }

  render() {
    var descriptionVisible = false;
    return (
      <List.Item>
        <Fragment>
          <Image avatar src={this.props.image} />
          <List.Content className="word-content">
            <List.Header onClick={this.showNewModal.bind(this, this.props.id)} as='a'>{this.props.name} - {this.props.transcription} - {this.props.translation}</List.Header>
            {descriptionVisible ?         
              <List.Description className="word-meaning">
                  <b>{this.props.meaning}</b>
              </List.Description> :null
            }
        </List.Content>
      </Fragment>  
        <List.Content>
              <ModalWord 
                      key={this.props.id} 
                      name={this.props.name} 
                      translation={this.props.translation} 
                      meaning={this.props.meaning}
                      image={this.props.image}
                      voiceWord={this.props.voiceWord}
                      date = { new Date(this.props.date)}
                      voiceWordFromModal={this.props.voiceWordFromModal} >
              </ModalWord>        
              <Button.Group>
                <span onClick={this.voiceWord.bind(this)} className="word-icon-wrapper">
                   <Icon name = 'right microphone'/>
                </span>
                <span onClick={this.delete.bind(this)} className="word-icon-wrapper">
                    <Icon name='right trash alternate outline' />
                </span>
              </Button.Group>              
        </List.Content>
      </List.Item>
    );
  }
}

export default VocabWord;