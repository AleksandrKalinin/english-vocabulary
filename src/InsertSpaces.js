import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label, Menu, Input} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition'

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
      spllittedSentences: [],
      reservedSentences: [],
      seconds: '00',   // responsible for the seconds 
      minutes: '5',  // responsible for the minutes
      secondsRemaining: 0,
      intervalHandle: 0,
      wrongIndexes: [],
      totalSecondsSpent: 0,
      secondsSpent: 0,
      minutesSpent: 0


		}
	}



  componentDidMount() {
    axios.get('/texts.json')
      .then(res => {
        let texts = res.data;
        let contentArray = [];
        texts.map((item, index) => contentArray.push(item.content) )
        this.setState({ 
          texts: texts,
          contentArray: contentArray
        }, () => this.consoleState());
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
        inputContent: inputContent
      })      
    }


    consoleState = () =>{
      console.log(this.state);
    }

    backToTexts = () =>{
      this.setState({
        areTextsVisible: true,
        isSingleTextVisible: false,
        isMenuVisible: true,
        contentArray: [],
        currentTempArray: [],
        currentStringArray: [],
        currentRandomWord: '',
        currentFinalArray: [],
        currentRandomArray: [],
        currentOneArray: [],
        activeInput: 0,
        activeArray: [],
        sortedRandomArray: [],
        comparativeRandomArray: [],
        fragmentArrayIndexes: [],
        isResultVisible: false,
        isResultWrong: false,
        seconds: '00',   // responsible for the seconds 
        minutes: '5',  // responsible for the minutes
        secondsRemaining: 0,
        intervalHandle: 0,
        wrongIndexes: [],
        totalSecondsSpent: 0,
        secondsSpent: 0,
        minutesSpent: 0
      })
    }

    splitText = () =>{
      let wrongIndexes = [];
      let content = this.state.content;
      let currentStringArray = content.split(". ");
      currentStringArray.pop();
      let reservedSentences = content.split(". ");
      reservedSentences.pop();   
      for (var i = 0; i < currentStringArray.length; i++) {
           wrongIndexes.push("recreate-text-right");
      }   
      for (let i = currentStringArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentStringArray[i], currentStringArray[j]] = [currentStringArray[j], currentStringArray[i]];
      }             
      console.log(currentStringArray);
      this.setState({
        isSingleTextVisible: false,
        splittedSentenceVisible: true,
        spllittedSentences: currentStringArray,
        reservedSentences: reservedSentences,
        wrongIndexes: wrongIndexes

      }, () => this.startCountDown())
    }  

    handleChange = (event) => {
     this.setState({
       minutes: event.target.value
     })
    }  

    tick = () => {
        var min = Math.floor(this.state.secondsRemaining / 60);
        var sec = this.state.secondsRemaining - (min * 60);
        this.setState({
          minutes: min,
          seconds: sec
        })
        if (sec < 10) {
          this.setState({
            seconds: "0" + this.state.seconds,
          })
        }
        if (min < 10) {
          this.setState({
            value: "0" + min,
           })
        }
        if (min === 0 & sec === 0) {
          let time = this.state.totalSecondsSpent;
          console.log(time);
          let minutes = Math.floor(time / 60);
          console.log(minutes);
          let seconds = this.state.totalSecondsSpent - (minutes * 60);
          console.log(seconds);
          clearInterval(this.state.intervalHandle);
          this.timeIsOut();
          this.setState({
            minutesSpent: minutes,
            secondsSpent: seconds
          })

        }
        this.state.secondsRemaining--;
        this.state.totalSecondsSpent++;

   
    }
    startCountDown = () => {
        this.state.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.state.secondsRemaining = time * 60;
    }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.spllittedSentences[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  onDragOver = index => {
    const draggedOverItem = this.state.spllittedSentences[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.spllittedSentences.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ spllittedSentences: items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  checkSentences = () =>{
    let reservedSentences = this.state.reservedSentences;
    let splittedSentences = this.state.spllittedSentences;
    let currentProgress;
    console.log(splittedSentences);
    console.log(reservedSentences);
    let wrongIndexes = this.state.wrongIndexes.slice();
    let wrongCount = 0;
    for (var i = 0; i < splittedSentences.length; i++) {
      if (splittedSentences[i] !== reservedSentences[i]) {
        wrongIndexes[i] = "recreate-text-wrong";
        wrongCount++;
      }
      else{
        wrongIndexes[i] = "recreate-text-right"
      }
    }
    if(wrongCount==0){
      this.showFinal();
    }

    this.setState({
      wrongIndexes: wrongIndexes
    }, () => console.log(this.state))

  }


  timeIsOut =()=>{
    this.setState({
      isResultWrong: true,
      splittedSentenceVisible: false
    })
  }

  showFinal = () =>{
      let time = this.state.totalSecondsSpent;
      console.log(time);
      let minutes = Math.floor(time / 60);
      console.log(minutes);
      let seconds = this.state.totalSecondsSpent - (minutes * 60);
      console.log(seconds);
      clearInterval(this.state.intervalHandle);
      this.setState({
        isResultVisible: true,
        splittedSentenceVisible: false,
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
        seconds: '00',   // responsible for the seconds 
        minutes: '5',  // responsible for the minutes
        secondsRemaining: 0,
        intervalHandle: 0,
        wrongIndexes: [],
        totalSecondsSpent: 0,
        secondsSpent: 0,
        minutesSpent: 0        
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
    console.log(event.target.value);
    let indexOfSpace = event.target.value.indexOf(" ") + 1;
    let word = event.target.value.substr(0, indexOfSpace - 1);
    let newstr = event.target.value.substring(indexOfSpace);
    console.log(newstr);
    console.log(word);
    newContent = newContent + (word + ' ');
    //console.log(event.target.value.indexOf(" ") + 1);
    //console.log(indexOf(event.target.value));
      //let str = event.target.value.substring(event.target.value.indexOf(" ") + 1);
      this.setState({
      	newContent: newContent,
        inputContent: newstr
      }, () => this.setCaretPosition(target, 0));

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
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text inserted-text">
                      { this.state.newContent}
                    </Card.Description>
                    <Input className="insert-spaces-input" value={this.state.inputContent} onChange={this.updateValue} />
                    <Button primary onClick={this.splitText}>Я прочитал</Button>
                  </Card.Content>
                </Card>:null
              }
              {this.state.splittedSentenceVisible ?
                <Card className="single-text-card single-fragments-card">
                  <Card.Content className="fragments-content recreate-text-content">
                    <h1 className="timer">{this.state.minutes}:{this.state.seconds}</h1>
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text">
                      {this.state.spllittedSentences.map((item, idx) =>
                          <p className={'recreate-text-sentence drag ' + this.state.wrongIndexes[idx]} 
                              draggable 
                              key = {idx}
                              onDragOver={() => this.onDragOver(idx)}
                              onDragStart={e => this.onDragStart(e, idx)}
                              onDragEnd={this.onDragEnd} >{item + '.'}

                          </p>
                      )}
                    </Card.Description>
                    <Button primary onClick={this.checkSentences}>Проверить</Button>
                    <Button primary onClick={this.showFinal}>Final</Button>
                  </Card.Content>
                </Card> : null
              } 
              {this.state.isResultVisible ?
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>                
                  <Card.Content className="fragments-content">
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text-final">
                      <h1>Поздравляем ! Задание выполнено</h1>
                      <h2>Потрачено {this.state.minutesSpent} минут {this.state.secondsSpent} секунд </h2>
                    </Card.Description>
                  </Card.Content>
                  <div className="fragment-variants">
                    <Button primary onClick={this.tryAgain}>Заново</Button>
                    <Button primary onClick={this.backToTexts}>Назад к текстам</Button>
                  </div> 
                </Card> : null
              }
              {this.state.isResultWrong ? 
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>                   
                  <Card.Content className="fragments-content">
                    <Card.Description className="single-text-card-description p-wrap fragment-description">
                      <h2>Время вышло</h2>
                    </Card.Description>
                  </Card.Content>
                  <div className="fragment-variants">
                    <Button primary onClick={this.tryAgain}>Заново</Button>
                    <Button primary onClick={this.backToTexts}>Назад к текстам</Button>
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