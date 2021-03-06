import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label, Menu} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition'
import {LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Statistics extends Component {

	constructor(props){
		super(props);
		this.state = {
      loaded: false,
      testsLoaded: false,
      wordsLoaded: false,
      words: [],
      contentArray: [],
      isMenuVisible: true,
      isSingleTextVisible: false,
      isResultVisible: false,
      isResultWrong: false,
      negativeWords: [],
      positiveWords: [],
      content: '',
      image: null,
      spllittedSentences: [],
      reservedSentences: [],
      seconds: '00',   
      minutes: '5',  
      secondsRemaining: 0,
      intervalHandle: 0,
      wrongIndexes: [],
      totalSecondsSpent: 0,
      secondsSpent: 0,
      minutesSpent: 0,
      nameArrays: null,
      barChartData: [],
      lineChartData: [],
      active: "#F9B707",
      isModalOpen: false
		}
	}

  componentDidMount() {
      let learnedWords = {}
      learnedWords.engToRusWords = this.props.store.exercises.engToRusWords;
      learnedWords.rusToEngWords = this.props.store.exercises.rusToEngWords;
      learnedWords.cardWords = this.props.store.exercises.cardWords;
      learnedWords.constructWords = this.props.store.exercises.constructWords;
      learnedWords.audioWords = this.props.store.exercises.audioWords;
      learnedWords.trueOrFalseWords = this.props.store.exercises.trueOrFalseWords;
    this.setState({
      learnedWords,
      engToRusWords: this.props.store.exercises.engToRusWords,
      rusToEngWords: this.props.store.exercises.rusToEngWords,
      cardWords: this.props.store.exercises.cardWords,
      constructWords: this.props.store.exercises.constructWords,
      audioWords: this.props.store.exercises.audioWords,
      trueOrFalseWords: this.props.store.exercises.trueOrFalseWords,
      recreateTxt: this.props.store.exercises.recreateTxt,
      recreateAudioTxt: this.props.store.exercises.recreateAudioTxt,
      placeSpaces: this.props.store.exercises.placeSpaces,
      fillTheGaps: this.props.store.exercises.fillTheGaps,
      commonPhrases: this.props.store.exercises.commonPhrases,

      tests: this.props.store.tests,    
      loaded: true
    }, () => { this.countTests(this.state.tests); 
               this.countWords(this.state.learnedWords.engToRusWords, "engToRusWordsTotal");
               this.countWords(this.state.learnedWords.rusToEngWords, "rusToEngWordsTotal");
               this.countWords(this.state.learnedWords.cardWords, "cardWordsTotal");
               this.countWords(this.state.learnedWords.constructWords, "constructWordsTotal");
               this.countWords(this.state.learnedWords.audioWords, "audioWordsTotal");
               this.countWords(this.state.learnedWords.trueOrFalseWords, "trueOrFalseWordsTotal");
               this.setState({ wordsLoaded: true})               
             })


    axios.get('/words_full.json')
      .then(res => {
        let words = res.data;
        this.setState({ 
          words
        }, () => this.splitIntoArrays());
      })        
  }   

  countTests = (params) => {
    let percentage, mark;
    if (params.length > 1) {
      percentage = params.reduce((a, b) => a.percentage + b.percentage) / this.state.tests.length;
      mark = params.reduce((a, b) => a.score + b.score);
    } else if (params.length === 1){
      percentage = params[0].percentage;
      mark = params[0].score;
    } else {
      percentage = 0;
      mark = 0;
    }
    this.setState({
      percentage, mark, testsLoaded: true
    }) 
  }

  countWords = (params, name) => {
    let total;
    if (params.length > 1) {
      total = params.reduce((a, b) => a.wordsTrained.length + b.wordsTrained.length);
    } else if (params.length === 1) {
      total = params[0].wordsTrained.length;
    } else {
      total = 0;
    }    
    this.setState({
      [name]: total
    })
  }

  splitIntoArrays = () =>{
    var nameArrays = Object.create(null);
    let words = this.state.words.slice();
    words.forEach(function(word) {
      var nameArray = nameArrays[word.category];
      if (!nameArray) {
        nameArray = nameArrays[word.category] = [];
      }
      nameArray.push(word);
    });
  	let names = Object.keys(nameArrays);

  	let values = Object.values(nameArrays);
  	let finalData = [];
  	for (var i = 0; i < names.length; i++) {
  		let tmp = {};
  		let lng = values[i].length;
  		let fin = Math.floor(lng/3);
      	tmp['?????????? ????????'] = lng;
      	tmp['?????????????? ????????'] = fin;
      	tmp['name'] = names[i];
      	finalData.push(tmp);
  	}

  	this.setState({
  		nameArrays,
  		barChartData: finalData
  	}, () => this.getYesterdaysDate())     

  }

	getYesterdaysDate = () => {

    let data = this.state.barChartData.slice(0,7);
    let params = this.state.barChartData.slice(0,7);
    const sorter = {
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6,
      "sunday": 7
    }

    let newParams = params.sort((a, b) => {
      let item1 = a.name.toLowerCase();
      let item2 = b.name.toLowerCase();
      return sorter[item1] - sorter[item2];
    });  


		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let dateArray = [];		
    var date = new Date();
    let i = 0;
    while ( i < 7) {
		  date.setDate(date.getDate() - 1);
      //date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	    dateArray.push(days[date.getDay()]); 
	    i++;  	
    }
    for (var j = 0; j < data.length; j++) {
      data[j]["name"] = dateArray[j]
    }
    data.sort((a, b) => {
      let item1 = a.name.toLowerCase();
      let item2 = b.name.toLowerCase();
      return sorter[item1] - sorter[item2];
    });      

    this.setState({
      lineChartData: data
    })
	}

  consoleState = () =>{
    console.log(this.state);
  }

  openModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  inDayRange = (option) => {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth();
    let day = current.getDate();
    let today = new Date(`${year}-${month + 1}-${day}`);

    function ifInRange(item) {
      let date = new Date(item.date);
      return (date.getTime() <= today.getTime() + 86400000 && date.getTime() >= today.getTime())
    }

    this.applyFunction(ifInRange, option)    

  }

  inWeekRange = (option) => {

    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth();
    let day = current.getDate();
    let weekDay = current.getDay();
    let weekDays = 7;
    let start = new Date(`${year}-${month + 1}-${day}`);
    
    function ifInRange(item) {
      let date = new Date(item.date);
      return ( 
        date.getTime() <= (start.getTime() + (86400000 * (7 - weekDay))) && date.getTime() >= (start.getTime() - (86400000 * weekDay))
      )
    }

    this.applyFunction(ifInRange, option)
  }

  inMonthRange = (option) => {

    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth();
    let day = current.getDate();
    let totalDays = daysInMonth(month, year);
    let start = new Date(`${year}-${month + 1}-${1}`);

    function ifInRange(item) {
      let date = new Date(item.date);
      return (date.getTime() <= start.getTime() + (86400000 * totalDays) && date.getTime() >= start.getTime())
    }

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    this.applyFunction(ifInRange, option);

  }

  inAllRange = (option) => {

    function ifInRange(item) {
      return item;
    }

    this.applyFunction(ifInRange, option)
  }  

  applyFunction = (func, option) => {

    let engToRusWords = this.props.store.exercises.engToRusWords;
    let rusToEngWords = this.props.store.exercises.rusToEngWords;
    let audioWords = this.props.store.exercises.audioWords;
    let constructWords = this.props.store.exercises.constructWords;
    let trueOrFalseWords = this.props.store.exercises.trueOrFalseWords;
    let cardWords = this.props.store.exercises.cardWords;
    let recreateTxt = this.props.store.exercises.recreateTxt;
    let recreateAudioTxt = this.props.store.exercises.recreateAudioTxt;
    let placeSpaces = this.props.store.exercises.placeSpaces;
    let fillTheGaps = this.props.store.exercises.fillTheGaps;
    let commonPhrases = this.props.store.exercises.commonPhrases;

    let tests = this.props.store.tests;

    if (option === 'exercise') {
      engToRusWords = engToRusWords.filter(func);
      rusToEngWords = rusToEngWords.filter(func);
      audioWords = audioWords.filter(func);
      constructWords = constructWords.filter(func);
      trueOrFalseWords = trueOrFalseWords.filter(func);
      cardWords = cardWords.filter(func);
      recreateTxt = recreateTxt.filter(func);
      recreateAudioTxt = recreateAudioTxt.filter(func);
      placeSpaces = placeSpaces.filter(func);
      fillTheGaps = fillTheGaps.filter(func);
      commonPhrases = commonPhrases.filter(func);    

      this.setState({
        engToRusWords, rusToEngWords, audioWords, constructWords, trueOrFalseWords, cardWords, recreateTxt, recreateAudioTxt, placeSpaces, fillTheGaps, commonPhrases
      })
    } else if (option === 'test') {
        tests = tests.filter(func);
        this.setState({
          tests
        }, () => this.countTests(this.state.tests))
    } else if (option === 'word') {
        let learnedWords = {}
        learnedWords.engToRusWords = this.props.store.exercises.engToRusWords;
        learnedWords.rusToEngWords = this.props.store.exercises.rusToEngWords;
        learnedWords.cardWords = this.props.store.exercises.cardWords;
        learnedWords.constructWords = this.props.store.exercises.constructWords;
        learnedWords.audioWords = this.props.store.exercises.audioWords;
        learnedWords.trueOrFalseWords = this.props.store.exercises.trueOrFalseWords;
        for (var prop in learnedWords) {
          learnedWords[prop] = learnedWords[prop].filter(func);
          this.countWords(learnedWords[prop], prop + "Total");
        }
    }

  }

  switchTab = (tab) => {
    if (tab[1] === 'today') {
      this.inDayRange(tab[0]);
    } else if (tab[1] === 'week') {
      this.inWeekRange(tab[0]);
    } else if (tab[1] === 'month') {
      this.inMonthRange(tab[0]);
    } else {
      this.inAllRange(tab[0]);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          {this.state.isModalOpen ?
            <div className="statistics-overlay">
              <div className="statistics-modal">
                  <BarChart
                    width={600}
                    height={350}
                    data={this.state.barChartData}
                    margin={{
                      top: 20, right: 20, left: 20, bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="?????????? ????????" fill="#3281F0" />
                  </BarChart>                
              </div>
            </div>
          : null}
          <TopMenu></TopMenu>
          <div className="texts-wrapper fragments-wrapper">
              <Menu className="texts-menu" vertical>
                <Menu.Item>
                  <Button onClick={this.consoleState}>Press</Button>
                </Menu.Item>
              </Menu> : null 
              <Card.Group className="texts-cards statistics-wrapper" itemsPerRow={1} >
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">??????????????</Card.Header>
                    <Card.Description className="statistics-inner-wrapper">
    		              <BarChart
    		                width={1200}
    		                height={450}
    		                data={this.state.barChartData}
    		                margin={{
    		                  top: 20, right: 30, left: 20, bottom: 5,
    		                }}
    		              >
    		                <CartesianGrid strokeDasharray="3 3" />
    		                <XAxis dataKey="name" />
    		                <YAxis />
    		                <Tooltip />
    		                <Legend />
    		                <Bar dataKey="?????????? ????????" fill="#3281F0" />
    		                <Bar dataKey="?????????????? ????????" fill="#444444" />
    		              </BarChart>
                    </Card.Description>
                    <Card.Description className="statistics-inner-wrapper">
                      <LineChart
                        width={800}
                        height={450}
                        data={this.state.lineChartData}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="?????????? ????????" stroke="#3281F0" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="?????????????? ????????" stroke="#444444" />
                      </LineChart>
                    </Card.Description>                    
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">?????????? ????????????????????</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, ["main", "today"])} className="active">??????????????</a>
                      <a onClick={this.switchTab.bind(this, ["main", "week"])}>???? ????????????</a>
                      <a onClick={this.switchTab.bind(this, ["main", "month"])}>???? ??????????</a>
                      <a onClick={this.switchTab.bind(this, ["main", "all"])}>???? ?????? ??????????</a>
                    </div>
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span>
                              <Icon name = 'plus square outline'/>
                            </span>
                            <h1>{this.props.store.wordsTotal}</h1>
                            <p>???????? ??????????</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'file text'/></span>
                            <h1>{this.props.store.exercisesComplete}</h1>
                            <p>???????????????????? ????????????????</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'gem outline'/></span>
                            <h1>{this.props.store.testsComplete}</h1>
                            <p>???????????? ??????????????????</p>
                          </div>                        
                      </div>
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>{this.props.store.totalScore}</h1>
                            <p>???????????? ??????????????</p>
                          </div>
                      </div>

                    </Card.Description>
                  </Card.Content>
                </Card>                
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">???????????????????? ??????????????????</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, ["exercise", "today"])} className="active">??????????????</a>
                      <a onClick={this.switchTab.bind(this, ["exercise", "week"])}>???? ????????????</a>
                      <a onClick={this.switchTab.bind(this, ["exercise", "month"])}>???? ??????????</a>
                      <a onClick={this.switchTab.bind(this, ["exercise", "all"])}>???? ?????? ??????????</a>
                    </div>
                    {this.state.loaded ?
                      <Card.Description className="statistics-inner-wrapper">
                        <div className="statistics-container">
                            <div className="statistics-item" onClick={this.openModal}>
                              <span>
                                <Icon name = 'plus square outline'/>
                              </span>
                              <h1>{this.state.engToRusWords.length}</h1>
                              <p>?????????????? ?? ??????????????????????</p>
                            </div>
                            <div className="statistics-item" onClick={this.openModal}>
                              <span><Icon name = 'file text'/></span>
                              <h1>{this.state.rusToEngWords.length}</h1>
                              <p>?????????????? ?? ????????????????</p>
                            </div>
                            <div className="statistics-item" onClick={this.openModal}>
                              <span><Icon name = 'gem outline'/></span>
                              <h1>{this.state.audioWords.length}</h1>
                              <p>??????????????????????????????</p>
                            </div>                        
                        </div>
                        <div className="statistics-container" onClick={this.openModal}>
                            <div className="statistics-item">
                              <span><Icon name = 'book'/></span>
                              <h1>{this.state.cardWords.length}</h1>
                              <p>?????????????????? ????????????????</p>
                            </div>
                            <div className="statistics-item" onClick={this.openModal}>
                              <span><Icon name = 'question circle outline'/></span>
                              <h1>{this.state.trueOrFalseWords.length}</h1>
                              <p>?????????? - ??????????????</p>
                            </div>
                            <div className="statistics-item" onClick={this.openModal}>
                              <span><Icon name = 'check circle outline'/></span>
                              <h1>{this.state.constructWords.length}</h1>
                              <p>?????????????????????? ????????</p>
                            </div>                        
                        </div>
                        <div className="statistics-container">
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.recreateTxt.length}</h1>
                            <p>???????????????????????? ??????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'check circle outline'/></span>
                            <h1>{this.state.recreateAudioTxt.length}</h1>
                            <p>???????????????????????? ????????????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.fillTheGaps.length}</h1>
                            <p>?????????????? ??????????????</p>
                          </div>                        
                        </div>
                        <div className="statistics-container">
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.placeSpaces.length}</h1>
                            <p>???????????????? ??????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.commonPhrases.length}</h1>
                            <p>???????????????? ??????????</p>
                          </div>
                        </div>                                              
                      </Card.Description>
                    : null}
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">???????? ??????????????</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, ["word", "today"])} className="active">??????????????</a>
                      <a onClick={this.switchTab.bind(this, ["word", "week"])}>???? ????????????</a>
                      <a onClick={this.switchTab.bind(this, ["word", "month"])}>???? ??????????</a>
                      <a onClick={this.switchTab.bind(this, ["word", "all"])}>???? ?????? ??????????</a>
                    </div>
                    {this.state.wordsLoaded ?
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                          <div className="statistics-item" onClick={this.openModal}>
                            <span>
                              <Icon name = 'plus square outline'/>
                            </span>
                            <h1>{this.state.engToRusWordsTotal}</h1>
                            <p>?????????????? ?? ??????????????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'file text'/></span>
                            <h1>{this.state.rusToEngWordsTotal}</h1>
                            <p>?????????????? ?? ????????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'gem outline'/></span>
                            <h1>{this.state.audioWordsTotal}</h1>
                            <p>??????????????????????????????</p>
                          </div>                        
                      </div>
                      <div className="statistics-container">
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.cardWordsTotal}</h1>
                            <p>?????????????????? ????????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.trueOrFalseWordsTotal}</h1>
                            <p>?????????? - ??????????????</p>
                          </div>
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'check circle outline'/></span>
                            <h1>{this.state.constructWordsTotal}</h1>
                            <p>?????????????????????? ????????</p>
                          </div>                        
                      </div>             
                    </Card.Description>
                    : null}
                  </Card.Content>
                </Card>                
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">??????????</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, ["test", "today"])} className="active">??????????????</a>
                      <a onClick={this.switchTab.bind(this, ["test", "week"])}>???? ????????????</a>
                      <a onClick={this.switchTab.bind(this, ["test", "month"])}>???? ??????????</a>
                      <a onClick={this.switchTab.bind(this, ["test", "all"])}>???? ?????? ??????????</a>
                    </div>     
                    {this.state.testsLoaded ?               
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                        <div className="statistics-item" onClick={this.openModal}>
                          <span><Icon name = 'book'/></span>
                          <h1>{this.state.tests.length}</h1>
                          <p>???????????? ????????????????</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'check circle outline'/></span>
                          <h1>{this.state.percentage}</h1>
                          <p>?????????????? ????????????????????</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'question circle outline'/></span>
                          <h1>{this.state.mark}</h1>
                          <p>???????????? ??????????????</p>
                        </div>                        
                      </div>
                    </Card.Description>
                    : null }
                  </Card.Content>
                </Card>                                
              </Card.Group>
          </div>
        </div>
        <footer></footer>
      </Fragment>
	);
  }
}

function mapStateToProps(state){
  return {store: state.exercisesReducer};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Statistics);