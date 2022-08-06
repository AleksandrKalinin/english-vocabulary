import React, { Component } from 'react';
import { Icon, Image, Modal,Header } from 'semantic-ui-react'
import { List} from 'semantic-ui-react'
import './style.css'

class ModalWord extends Component {

  render() {
    return (
        <Modal className="modal-word" trigger = {
          <List.Content >
            <span className="word-icon-wrapper">
               <Icon name='right eye' />
            </span>
          </List.Content>
            } closeIcon>
            <Modal.Content image>
              <Image wrapped size='medium' src={this.props.image} />
              <Modal.Description className="modal-word-description">
                <Header><h4><span onClick={this.props.voiceWordFromModal.bind(this)} ></span>{this.props.name} - {this.props.translation}                   <span>
                    <Icon name = 'right microphone'/>
                  </span> </h4></Header>
                <div className="modal-icon-wrapper-delete">
                  <span>
                    <Icon name = 'right trash alternate outline'/>
                  </span>
                </div>
              </Modal.Description>
            </Modal.Content>
        </Modal>
  );
  }
}

export default ModalWord;