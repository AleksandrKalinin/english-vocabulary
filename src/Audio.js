import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Input, List, Message, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";

class Audio extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}


  componentDidMount() {
    this.setStateOnStart()
  }

    startTraining = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    updateSearch = (event) =>{
      this.setState({
        search: event.target.value.substr(0,20),
        tempSearch: event.target.value.substr(0,20)});
    }  


    positiveResponse = () =>{
      var newObj = {};
      var positiveWords = this.state.positiveWords.slice();
      var negativeWords = this.state.negativeWords.slice();
      var currentWord = this.state.currentName;
      var searchValue = this.state.search;
      newObj.id = this.state.id;
      newObj.name = this.state.currentName;
      newObj.translation = this.state.currentTranslation;
      newObj.meaning = this.state.currentMeaning;
      newObj.image = this.state.currentImage;
      newObj.date = this.state.currentDate;
      newObj.category = this.state.currentCategory;
      if(currentWord === searchValue){
        positiveWords.push(newObj);
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
      else if(searchValue === ''){
        negativeWords.push(newObj);        
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
        negativeWords.push(newObj);
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

    continueTraining = () =>{
      let wordsLength = this.state.words.length;
      let newId =this.state.id;
      newId = newId + 1;
      const id = this.state.id;
      const words = this.state.words;
        if(newId < wordsLength) {
        const currentName = words[newId].name;
        const currentTranslation = words[newId].translation;
        const currentMeaning = words[newId].meaning;
        const currentImage = words[newId].image;
        const currentDate = words[newId].date;
        const currentCategory = words[newId].category;          
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
            correctNameVisible: false        
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
          correctNameVisible: false,
          search: ''   

      }) 
    }

   voiceWord = () =>{
      var newWord = this.state.currentName;
      speech.say(newWord);
   }  

   showImage = () => {
    this.setState({
      isImageVisible: true,
      isLinkVisible: false
    })
   }

   changeColor = () =>{
    this.setState({
      metaClass: 'yellow'
    })
   } 

   consoleFunction = () =>{
    console.log(this.state.negativeWords.length);
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
          this.setState({ 
            words, 
            currentName, 
            currentImage, 
            currentTranslation, 
            currentMeaning,
            currentDate,
            currentCategory });
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
                    <Button onClick={this.voiceWord} primary><Icon size="big" name="microphone"></Icon></Button>
                    {this.state.isInputVisible ?
                      <Input placeholder="Введите прослушанное слово" id="audo-input" onChange={this.updateSearch}/>:null

                    } 
                  </Card.Header>
                  {this.state.isTranslationVisible ? 
                    <Fragment>
                    {this.state.correctNameVisible ? <Card.Meta className={this.state.correctNameClass}>{this.state.currentName}</Card.Meta>: null }
                      <Card.Meta className={this.state.nameClass}>{this.state.tempSearch}</Card.Meta>
                      <Card.Meta className={this.state.metaClass}>{this.state.currentTranslation}</Card.Meta>
                      <Card.Description className="audio-description">{this.state.currentMeaning}</Card.Description>                  
                    </Fragment>:null
                  }
                </Card.Content>
                <Card.Content extra>
                <div className="audio-image-outer-wrapper">
                  {this.state.isImageVisible ?
                   <div className="audio-image-wrapper">
                     <Image src={this.state.currentImage} />
                   </div> :null
                 }
                 {this.state.isLinkVisible ?
                   <div className="audio-image-text">
                       <a onClick={this.showImage}>Show hint</a>
                   </div> :null
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

export default Audio;