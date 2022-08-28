import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Input, List, Message, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Audio extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}

  componentDidMount() {
    this.setStateOnStart()
  }

   setStateOnStart = () => {
      this.setState({
        words: [],
        negativeWords: [],
        positiveWords: [],
        id: 0,
        isCardVisible: false,
        isButtonVisible: true,
        isTranslationVisible: false,
        showNavButtons: true,
        showContinueButton: false,
        isFinalVisible: false,
        correctNameVisible: false,
        correctName: null,
        correctNameClass: 'audio-name-green',
        isImageVisible: false,
        isLinkVisible: true,
        isInputVisible: true,
        search: '',
        tempSearch: '',
        metaClass: 'blue',
        nameClass: ''         
      }, () => this.initialLoad())
   }

   initialLoad = () => {
    let id = this.state.id;
      axios.get('./working.json')
        .then(res => {
          const words = res.data;
          let result = [];
          for (var i = 0; i < 3; i++) {
            let item = [];
            while(item.length < 5) {
              let el = words[Math.floor(Math.random() * words.length)];
              if (item.indexOf(el) === -1) {
                item.push(el)
              };                
            }
            result.push(item);
          }
          const currentWord = result[0][Math.floor(Math.random() * result[0].length)];
          this.setState({ 
            words, 
            currentWord,
            result });
        })
   }

    startTraining = () => {
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    updateSearch = (event) => {
      this.setState({
        search: event.target.value.substr(0,20),
        tempSearch: event.target.value.substr(0,20)});
    }  


    positiveResponse = () => {
      let positiveWords = this.state.positiveWords.slice();
      let negativeWords = this.state.negativeWords.slice();
      let currentWord = this.state.currentWord;
      let search = this.state.search;
      if(currentWord.name === search){
        positiveWords.push(currentWord);
        this.setState({
          positiveWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true,
          isImageVisible: true,
          isInputVisible: false,
          isLinkVisible: false,
          search: '',
          nameClass: 'audio-name-green'
        })
      }
      else if(search === '') {
        negativeWords.push(currentWord);        
        this.setState({
          correctNameVisible: true,
          negativeWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true,
          isImageVisible: true,
          isInputVisible: false,
          isLinkVisible: false,
          search: '',
          nameClass: 'audio-name-red',
          tempSearch: 'нет ответа'
        }) 
      }

      else {
        negativeWords.push(currentWord);
        this.setState({
          correctNameVisible: true,
          negativeWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true,
          isImageVisible: true,
          isInputVisible: false,
          isLinkVisible: false,
          search: '',
          nameClass: 'audio-name-red'
        })        
      }
    }

    continueTraining = () => {
      let id = this.state.id;
      id = id + 1;
      const result = this.state.result;
      if (id < result.length) { 
      const currentWord = result[id][Math.floor(Math.random() * result[0].length)];
        this.setState({
          id,
          currentWord,
          isTranslationVisible: false,
          showNavButtons: true,
          showContinueButton: false,
          isImageVisible: false,
          isLinkVisible: true,
          isInputVisible: true,
          search: '',
          correctNameVisible: false        
        })
      } 

      else {
        let words = this.state.positiveWords.slice();
        let exercise = {}, wordsTrained = [];
        exercise.id = uuidv4();
        exercise.date = new Date();
        exercise.score = this.state.positiveWords.length;
        for (var i = 0; i < words.length; i++) {
          wordsTrained.push(words[i].id)
        }
        exercise.wordsTrained = wordsTrained;
        this.props.actions.updateAudioWords(exercise);   
        this.props.actions.updateExerciseComplete(1);
        this.props.actions.updateTotalScore(exercise.score);
        this.setState({
          isFinalVisible: true,
          isTranslationVisible: false,
          showNavButtons: false,
          showContinueButton: false, 
          isCardVisible: false,
          isButtonVisible: false,
          isImageVisible: false,
          isLinkVisible: false,
          isInputVisible: false,
          correctNameVisible: false,
          search: ''
        })
      }
    }

  voiceWord = () =>{
    speech.say(this.state.currentWord.name);
  }  

  showImage = () => {
    this.setState({
      isImageVisible: true,
      isLinkVisible: false
    })
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
              <Image src='../training/audio.jpg' />
            </div>  
              <Card.Content>
                <Card.Header>Аудирование</Card.Header>
                <Card.Description>
                  <Button primary onClick={this.startTraining} >Начать тренировку</Button>
                </Card.Description>
              </Card.Content>
            </Card>          
          </Card.Group>:
          null
        }
         {this.state.isCardVisible ?
         <Card.Group itemsPerRow={1} className="audio-header-wrapper" >
             <Card className="audio-training"  >
                <Card.Content>
                  <Card.Header className="audio-header">
                    <Button onClick={this.voiceWord} primary className="audio-button"><Icon size="big" name="microphone"></Icon></Button>
                    {this.state.isInputVisible ?
                      <Input placeholder="Введите прослушанное слово" id="audo-input" onChange={this.updateSearch}/>:null

                    } 
                  </Card.Header>
                  {this.state.isTranslationVisible ? 
                    <Fragment>
                    {this.state.correctNameVisible ? <Card.Meta className={this.state.correctNameClass}>{this.state.currentWord.name}</Card.Meta>: null }
                      <Card.Meta className={this.state.nameClass}>{this.state.tempSearch}</Card.Meta>
                      <Card.Meta className={this.state.metaClass}>{this.state.currentWord.translation}</Card.Meta>
                      <Card.Description className="audio-description">{}</Card.Description>                  
                    </Fragment>:null
                  }
                </Card.Content>
                <Card.Content extra>
                <div className="audio-image-outer-wrapper">
                  {this.state.isImageVisible ?
                   <div className="audio-image-wrapper">
                     <Image src={this.state.currentWord.image} />
                   </div> :null
                 }
                 {this.state.isLinkVisible ?
                   <div className="audio-image-text">
                       <a onClick={this.showImage}>Show hint</a>
                   </div> : null
                  }                 
                </div>
                  <Button.Group className="audio-buttons-wrapper">
                  {this.state.showNavButtons ?
                  <Fragment>
                    <Button onClick={this.positiveResponse} primary>Проверить</Button>
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
                  {  (this.state.negativeWords.length !== 0 ) ?
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
                     </div>: 
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
                    <Button primary><Link className="training-link" to="/training">К тренировкам</Link></Button>
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
  return {store: state.exercisesReducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);