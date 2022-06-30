import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Input, List, Container, Label, Message} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import classnames from 'classnames';
import {Link} from "react-router-dom";

class RussianToEnglish extends Component {

	constructor(props){
		super(props);
    this.btn = React.createRef();
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
    isImageVisible: false,
    isLinkVisible: true,
    isInputVisible: true,
    search: '',
    currentWord: '',
    flagState: false,
    result: [],
    disabled: false    
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
        this.setState({ 
          words, 
          currentWord,
          result });
      })
  }


startTraining = () =>{
  this.setState({
    isButtonVisible: false,
    isCardVisible: true
  })
}

continueTraining = () =>{
  let id = this.state.id;
  id = id + 1;
  const result = this.state.result;
  if(id < result.length) {
    const currentWord =  result[id][Math.floor(Math.random() * result[id].length)];
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
      disabled: false
    })
  } 
  else this.setState({
    isFinalVisible: true,
    isTranslationVisible: false,
    showNavButtons: false,
    showContinueButton: false, 
    isCardVisible: false,
    isButtonVisible: false,
    isImageVisible: false,
    isLinkVisible: false,
    isInputVisible: false,
    search: ''   

  }) 
}

voiceWord = () =>{
  var newWords = this.state.currentName;
  speech.say(newWords);
}  

showImage = ()=>{
  this.setState({
    isImageVisible: true,
    isLinkVisible: false
  })
}

   compareWord = (id) =>{
    let selectedWord = this.state.result[this.state.id].find(x => x.id === id);
    var positiveWords = this.state.positiveWords.slice();
    var negativeWords = this.state.negativeWords.slice();    
    if(this.state.currentWord.id === selectedWord.id){
      positiveWords.push(this.state.currentWord);
      this.setState({
        isImageVisible: true,
        flagState: true,
        positiveWords,
        negativeWords,
        disabled: true
      })
    }

    else {
      negativeWords.push(this.state.currentWord);
      this.setState({
        isImageVisible: true,
        flagState: true,
        positiveWords,
        negativeWords,
        disabled: true
      })
    } 
  }


dontKnow = () =>{
  this.setState({
    isImageVisible: true,
    flagState: true
  })
}

voiceWord = () =>{
  var newWords = this.state.currentWord.name;
  speech.say(newWords);
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
            <Image src='training/russiantoenglish.jpg' />
            </div>  
            <Card.Content>
            <Card.Header>Перевод</Card.Header>
            <Card.Description>
            <Button primary onClick={this.startTraining}>Начать тренировку</Button>
            </Card.Description>
            </Card.Content>
            </Card>          
            </Card.Group>:
            null
          }
          {this.state.isCardVisible ?
            <Container className="list-container">
            <Card className="training-card">
            <Label>
            {this.state.currentWord.translation}
            <span onClick={this.voiceWord} className="training-card__icon">
            <Icon className="pointer-icon"  name = 'right sound'/> 
            </span>
            </Label>
            <Container className="list-inner-wrapper">
            <List className="training-list">
            {this.state.result[this.state.id].map((word, index) =>
             <List.Item key={index} className="training-list-item">
             <List.Content>
             <List.Header as='a'>
             <Button disabled={this.state.disabled}  ref={btn => { this.btn = btn; }}  className={this.state.currentButtonColor} onClick={this.compareWord.bind(this, word.id)} >{word.name}</Button>
             </List.Header>
             </List.Content>
             </List.Item>
             )}
            <List.Item className="training-list-item ">
            <List.Content>
            <List.Header as='a'>
            <Button className="dont-know" onClick={this.dontKnow} >Не знаю</Button>
            </List.Header>
            </List.Content>
            </List.Item>              
            </List>
            {this.state.isImageVisible ?
              <div className="training-right-wrapper">
              <div className="training-image-wrapper">
              <Image src={this.state.currentWord.image} className="training-image">
              </Image>                
              </div>
              {this.state.flagState ?
                <Button onClick={this.continueTraining} primary>Продолжить тренировку</Button>:null

              }                                     
              </div>: null               
            }
            </Container>
            </Card>
            </Container> :
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
            <List className="audio-list">
            {this.state.negativeWords.map((item, index) => 
              <List.Item key={index} ><span>{item.name}</span>  -  {item.translation}</List.Item>  
              )}
            </List>: 
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

export default RussianToEnglish;