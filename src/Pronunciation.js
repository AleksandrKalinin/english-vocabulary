import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition'
import {Link} from "react-router-dom";

class Pronunciation extends Component {

	constructor(props){
		super(props);
		this.state = {
		texts: [],
		negativeSentences: [],
		positiveSentences: [],
		id: 0,
		currentText: '',
		currentTextContent: '',
		currentSentence: '',
		isCardVisible: false,
		isButtonVisible: true,
		isTranslationVisible: false,
		showNavButtons: true,
		showContinueButton: false,
		isFinalVisible: false,
		showSubmitButtons: true,
		options: {
		autostart: false
		},
		transcript: '',
		resetTranscript: null,
		browserSupportsSpeechRecognition: null,
		recognition: null,
		startListening: null,
		stopListening: null ,
		splittedText: [],
		isDeleteVisible: false
		}
	}

  componentDidMount() {
      var id = this.state.id;
      axios.all([
          axios.get('/texts.json')
        ])
        .then(axios.spread((textsRes) => {
          const texts = textsRes.data;
          const currentText = texts[id].content;
          let splittedText = currentText.split(". ").slice(0,3);
          let currentSentence = splittedText[id] + '.'; 
          let currentSentenceContent = splittedText[id].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();           
          this.setState({
            texts,
            currentSentence,
            splittedText,
            currentText,
            transcript: this.props.transcript,
            resetTranscript: this.props.resetTranscript,
            browserSupportsSpeechRecognition: this.props.browserSupportsSpeechRecognition,
            recognition: this.props.recognition,
            startListening: this.props.startListening,
            stopListening: this.props.stopListening 
          }, () => this.state.stopListening() );          
        }));      
    }

  setStateOnStart = () => {

  }

  initialLoad = () => {

  }

    startTraining = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      }, () => this.state.startListening())
    }

    submitResponse = () =>{
      var objectTranscription = document.getElementById('transcription').textContent;
      var positiveSentences = this.state.positiveSentences;
      var negativeSentences = this.state.negativeSentences;
      let currentSentence = this.state.currentSentence;
      let currentSentenceContent = this.state.currentSentenceContent;
   
      if(currentSentenceContent === objectTranscription){
        alert('true')
        positiveSentences.push(currentSentence);     
      }

      else {
        alert('false')
        negativeSentences.push(currentSentence);
      }
      this.setState({
        isTranslationVisible: true,
        showNavButtons: false,
        showContinueButton: true,
        positiveSentences,
        negativeSentences

      }, () => this.continueTraining() )        
    }

    continueTraining = () =>{
      let length = this.state.splittedText.length;
      let splittedText = this.state.splittedText;
      let newId = this.state.id;
      newId = newId + 1;
      const texts = this.state.texts;
      if(newId < length){
      	let currentSentence = splittedText[newId] + '.';
      	let currentSentenceContent = splittedText[newId].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
 
        this.setState({
          id: newId,
          currentSentence,
          currentSentenceContent,
          isTranslationVisible: false,
          showNavButtons: true,
          showContinueButton: false        
        })

      }
      else {
        this.state.stopListening();
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

    callSubmit = () =>{
      this.state.resetTranscript();
      this.continueTraining();
    }

    clearTranscription = () =>{
    	let transcript = this.props.transcript;
    	let newTranscript =	transcript.substring(0,transcript.length - 1);
    	this.props.transcript = newTranscript;
    }

  render() {

    const {transcript} = this.props;

    if (!this.state.browserSupportsSpeechRecognition) {
      return null
    }
    this.state.recognition.lang = 'en-US';
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isButtonVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
            <div className="training-wrapper-image">
              <Image src='training/microphone.jpg' />
            </div>  
            <Card.Content>
              <Card.Header>Произношение</Card.Header>
              <Card.Description>
                <Button primary onClick={this.startTraining} >Начать</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       <Card.Group itemsPerRow={1} className="card-header-wrapper" >
           <Card className="card-training pronunciation-card"  >
              <Card.Content>
                <Card.Header className="pronunciation-header">
                  Произнесите предложение в микрофон
                </Card.Header>
                <Card.Header className="pronunciation-text">{this.state.currentSentence}
                </Card.Header>                
                <Card.Description id="transcription" className="pronunciation-transcription">
                <span className="transcription-text">
                  {transcript} </span>
                  {this.props.transcript.length ?
                  <div className="pronunciation-clear-wrapper" onClick = {this.clearTranscription}>
	                  <span className="triangle"> </span>
	                  <span className="pronunciation-clear">
	                  	<Icon name = 'delete'/>
	                  </span>                  	
                  </div> : null
              }
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="card-buttons-wrapper">
                {this.state.showNavButtons ?
                <Fragment>
                  <Button onClick={this.submitResponse} primary>Проверить</Button>
                </Fragment>:null
                }  
                {this.state.showContinueButton ?
                  <Button onClick={this.callSubmit} primary>Продолжить</Button>:null
                }
                </Button.Group>
              </Card.Content>
            </Card>          
      </Card.Group> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training pronunciation-card" >
                <Card.Content>
                  <Card.Header>Результаты</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  {  (this.state.negativeSentences.length !== 0 ) ?
                    <List className="audio-list">
                    <h4>Верно</h4>
                    {this.state.positiveSentences.map((item, index) => 
                        <List.Item  className="audio-list-item" key={index} >{item}</List.Item>  
                      )}
                      <h4>Неверно</h4>                    
                    {this.state.negativeSentences.map((item, index) => 
                        <List.Item  className="audio-list-item" key={index} >{item}</List.Item>  
                      )}
                   </List> : 
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
                        {this.state.positiveSentences.length}
                      </div>
                      <Label>Верно</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {this.state.negativeSentences.length}
                      </div> 
                      <Label>Неверно</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                    <Button primary>Продолжить</Button>
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

export default SpeechRecognition({autostart: false})(Pronunciation);