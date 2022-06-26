import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';

class Cards extends Component {

	constructor(props){
		super(props);
		this.state = {

		}
	}


  componentDidMount() {
    this.setStateOnStart();
  }

    updateComponent = () =>{
         const id = this.state.id;
          const words = this.state.words;
          const currentName = words[id].name;
          const currentTranslation = words[id].translation;
          const currentImage = words[id].image;
          this.setState({ 
            words, 
            currentName, 
            currentImage, 
            currentTranslation });
    }

    renderComponent = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    updateState = () =>{
      let newId =this.state.id;
      newId = newId + 1;
      const id = this.state.id;
      const words = this.state.words;
      const currentName = words[newId].name;
      const currentTranslation = words[newId].translation;
      const currentImage = words[newId].image;
      const currentDate = words[newId].date;
      const currentCategory = words[newId].category;      
      this.setState({
        id: newId,
        words, 
        currentName, 
        currentImage, 
        currentTranslation, 
        currentDate,
        currentCategory,
        isTranslationVisible: false        
      })
    }

    checkResponse = (val) => {
      var newObj = {};
      newObj.id = this.state.id;
      newObj.name = this.state.currentName;
      newObj.translation = this.state.currentTranslation;
      newObj.image = this.state.currentImage;
      newObj.date = this.state.currentDate;
      newObj.category = this.state.currentCategory; 
      if (val) {
        var positiveWords = this.state.positiveWords.slice();
        positiveWords.push(newObj);
        this.setState({
          positiveWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true,
        })        
      } else {
        var negativeWords = this.state.negativeWords.slice();
        negativeWords.push(newObj);      
        this.setState({
          negativeWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true
        })        
      }     
    }

    continueTraining = () =>{
      let wordsLength = this.state.words.length;
      let newId =this.state.id;
      newId = newId + 1;
      const id = this.state.id;
      const words = this.state.words;
      if(newId < wordsLength){
        const currentName = words[newId].name;
        const currentTranslation = words[newId].translation;
        const currentImage = words[newId].image;
        const currentDate = words[newId].date;
        const currentCategory = words[newId].category;     
        this.setState({
          id: newId,
          words, 
          currentName, 
          currentImage, 
          currentTranslation, 
          currentDate,
          currentCategory,
          isTranslationVisible: false,
          showNavButtons: true,
          showContinueButton: false        
        })

      }
      else this.setState({
          isFinalVisible: true,
          isTranslationVisible: false,
          showNavButtons: false,
          showContinueButton: false, 
          isCardVisible: false,
          isButtonVisible: false
      })
    }


   voiceWord = () =>{
      var newWord = this.state.currentName;
      speech.say(newWord);
   }    

   setStateOnStart = () => {
    this.setState({
      words: [],
      negativeWords: [],
      positiveWords: [],
      id: 0,
      currentName: '',
      currentTranslation: '',
      currentImage: null,
      currentDate : null,
      currentCategory: '',
      isCardVisible: false,
      isButtonVisible: true,
      isTranslationVisible: false,
      showNavButtons: true,
      showContinueButton: false,
      isFinalVisible: false 
    }, () => this.initialLoad())
   }

   initialLoad = () => {
    var id = this.state.id;
      axios.get('/words.json')
        .then(res => {
          const words = res.data;
          const currentName = words[id].name;
          const currentTranslation = words[id].translation;
          const currentImage = words[id].image;
          const currentDate = words[id].date;
          const currentCategory = words[id].category;           
          this.setState({
            currentName, 
            currentImage, 
            currentTranslation, 
            currentDate,
            currentCategory }, () => this.randomItem(words));
        })
   }

   randomItem = (arr) => {
    let words = [];
    for (var i = 0; i < 10; i++) {
      words.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    this.setState({
      words
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
              <Image src='training/memory.png' />
            </div>  
            <Card.Content>
              <Card.Header>Словарные карточки</Card.Header>
              <Card.Description>
                <Button primary onClick={this.renderComponent} >Начать тренировку</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       <Card.Group itemsPerRow={1} className="card-header-wrapper" >
           <Card className="card-training"  >
           <div className="card-image-wrapper recognize-cards">
             <Image src={this.state.currentImage} />
           </div>
              <Card.Content>
                <Card.Header>{this.state.currentName} 
                <span onClick={this.voiceWord} className="training-card__icon" title="Прослушать">
                  <Icon name = 'right sound'/> 
                </span>
                </Card.Header>
                {this.state.isTranslationVisible ? 
                  <Fragment>
                    <Card.Meta>{this.state.currentTranslation}</Card.Meta>
                    <Card.Description>{}</Card.Description>                  
                  </Fragment>:null
                }
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="card-buttons-wrapper">
                {this.state.showNavButtons ?
                <Fragment>
                  <Button onClick={/*this.positiveResponse */ this.checkResponse.bind(this, true)} primary>Знаю</Button>
                  <Button onClick={/*this.negativeResponse*/ this.checkResponse.bind(this, false)} primary>Не знаю</Button>
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
                  { (this.state.negativeWords.length !== 0 ) ?
                    <List className="audio-list">
                    {this.state.negativeWords.map((item, index) => 
                        <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
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

export default Cards;