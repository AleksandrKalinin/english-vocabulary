import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label, Menu, Dropdown } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition'
import { v4 as uuidv4 } from 'uuid';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class RecreateText extends Component {

	constructor(props){
		super(props);
		this.state = {
      texts: [],
      contentArray: [],
      areTextsVisible: false,
      isMenuVisible: false,
      isSingleTextVisible: false,
      isResultVisible: false,
      isResultWrong: false,
      negativeWords: [],
      positiveWords: [],
      content: '',
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
      minutesSpent: 0,
      categoryValue: ''
		}
	}

  initialLoad = () => {
    axios.get('/texts.json')
      .then(res => {
        let texts = res.data;
        let contentArray = [];
        texts.map((item, index) => contentArray.push(item.content) )
        this.setState({ 
          texts,
          contentArray
        }, () => this.makeTextsVisible());
      })
  }

  setStateOnStart = () => {
    this.setState({
      texts: [],
      contentArray: [],
      areTextsVisible: false,
      isMenuVisible: false,
      isSingleTextVisible: false,
      isResultVisible: false,
      isResultWrong: false,
      negativeWords: [],
      positiveWords: [],
      content: '',
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
    }, () => this.initialLoad())
  }


  componentDidMount() {
    this.setStateOnStart();   
  }   



    readMore = (id) =>{
      let texts = this.state.texts.slice();

      let title = texts[id].title;
      let content = texts[id].content;
      let image = texts[id].image
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        title,
        content,
        image
      })      
    }


    makeTextsVisible = () =>{
      this.setState({
        areTextsVisible: true        
      }, () => this.createMenuItems());
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
      this.setState({
        isSingleTextVisible: false,
        splittedSentenceVisible: true,
        spllittedSentences: currentStringArray,
        reservedSentences,
        wrongIndexes

      }, () => this.startCountDown())
    }  

    handleChange = (event) => {
     this.setState({
       minutes: event.target.value
     })
    }  

    tick = () => {
        var minutes = Math.floor(this.state.secondsRemaining / 60);
        var seconds = this.state.secondsRemaining - (minutes * 60);
        this.setState({
          minutes,
          seconds
        })
        if (seconds < 10) {
          this.setState({
            seconds: "0" + this.state.seconds,
          })
        }
        if (minutes < 10) {
          this.setState({
            value: "0" + minutes,
           })
        }
        if (minutes === 0 & seconds === 0) {
          let time = this.state.totalSecondsSpent;
          let minutesSpent = Math.floor(time / 60);
          let secondsSpent = this.state.totalSecondsSpent - (minutes * 60);
          clearInterval(this.state.intervalHandle);
          this.timeIsOut();
          this.setState({
            minutesSpent,
            secondsSpent
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
      wrongIndexes
    })

  }


  timeIsOut =()=>{
    this.setState({
      isResultWrong: true,
      splittedSentenceVisible: false
    })
  }

  showFinal = () =>{
      let time = this.state.totalSecondsSpent;
      let minutesSpent = Math.floor(time / 60);
      let secondsSpent = this.state.totalSecondsSpent - (minutesSpent * 60);
      let exercise = {};
      exercise.id = uuidv4();
      exercise.date = new Date();
      exercise.score = this.state.rightAnswers;
      this.props.updateRecreateTxt(exercise);
      clearInterval(this.state.intervalHandle);
      this.setState({
        isResultVisible: true,
        splittedSentenceVisible: false,
        minutesSpent,
        secondsSpent       
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
        minutes: '3',  // responsible for the minutes
        secondsRemaining: 0,
        intervalHandle: 0,
        wrongIndexes: [],
        totalSecondsSpent: 0,
        secondsSpent: 0,
        minutesSpent: 0        
      }) 
  }


    createMenuItems = () =>{
      let newItems = [];
      this.state.texts.map((item, i) =>
                    newItems.push({ 
                        key: item.id, 
                        text: item.difficulty, 
                        value: item.difficulty 
                     }))
      this.setState({
        options: newItems
      }, () => this.getUnique())
    } 

    getUnique = () => {
      var arr = this.state.options;
      var comp = 'text';
      const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
      this.setState({
        options: unique,
        isMenuVisible: true
      })    
    }  

    selectCategory = () =>{
      var options = this.state.options.slice();
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    menuChange = (e, { value }) => this.setState({ value }, () => this.selectCategory() ) 

  render() {

    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper fragments-wrapper">
              {this.state.isMenuVisible ?
                <Menu className="texts-menu" vertical>
                  <Menu.Item name='inbox' >
                    <Dropdown 
                      placeholder='Выберите уровень'
                      fluid
                      value={this.state.value} 
                      key={this.state.options.id}
                      clearable
                      search
                      selection
                      onChange = {this.menuChange}
                      options={this.state.options} 
                    />
                  </Menu.Item>
                </Menu> : null
              }          
              {(this.state.texts.length && this.state.areTextsVisible) ? 
              <Card.Group className="texts-cards" itemsPerRow={3} >
              {this.state.texts.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.difficulty) && 
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
                  <Button onClick={this.readMore.bind(this, item.id)} >Читать далее</Button>
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
                  <div className="fragment-variants recreate-text-buttons">
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
                  <div className="fragment-variants recreate-text-buttons">
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

function mapStateToProps(state) {
  return {store: state.exercisesReducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecreateText);