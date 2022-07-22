import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Rightwrong extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}


  componentDidMount() {
    this.setStateOnStart();
  }

   setStateOnStart = () => {
      this.setState({
        words: [],
        negativeWords: [],
        positiveWords: [],
        id: 0,
        isCardVisible: false,
        isImageVisible: false,
        isButtonVisible: true,
        isTranslationVisible: false,
        showNavButtons: true,
        showContinueButton: false,
        isFinalVisible: false         
      }, () => this.initialLoad())
   } 

   initialLoad = () => {
      var id = this.state.id;
      axios.get('/working.json')
        .then(res => {
          const words = res.data;
          let result = [];
 
          for (var i = 0; i < 3; i++) {
            let item = [];
            while(item.length < 5) {
              var el = words[Math.floor(Math.random() * words.length)];
              if (item.indexOf(el) === -1) {
                item.push(el)
              };                
            }
            result.push(item);
          }  

          const currentWord = result[0][Math.floor(Math.random() * result[0].length)];
          console.log(result);               
          this.setState({ 
            words, 
            result,
            currentWord });
        })
   }


    renderComponent = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    checkResponse = (response) => {
      if (response) {
        let positiveWords = this.state.positiveWords.slice();        
        positiveWords.push(this.state.currentWord); 
        this.setState({ positiveWords })       
      } else {
          let negativeWords = this.state.negativeWords.slice();          
          negativeWords.push(this.state.currentWord);
          this.setState({ negativeWords })          
      }
      this.setState({
        isTranslationVisible: true,
        showNavButtons: false,
        showContinueButton: true,
        isImageVisible: true
      })      
    }

    continueTraining = () =>{
      let id =this.state.id;
      id = id + 1;
      const result = this.state.result;
      if(id < this.state.result.length){
        const currentWord =  result[id][Math.floor(Math.random() * result[0].length)];     
        this.setState({
          id,
          currentWord, 
          isImageVisible: false,
          isTranslationVisible: false,
          showNavButtons: true,
          showContinueButton: false        
        })

      }
      else {
        let words = this.state.positiveWords.slice();
        let trueOrFalseWords = this.props.store.trueOrFalseWords.slice();
        for (var i = 0; i < words.length; i++) {
          if (!(trueOrFalseWords.find(el => el.id === words[i].id))) {
            words[i]["learnedDate"] = new Date();
            this.props.actions.updateTrueOrFalse(words[i])
          }
        } 
        this.setState({
            isFinalVisible: true,
            isTranslationVisible: false,
            showNavButtons: false,
            showContinueButton: false, 
            isCardVisible: false,
            isButtonVisible: false
        })                
      }
    }

   voiceWord = () =>{
      var newWord = this.state.currentName;
      speech.say(newWord);
   }   

  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isButtonVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
            <div className="training-wrapper-image">
              <Image src='training/memory.png' />
            </div>  
            <Card.Content>
              <Card.Header>Верно-неверно</Card.Header>
              <Card.Description>
                <Button primary onClick={this.renderComponent}>Начать</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       <Card.Group itemsPerRow={1} className="card-header-wrapper" >
           <Card className="card-training"  >
              <Card.Content>
                <Card.Header className="rightwrong-timer"> 
                </Card.Header>
                <Card.Header className="rightwrong-header">{this.state.currentWord.name} 
                </Card.Header>                
                <Card.Header>{this.state.currentWord.translation} 
                </Card.Header>
                <div className="rightwrong-image-wrapper">
                {this.state.isImageVisible ?
                  <Image src={this.state.currentWord.image} className="rightwrong-image"></Image> : null               
                }
                </div>
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="card-buttons-wrapper">
                {this.state.showNavButtons ?
                <Fragment>
                  <Button onClick={this.checkResponse.bind(this, false)} className="red false-button" primary>Неверно</Button>
                  <Button onClick={this.checkResponse.bind(this, true)} className="green true-button" primary>Верно</Button>
                </Fragment>:null
                }  
                {this.state.showContinueButton ?
                  <Button onClick={this.continueTraining} primary>Продолжить</Button>:null
                }
                </Button.Group>
              </Card.Content>
            </Card>          
      </Card.Group> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>Результаты</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  {(this.state.negativeWords.length !== 0 ) ?
                    <div className="answers-wrapper">
                      <List className="audio-list">
                      <h2>Верные ответы</h2>
                      {this.state.positiveWords.map((item, index) => 
                          <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
                        )}
                     </List>
                      <List className="audio-list">
                      <h2>Неверные ответы</h2>
                      {this.state.negativeWords.map((item, index) => 
                          <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
                        )}
                     </List>
                   </div> : 
                   <Message>
                      <Message.Header>Поздравляем!</Message.Header>
                      <p>
                        Все задания выполнены правильно
                      </p>
                   </Message> 
                  }

                  </Card.Description>
                  <Card.Description className="results-wrapper">
                    <div className="positive-results-wrapper"> 
                      <div className="positive-results">
                        {this.state.positiveWords.length}
                      </div>
                      <Label>Верно</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {this.state.result.length - this.state.positiveWords.length}
                      </div> 
                      <Label>Неверно</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                    <Button primary onClick={this.setStateOnStart}>Продолжить</Button>
                    <Button primary><Link to="/training" className="training-link">Вернуться</Link></Button>
                  </Button.Group>
                </Card.Content>
              </Card>          
        </Card.Group>         
           : null
        }
        </div>
        <footer></footer>
    </Fragment>
	);
  }
}

function mapStateToProps(state) {
  return {store: state.reducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Rightwrong);