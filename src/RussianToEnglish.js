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


updateComponent = () =>{
  const id = this.state.id;
  const words = this.state.words;
  const currentName = words[id].name;
  const currentTranslation = words[id].translation;
  const currentMeaning = words[id].meaning;
  const currentImage = words[id].image;
  this.setState({ 
    words, 
    currentName, 
    currentImage, 
    currentTranslation, 
    currentMeaning 
  });
}

startTraining = () =>{
  this.setState({
    isButtonVisible: false,
    isCardVisible: true
  })
}

updateSearch = (event) =>{
  this.setState({search: event.target.value.substr(0,20)});
}  

continueTraining = () =>{
  let wordsLength = this.state.wholeList.length;
  let newId = this.state.id;
  newId = newId + 1;
  const id = this.state.id;
  const words = this.state.wholeList;
  const result = this.state.result;
  if(newId < wordsLength) {
    const currentName = words[newId].name;
    const currentTranslation = words[newId].translation;
    const currentMeaning = words[newId].meaning;
    const currentImage = words[newId].image;
    const currentDate = words[newId].date;
    const currentCategory = words[newId].category; 
    const currentResult = result[newId];
    const currentWord =  result[newId][Math.floor(Math.random() * result[newId].length)]
    const currentPicture = currentWord.image; 
    this.setState({
      id: newId,
      words, 
      currentName, 
      currentImage, 
      currentTranslation, 
      currentMeaning,
      currentDate,
      currentCategory,
      isTranslationVisible: false,
      showNavButtons: true,
      showContinueButton: false,
      isImageVisible: false,
      isLinkVisible: true,
      isInputVisible: true,
      search: '',
      currentWord,
      currentPicture,
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


compareWord = (e) =>{
  var positiveWords = this.state.positiveWords.slice();
  var negativeWords = this.state.negativeWords.slice();    
  const param = e.target.textContent;
  const word = this.state.currentWord;    
  const name = this.state.currentWord.name;
  const currentPicture = this.state.currentPicture;
  let newObj = {}
  newObj.id = this.state.id;
  newObj.name = this.state.currentWord.name;
  newObj.translation = this.state.currentWord.translation;
  newObj.meaning = this.state.currentWord.meaning;
  newObj.image = this.state.currentWord.image;
  newObj.date = this.state.currentWord.date;
  newObj.category = this.state.currentWord.category;

  if(param === name){
    positiveWords.push(newObj);
    this.setState({
      isImageVisible: true,
      flagState: true,
      currentPicture,
      positiveWords,
      negativeWords,
      disabled: true
    })
  }
  else{
    negativeWords.push(newObj);
    this.setState({
      isImageVisible: true,
      flagState: true,
      currentPicture,
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

consoleState = (e) =>{
  console.log(this.state);
}

voiceWord = () =>{
  var newWords = this.state.currentWord.name;
  speech.say(newWords);
} 

setStateOnStart = () => {
  this.setState({
    words: [],
    negativeWords: [],
    positiveWords: [],
    id: 0,
    currentName: '',
    currentTranslation: '',
    currentMeaning: '',
    currentImage: null,
    currentDate : null,
    currentCategory: '',
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
    metaClass: 'blue',
    nameClass: '',
    randomValues: [],
    list: [],
    wholeList: [],
    currentWord: '',
    currentButtonColor: '',
    flagState: false,
    result: [],
    currentPicture: null,
    newColor: 'green',
    disabled: false    
  }, () => this.initialLoad())
}

initialLoad = () => {
  var id = this.state.id;
  axios.get('/words.json')
  .then(res => {
    const words = res.data;
    const currentName = words[id].name;
    const currentTranslation = words[id].translation;
    const currentMeaning = words[id].meaning;
    const currentImage = words[id].image;
    const currentDate = words[id].date;
    const currentCategory = words[id].category;
    const list = [];
    var wholeList = [];
    for (var i = 0; i < words.length/5; i++) {
      while(list.length < 5) {
        var el = words[Math.floor(Math.random() * words.length)];
        if(list.indexOf(el) === -1) list.push(el);
      }
      wholeList.push(list);
    }

    var result = [];
    var tempObject = {
      "id": 10000,
      "name": "minnow",
      "translation": "пескарь",
      "meaning": "a small freshwater Eurasian cyprinoid fish that typically forms large shoals",
      "image": "data/minnow.jpg",
      "date": 15,
      "category": "animals"           
    }
    for (var i = 0; i < words.length/5; i++) {
     result[i] = [];
     for (var j = 0; j < 5; j++) {
       var el = words[Math.floor(Math.random() * words.length)]
       if (result[i].indexOf(el) === -1){
        result[i][j] = el; 
      }  
      else {
        el = words[Math.floor(Math.random() * words.length)]
        if(result[i].indexOf(el) === -1){
          result[i][j] = el;
        }
        else {
          el = words[Math.floor(Math.random() * words.length)]
          if(result[i].indexOf(el) === -1){
            result[i][j] = el;
          }
          else {
            result[i][j] = tempObject;
          }
        }
      }    
    }
  }

  const currentWord = result[0][Math.floor(Math.random() * result[0].length)];
  const currentPicture = currentWord.image;          
  this.setState({ 
    words, 
    currentName, 
    currentImage, 
    currentTranslation, 
    currentMeaning,
    currentDate,
    currentCategory,
    list,
    currentWord,
    wholeList: wholeList.slice(0, 10),
    result: result.slice(0, 10),
    currentPicture });
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
             <Button  ref={btn => { this.btn = btn; }}  className={this.state.currentButtonColor} onClick={this.compareWord} >{word.name}</Button>
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
              <Image src={this.state.currentPicture} className="training-image">
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
    {this.state.words.length - this.state.positiveWords.length}
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