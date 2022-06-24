import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Container, Label, List, Message} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";


class Proverbs extends Component {

	constructor(props){
		super(props);
  		this.state = {
  			proverbs: [],
        id: 0,
        currentProverbName: '',
        currentTranslation: '',
        mistakeCount: 0,
        positiveWords: [],
        negativeWords: [],
        currentArray: [],
        isStarterVisible: true,
        isCardVisible: false,
        isFinalVisible: false,
        areButtonsVisible: false,
        isContinueButtonVisible: false,
        isCheckButtonVisible: false,
        isDKButtonVisible: true,
        currentWord: []
  		}
	}


  componentDidMount() {
    var id = this.state.id;
      axios.get('/proverbs.json')
        .then(res => {
          const proverbs = res.data;
          const currentProverb = proverbs[id];
          const currentProverbName = proverbs[id].proverb;
          const currentTranslation = proverbs[id].translation;
          let currentArray = currentProverbName.split(" ");
          for (let i = currentArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
          }                    
          this.setState({ 
              proverbs: proverbs, 
              currentProverbName: currentProverbName,
              currentTranslation: currentTranslation,
              currentArray: currentArray
            },()=> console.log("currentArray ", this.state.currentArray));
        })
    }


    startTraining = () =>{
      this.setState({
          isStarterVisible: false,
          isCardVisible: true
      })
    }

    shuffleArray = () =>{
      let currentArray = this.state.currentArray.slice();
      for (let i = currentArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
      }
      console.log(currentArray)      
    }



    continueTraining = () =>{
	  let mistakeCount = this.state.mistakeCount;
	  let negativeWords = this.state.negativeWords.slice();
	  let positiveWords = this.state.positiveWords.slice();
    let id = this.state.id;
    let proverbs = this.state.proverbs;
    id = id + 1;
    if(id < 2) {
      const currentProverb = proverbs[id];
      const currentProverbName = proverbs[id].proverb;
      const currentTranslation = proverbs[id].translation;
      let currentArray = currentProverbName.split(" ");
      for (let i = currentArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
      }        
      this.setState({
          id: id,
          proverbs: proverbs, 
          currentProverbName: currentProverbName,
          currentTranslation: currentTranslation,
          currentArray: currentArray,
          currentWord: [],
          positiveWords: positiveWords,
          negativeWords: negativeWords,
          isCheckButtonVisible: false,
          isDKButtonVisible: true,
          isContinueButtonVisible: false
      }, () => console.log(this.state))
    }
    else{
      this.setState({
        isFinalVisible: true,
        isCardVisible: false,
        isStarterVisible: false,
        positiveWords: positiveWords,
        negativeWords: negativeWords           
      })
    }
  }

   setValue = (e) =>{
    let target = e.target;
    let parent = e.target.parentElement.children;
    var indexTarget = 0;
        while ( (target = target.previousElementSibling) ) {
          indexTarget++
    }
    let currentWord = this.state.currentWord;
    let currentArray = this.state.currentArray;
    currentArray.splice(indexTarget,1);
    currentWord.push(e.target.textContent);

    this.setState({
      currentWord: currentWord
    })
    if(currentArray.length == 0){
      this.setState({
        isCheckButtonVisible: true,
        isDKButtonVisible: false
      })
    }
  } 

    removeValue = (e) =>{
      let target = e.target;
      let parent = e.target.parentElement.children;
      var indexTarget = 0;
          while ( (target = target.previousElementSibling) ) {
            indexTarget++
      }
      console.log(indexTarget);
      let currentWord = this.state.currentWord;
      let currentArray = this.state.currentArray;
      currentWord.splice(indexTarget,1);
      currentArray.push(e.target.textContent);
      this.setState({
        currentArray: currentArray
      })
      if(currentArray.length > 0){
        this.setState({
          isCheckButtonVisible: false
        })
      }
  }

  dontKnow = (e) =>{
    let negativeWords = this.state.negativeWords;    
    let currentProverbName = this.state.currentProverbName;
    let currentArray = currentProverbName.split(" ");
    let currentWord = [];
    for (var i = 0; i < currentArray.length; i++) {
      currentWord.push(currentArray[i])
    }
    negativeWords.push(currentProverbName);
    console.log(currentWord);
    this.setState({
      currentWord: currentWord,
      currentArray: [],
      isDKButtonVisible: false,
      isContinueButtonVisible: true,
      isCheckButtonVisible: false,
      currentWord: currentWord
    })
  }

  checkProverb = (e) =>{
    let positiveWords = this.state.positiveWords;
    let currentWord = this.state.currentWord;
    let sentence = '';
    for (var i = 0; i < currentWord.length; i++) {
      if(i !== currentWord.length-1){
        sentence = sentence + currentWord[i]+ ' ';
      }
      else{
        sentence = sentence + currentWord[i];
      }
    }
    if(sentence === this.state.currentProverbName){
      console.log("correct!");
      positiveWords.push(sentence)
      this.setState({
        isContinueButtonVisible: true,
        isCheckButtonVisible: false,
        isDKButtonVisible: false,
        positiveWords: positiveWords
      })      
    }
    else {
      console.log("incorrect!");
      this.setState({
        isDKButtonVisible: true
      })      
    }
    console.log(this.state);
  }

  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isStarterVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
          <div className="training-wrapper-image">
            <Image src='training/proverbs.jpg' />
          </div>  
            <Card.Content>
              <Card.Header>Составь слово</Card.Header>
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
       		<Card className="construct-card proverb-card">
	       		<Label>
              {this.state.currentTranslation}
            </Label>
              <div className="proverb-result">
                  {this.state.currentWord.map((item,index) =>
                      <span key={index} className="proverb-span" onClick={this.removeValue}>{item}</span>
                  )}
              </div>
              <div className="fragment-variants">
                {this.state.currentArray.map((item, index) =>
                  <span onClick={this.setValue} key={index} className="fragment-span">{item}</span>
                )}
              </div>
              <div className="proverb-button-container">
              {this.state.isCheckButtonVisible ? 
                <Button primary onClick={this.checkProverb} >Проверить</Button> :null
              }
              {this.state.isDKButtonVisible ? 
                <Button primary onClick={this.dontKnow}>Не знаю</Button> :null
              }
              {this.state.isContinueButtonVisible ? 
                <Button primary onClick={this.continueTraining} >Продолжить</Button> :null
              }                
              </div>
       		</Card>
      	</Container> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>Results</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  {  (this.state.negativeWords.length !== 0 ) ?
                    <List className="audio-list">
                    <h3>Верно</h3>
                      {this.state.positiveWords.map((item, index) => 
                        <List.Item key={index} >{item}</List.Item>  
                      )}
                    <h3>Неверно</h3>
                      {this.state.negativeWords.map((item, index) => 
                        <List.Item key={index} >{item}</List.Item>  
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
                        {2 - this.state.positiveWords.length}
                      </div> 
                      <Label>Неверно</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                    <Button primary>Продолжить</Button>
                    <Button primary><Link to="/materials">Вернуться</Link></Button>
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

export default Proverbs;