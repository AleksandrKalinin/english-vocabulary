import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";

class Rightwrong extends Component {

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
      const currentMeaning = words[id].meaning;
      const currentImage = words[id].image;
      this.setState({ 
        words, 
        currentName, 
        currentImage, 
        currentTranslation, 
        currentMeaning });
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
        isTranslationVisible: false        
      })
    }



    positiveResponse = () =>{
      var newObj = {};
      var positiveWords = this.state.positiveWords.slice();
      newObj.id = this.state.id;
      newObj.name = this.state.currentName;
      newObj.translation = this.state.currentTranslation;
      newObj.meaning = this.state.currentMeaning;
      newObj.image = this.state.currentImage;
      newObj.date = this.state.currentDate;
      newObj.category = this.state.currentCategory;
      positiveWords.push(newObj);
      this.setState({
        positiveWords,
        isImageVisible: true,
        isTranslationVisible: true,
        showNavButtons: false,
        showContinueButton: true,
      })
    }

    negativeResponse = () =>{
      this.setState({
        isTranslationVisible: true,
        showNavButtons: false,
        showContinueButton: true,
        isImageVisible: true
      })
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
          isImageVisible: false,
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

    consoleState = () =>{
      console.log(this.state)
    }

    consoleMessage = () =>{
      console.log('hello');
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
        currentMeaning: '',
        currentImage: null,
        currentDate : null,
        currentCategory: '',
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
      axios.get('/vocabulary2.json')
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
            currentCategory }, () => console.log(this.state));
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
                <Card.Header className="rightwrong-header">{this.state.currentName} 
                </Card.Header>                
                <Card.Header>{this.state.currentTranslation} 
                </Card.Header>
                <div className="rightwrong-image-wrapper">
                {this.state.isImageVisible ?
                  <Image src={this.state.currentImage} className="rightwrong-image"></Image> : null               
                }
                </div>
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="card-buttons-wrapper">
                {this.state.showNavButtons ?
                <Fragment>
                  <Button onClick={this.negativeResponse} className="red false-button" primary>Неверно</Button>
                  <Button onClick={this.positiveResponse} className="green true-button" primary>Верно</Button>
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

export default Rightwrong;