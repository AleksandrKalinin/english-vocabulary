import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Icon, Menu, Input} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition';
import {Link} from "react-router-dom";

class InsertSpaces extends Component {

	constructor(props){
		super(props);
		this.state = {
      texts: [],
      contentArray: [],
      areTextsVisible: true,
      isMenuVisible: true,
      isSingleTextVisible: false,
      isResultVisible: false,
      isResultWrong: false,
      negativeWords: [],
      positiveWords: [],
      content: '',
      inputContent: '',
      textContent: '',
      newContent: '',
      image: null,
		}
	}

  componentDidMount() {
    axios.get('/texts.json')
      .then(res => {
        let texts = res.data;
        let contentArray = [];
        texts.map((item, index) => contentArray.push(item.content) )
        this.setState({ 
          texts,
          contentArray
        });
      })        
  }   



    readMore = (e) =>{
      let texts = this.state.texts.slice();
      let target = e.target.parentElement;
      var index = 0;
        while ( (target = target.previousElementSibling) ) {
          index++;
      }
      let activeTargetTitle = e.target.parentElement.children[0].children[1].textContent;
      let activeTargetContent = texts[index].content;
      let inputContent = texts[index].content;
      inputContent = inputContent.replace(/\s/g, '');
      let activeTargetImage = e.target.parentElement.children[0].children[0].children[0].src;
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        title: activeTargetTitle,
        content: activeTargetContent,
        image: activeTargetImage,
        inputContent
      })      
    }


    handleChange = (event) => {
     this.setState({
       minutes: event.target.value
     })
    }  

  showFinal = () =>{
      let intervalHandle = this.state.intervalHandle;
      let time = this.state.totalSecondsSpent;
      let minutes = Math.floor(time / 60);
      let seconds = this.state.totalSecondsSpent - (minutes * 60);
      clearInterval(intervalHandle);
      this.setState({
        intervalHandle,
        isResultVisible: true,
        isTaskStarted: false,
        minutesSpent: minutes,
        secondsSpent: seconds        
      })
  }

  tryAgain = () =>{
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        isResultVisible: false,
        isResultWrong: false,  
      }) 
  }

setCaretPosition = (ctrl, pos) => {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

  updateValue = (event) =>{
  	let newContent = this.state.newContent;
  	let target = event.target;
    let str = event.target.value;
    let indexOfSpace = event.target.value.indexOf(" ") + 1;
    let word = event.target.value.substr(0, indexOfSpace - 1);
    let newstr = event.target.value.substring(indexOfSpace);
    newContent = newContent + (word + ' ');
      this.setState({
      	newContent: newContent,
        inputContent: newstr
      }, () => this.setCaretPosition(target, 0));
  }

  startExercise = () => {
    this.setState({
      isTaskStarted: true,
      isSingleTextVisible: false
    })
  }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper fragments-wrapper">
              {this.state.isMenuVisible ?
                <Menu className="texts-menu" vertical>
                  <Menu.Item name='inbox' >

                  </Menu.Item>
                </Menu> : null 
              }          
              {(this.state.texts.length && this.state.areTextsVisible) ? 
              <Card.Group className="texts-cards" itemsPerRow={3} >
              {this.state.texts.map((item, index) => 
                <Card key={index}>
                  <Card.Content>
                    <div className="texts-image-wrapper">
                      <Image src={item.image} />
                    </div>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Description>
                      {item.content.substr(0,250) + ' ...'}
                    </Card.Description>
                  </Card.Content>
                  <Button onClick={this.readMore} >Читать далее</Button>
                </Card>
               )}
              </Card.Group> : null
             }
             {this.state.isSingleTextVisible ? 
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>
                  <Card.Content className="fragments-content recreate-text-content">
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text">
                      { this.state.content}
                    </Card.Description>
                    <Button primary onClick={this.startExercise}>Я прочитал</Button> 
                  </Card.Content>
                </Card>:null
              }             
             {this.state.isTaskStarted ? 
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>
                  <Card.Content className="fragments-content recreate-text-content">
                    <p className="single-text-card-description p-wrap fragment-description recreate-text inserted-text">
                      { this.state.newContent}
                    </p>
                    <Input className="insert-spaces-input" value={this.state.inputContent} onChange={this.updateValue} />
                    <Button.Group className="card-buttons-wrapper">
                        <Button primary onClick={this.showFinal}>Проверить</Button>
                      </Button.Group>
                  </Card.Content>
                </Card>:null
              }
              {this.state.isResultVisible ?
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>                
                  <Card.Content className="fragments-content">
                    <div className="recreate-results">
                      <div className="recreate-results__item recreate-item">
                        <h3 className="recreate-item__title">Исходный текст</h3>
                        <p className="recreate-item__text">{this.state.content}</p>
                      </div>
                      <div className="recreate-results__item recreate-item">
                        <h3 className="recreate-item__title">Результат</h3>
                        <p className="recreate-item__text">{this.state.newContent}</p>
                      </div>                      
                    </div>                                     
                  </Card.Content>
                  <div className="fragment-variants">
                    <Button primary onClick={this.tryAgain}>Заново</Button>
                    <Button primary><Link className="training-link" to="/training">К тренировкам</Link></Button>
                  </div> 
                </Card> : null
              }    
          </div>
        </div>
        <footer></footer>
      </Fragment>
	);
  }
}

export default InsertSpaces;