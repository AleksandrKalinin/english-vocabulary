import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Input, List, Container, Label} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import classnames from 'classnames';
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

class EnglishToRussian extends Component {

	constructor(props){
		super(props);
		this.state = {
			words: []
		}
	}


  componentDidMount() {
    var id = this.state.id;
      axios.get('/courses.json')
        .then(res => {
          const courses = res.data;
          const currentName = words[id].name;
          const currentTranslation = words[id].translation;
          const currentMeaning = words[id].meaning;
          const currentImage = words[id].image;
          const currentDate = words[id].date;
          const currentCategory = words[id].category;
     
          this.setState({ 
            words: words, 
            currentName: currentName, 
            currentImage: currentImage, 
            currentTranslation: currentTranslation, 
            currentMeaning: currentMeaning,
            currentDate: currentDate,
            currentCategory: currentCategory,
            list: list,
            currentWord: currentWord,
            wholeList: wholeList,
            result: result,
            currentPicture: currentPicture });
        })
    }


    startTraining = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    continueTraining = () =>{
      console.log(this.state);
    }

   voiceWord = () =>{
      var newWords = this.state.currentName;
      console.log(newWords);
      speech.say(newWords);
   }  

   showImage = ()=>{
    this.setState({
      isImageVisible: true,
      isLinkVisible: false
    })
    console.log(this.state);
   }


   compareWord = (e) =>{

   } 

   dontKnow = () =>{
    const list = this.state.list;
    for (var i = 0; i < list.length; i++) {
      console.log(list[i])
    }
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

  render() {
    return (
      <Fragment>
      <TopMenu/>
       {this.state.isButtonVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
            <Image src='data/alacrity.jpg' />
            <Card.Content>
              <Card.Header>Перевод</Card.Header>
              <Card.Description>
                <Link to="/coursessimple"> CoursesSimple</Link>
                <Button primary onClick={this.startTraining}>Начать тренировку</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       	<Container>
          <Label></Label>
          <Button.Group>
            <Button></Button>
          </Button.Group>
        </Container> :
           null
        }
        {this.state.isFinalVisible ?
       <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
           <Card className="card-training" >
              <Card.Content>
                <Card.Header>Results</Card.Header>
                <Divider/>
                <Card.Description className="results-wrapper">
                  <div className="positive-results">
                    {this.state.positiveWords.length}
                  </div>
                  <div className="negative-results">
                    {this.state.words.length - this.state.positiveWords.length}
                  </div>
                </Card.Description>
                <Button.Group className="card-buttons-wrapper">
                  <Button primary>Continue</Button>
                  <Button primary>Return to courses</Button>
                </Button.Group>
              </Card.Content>
            </Card>          
      </Card.Group>          
           : null
        }
    </Fragment>
	);
  }
}

export default EnglishToRussian;