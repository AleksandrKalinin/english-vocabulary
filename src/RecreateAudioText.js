import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Icon, Menu, Dropdown} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import { Howl } from "howler";
import { v4 as uuidv4 } from 'uuid';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class RecreateAudioText extends Component {

	constructor(props){
		super(props);
		this.state = {
	      texts: [],
	      contentArray: [],
	      areTextsVisible: false,
	      isMenuVisible: false,
	      isSingleTextVisible: false,
        options: [],
        categoryValue: '',
	      isResultVisible: false,
	      isResultWrong: false,
        title: '',
	      content: '',
	      image: null,
        currentTrack: null,
        playing: false,
        seconds: '00',   // responsible for the seconds 
        minutes: '5',  // responsible for the minutes
        secondsRemaining: 0,
        intervalHandle: 0,
        wrongIndexes: [],
        totalSecondsSpent: 0,
        secondsSpent: 0,
        minutesSpent: 0,
        rightAnswers: 0
		}
	}



  componentDidMount() {
    axios.get('./audiotexts.json')
      .then(res => {
        let texts = res.data;
        this.setState({ 
          texts,
          areTextsVisible: true         
        }, () => this.createMenuItems());
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
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.selectCategory() )

    createTrack = (id) => {
      axios
        .get("tracks.json")
        .then((res) => {
          let currentTrack = new Howl({
            src: "tracks/" + res.data.slice(id - 1, id),
            html5: true,
            volume: 0.5 / 10
          });
          this.setState({
            currentTrack,
            audio: res.data
          }) 
        });    
    }

    readMore = (id) =>{
      let texts = this.state.texts.slice();
      let title = texts[id - 1].title;
      let content = texts[id - 1].content;
      let image = texts[id - 1].src;
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        title,
        content,
        image
      }, () => this.createTrack(id))       
    }


    backToTexts = () =>{
      this.setState({
        areTextsVisible: true,
        isSingleTextVisible: false,
        isMenuVisible: true,
        isResultVisible: false,
        isResultWrong: false,
        categoryValue: '',
        currentTrack: null,
        playing: false,
        seconds: '00',   // responsible for the seconds 
        minutes: '0.1',  // responsible for the minutes
        secondsRemaining: 0,
        intervalHandle: 0,
        wrongIndexes: [],
        totalSecondsSpent: 0,
        secondsSpent: 0,
        minutesSpent: 0,
        rightAnswers: 0,
        value: null        
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

  playText = () => {
    let playing = !this.state.playing;
    let currentTrack = this.state.currentTrack;
    if (playing) {
      currentTrack.play();
    } else {
      currentTrack.pause();
    }
    this.setState({
      playing,
      currentTrack
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
        splittedSentences: currentStringArray,
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
          let secondsSpent = this.state.totalSecondsSpent - (minutesSpent * 60);
          let intervalHandle = this.state.intervalHandle;
          clearInterval(intervalHandle);
          this.timeIsOut();
          this.setState({
            minutesSpent,
            secondsSpent,
            intervalHandle
          })
        }
        this.setState({
          secondsRemaining: this.state.secondsRemaining - 1,
          totalSecondsSpent: this.state.totalSecondsSpent + 1
        })
 
    }
    startCountDown = () => {
        let intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.setState({
          intervalHandle,
          secondsRemaining: time * 60
        })
    }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.splittedSentences[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  onDragOver = index => {
    const draggedOverItem = this.state.splittedSentences[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    let items = this.state.splittedSentences.filter(item => item !== this.draggedItem);
    items.splice(index, 0, this.draggedItem);
    this.setState({ splittedSentences: items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  checkSentences = () =>{
    let reservedSentences = this.state.reservedSentences;
    let splittedSentences = this.state.splittedSentences;
    let wrongIndexes = this.state.wrongIndexes.slice();
    let rightAnswers = 0;
    let wrongCount = 0;
    for (var i = 0; i < splittedSentences.length; i++) {
      if (splittedSentences[i] !== reservedSentences[i]) {
        wrongIndexes[i] = "recreate-text-wrong";
        wrongCount++;
      }
      else{
        wrongIndexes[i] = "recreate-text-right"
        rightAnswers++;
      }
    }
    if (wrongCount === 0) {
      this.showFinal();
    }

    this.setState({
      wrongIndexes,
      rightAnswers
    })
  }


  timeIsOut =() => {
    this.checkSentences();
    this.setState({
      isResultWrong: true,
      splittedSentenceVisible: false
    })
  }

  showFinal = () =>{
    let intervalHandle = this.state.intervalHandle;
    let time = this.state.totalSecondsSpent;
    let minutesSpent = Math.floor(time / 60);
    let secondsSpent = this.state.totalSecondsSpent - (minutesSpent * 60);
    let exercise = {};
    exercise.id = uuidv4();
    exercise.date = new Date();
    exercise.score = this.state.rightAnswers;
    this.props.actions.updateRecreateAudioTxt(exercise);
    this.props.actions.updateExerciseComplete(1);
    this.props.actions.updateTotalScore(this.state.rightAnswers);
    clearInterval(intervalHandle);
    this.setState({
      isResultVisible: true,
      splittedSentenceVisible: false,
      minutesSpent,
      secondsSpent,
      intervalHandle        
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
                <Dropdown 
                  placeholder='Выберите уровень'
                  fluid
                  value={this.state.value} 
                  key={this.state.options.id}
                  clearable
                  search
                  selection
                  onChange = {this.handleChange}
                  options={this.state.options} 
                />
              </Menu.Item>
            </Menu> : null
          }         
              {(this.state.areTextsVisible) ? 
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
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text display-none">
                      { this.state.content}
                    </Card.Description>
                    {this.state.playing ?
                      <div className="recreate-text-icon" onClick={this.playText}>
                        <Icon size="large" name="pause"></Icon>
                      </div>: null
                    }
                    {!this.state.playing ?
                      <div className="recreate-text-icon" onClick={this.playText}>
                        <Icon size="large" name="play"></Icon>
                      </div>: null
                    }
                    <div className="buttons-wrapper">
	                    <Button primary onClick={this.splitText}>Я прослушал</Button>
           	
                    </div>
                  </Card.Content>
                </Card>:null
              }
              {this.state.splittedSentenceVisible ?
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>                
                  <Card.Content className="fragments-content recreate-text-content">
                    <h1 className="timer">{this.state.minutes}:{this.state.seconds}</h1>
                    <Card.Description className="single-text-card-description p-wrap fragment-description recreate-text">
                      {this.state.splittedSentences.map((item, idx) =>
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
                      <div>
                        <h2>Время вышло</h2>
                        <h2>Правильно расставлено {this.state.rightAnswers} из {this.state.splittedSentences.length} предложений</h2> 
                      </div>                      
                    </Card.Description>
                  </Card.Content>
                  <div className="fragment-variants recreate-text-buttons">
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

export default connect(mapStateToProps, mapDispatchToProps)(RecreateAudioText);