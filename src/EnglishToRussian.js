import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Container, Label, Message} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class EnglishToRussian extends Component {

	constructor(props){
		super(props);
    this.btn = React.createRef();
		this.state = {
		}
	}


  componentDidMount() {
    this.setStateOnStart();
  }


    initialLoad = () => {
      var id = this.state.id;
      axios.get('/working.json')
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
            while(list.length < 10) {
                var el = words[Math.floor(Math.random() * words.length)];
                if(list.indexOf(el) === -1) list.push(el);               
              }
              wholeList.push(list);
          }
          
          var result = [];
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
                        result[i][j] = words[Math.floor(Math.random() * words.length)];
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
        currentMeaning});
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
      const words = this.state.wholeList;
      const result = this.state.result;
      if(newId < wordsLength) {
        const currentName = words[newId].name;
        const currentTranslation = words[newId].translation;
        const currentMeaning = words[newId].meaning;
        const currentImage = words[newId].image;
        const currentDate = words[newId].date;
        const currentCategory = words[newId].category; 
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
    const name = this.state.currentWord.translation;
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

    else {
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
    const list = this.state.list;
    this.setState({
      isImageVisible: true,
      flagState: true
    })
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
    }, () => {
      this.initialLoad();
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
                <Image src='training/englishtorussian.jpg' />
              </div>  
                <Card.Content>
                  <Card.Header>Перевод</Card.Header>
                  <Card.Description>
                    <Button primary onClick={this.startTraining} >Начать тренировку</Button>
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
                  {this.state.currentWord.name}
                    <span className="training-card__icon" onClick={this.voiceWord} title="Прослушать">
                      <Icon className="pointer-icon"  name = 'right sound'/> 
                    </span>
                </Label>
    	       		<Container className="list-inner-wrapper">
    			        <List className="training-list">
    			        {this.state.result[this.state.id].map((word, index) =>
    			            <List.Item key={index} className="training-list-item">
    			              <List.Content>
    			                <List.Header as='a'>
                            <Button  ref={btn => { this.btn = btn; }}  className={this.state.currentButtonColor} onClick={this.compareWord} >{word.translation}</Button>
                          </List.Header>
    			              </List.Content>
    			            </List.Item>
    			        )}
                    <List.Item className="training-list-item">
                      <List.Content>
                        <List.Header as='a'>
                          <Button onClick={this.dontKnow} className="help" >Не знаю</Button>
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
                    {this.state.flagState && this.state.isImageVisible ?
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
                        <Button primary onClick={this.setStateOnStart}>К текстам</Button>
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
  return {store: state.reducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EnglishToRussian);