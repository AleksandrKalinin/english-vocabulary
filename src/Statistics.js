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
      isModalOpen: false,
      tabs: [
        {
        }
      ]
		}
	}



  componentDidMount() {
    console.log(this.props.store)
    this.setState({
      engToRusWords: this.props.store.exercises.engToRusWords.wordsTrained,
      rusToEngWords: this.props.store.exercises.rusToEngWords.wordsTrained,
      cardWords: this.props.store.exercises.cardWords.wordsTrained,
      constructWords: this.props.store.exercises.constructWords.wordsTrained,
      audioWords: this.props.store.exercises.audioWords.wordsTrained,
      trueOrFalseWords: this.props.store.exercises.trueOrFalseWords.wordsTrained,
      recreateTxt: this.props.store.exercises.recreateTxt.wordsTrained,
      recreateAudioTxt: this.props.store.exercises.recreateAudioTxt.wordsTrained,
      placeSpaces: this.props.store.exercises.placeSpaces.wordsTrained,
      fillTheGaps: this.props.store.exercises.fillTheGaps.wordsTrained,
      commonPhrases: this.props.store.exercises.commonPhrases.wordsTrained,  

      tests: this.props.store.tests,    
      loaded: true
    }, () => this.countTests(this.state.tests))


    axios.get('/words_full.json')
      .then(res => {
        let words = res.data;
        this.setState({ 
          words
        }, () => this.splitIntoArrays());
      })        
  }   

  countTests = (params) => {
    let percentage = params.reduce((a, b) => a.percentage + b.percentage) / this.state.tests.length;
    let mark = params.reduce((a, b) => a.score + b.score); 
    this.setState({
      percentage, mark, testsLoaded: true
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
      	tmp['Всего слов'] = lng;
      	tmp['Изучено слов'] = fin;
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

    this.applyFunction(ifInRange)    

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

    this.applyFunction(ifInRange)
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

    this.applyFunction(ifInRange);

  }

  inAllRange = () => {

    function ifInRange(item) {
      return item;
    }

    this.applyFunction(ifInRange)
  }  

  applyFunction = (func) => {

    let engToRusWords = this.props.store.exercises.engToRusWords.wordsTrained;
    let rusToEngWords = this.props.store.exercises.rusToEngWords.wordsTrained;
    let audioWords = this.props.store.exercises.audioWords.wordsTrained;
    let constructWords = this.props.store.exercises.constructWords.wordsTrained;
    let trueOrFalseWords = this.props.store.exercises.trueOrFalseWords.wordsTrained;
    let cardWords = this.props.store.exercises.cardWords.wordsTrained;
    let recreateTxt = this.props.store.exercises.recreateTxt.wordsTrained;
    let recreateAudioTxt = this.props.store.exercises.recreateAudioTxt.wordsTrained;
    let placeSpaces = this.props.store.exercises.placeSpaces.wordsTrained;
    let fillTheGaps = this.props.store.exercises.fillTheGaps.wordsTrained;
    let commonPhrases = this.props.store.exercises.commonPhrases.wordsTrained;

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

  }

  switchTab = (tab) => {
    if (tab[0] === 'today') {
      this.inDayRange(tab[1]);
    } else if (tab === 'week') {
      this.inWeekRange(tab[1]);
    } else if (tab === 'month') {
      this.inMonthRange(tab[1]);
    } else {
      this.inAllRange(tab[1]);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          {this.state.isModalOpen ?
            <div className="statistics-overlay">
              <div className="statistics-modal">
                
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
                    <Card.Header className="statistics-wrapper-header">Графики</Card.Header>
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
    		                <Bar dataKey="Всего слов" fill="#3281F0" />
    		                <Bar dataKey="Изучено слов" fill="#444444" />
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
                        <Line type="monotone" dataKey="Всего слов" stroke="#3281F0" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Изучено слов" stroke="#444444" />
                      </LineChart>
                    </Card.Description>                    
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Общая статистика</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, "today")} className="active">сегодня</a>
                      <a onClick={this.switchTab.bind(this, "week")}>за неделю</a>
                      <a onClick={this.switchTab.bind(this, "month")}>за месяц</a>
                      <a onClick={this.switchTab.bind(this, "all")}>за всё время</a>
                    </div>
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span>
                              <Icon name = 'plus square outline'/>
                            </span>
                            <h1>{this.props.store.wordsTotal}</h1>
                            <p>Слов всего</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'file text'/></span>
                            <h1>{this.props.store.exercisesComplete}</h1>
                            <p>Тренировок пройдено</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'gem outline'/></span>
                            <h1>{this.props.store.testsComplete}</h1>
                            <p>Тестов выполнено</p>
                          </div>                        
                      </div>
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>{this.props.store.totalScore}</h1>
                            <p>Баллов набрано</p>
                          </div>
                      </div>

                    </Card.Description>
                  </Card.Content>
                </Card>                
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Упражнений выполнено</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, "today")} className="active">сегодня</a>
                      <a onClick={this.switchTab.bind(this, "week")}>за неделю</a>
                      <a onClick={this.switchTab.bind(this, "month")}>за месяц</a>
                      <a onClick={this.switchTab.bind(this, "all")}>за всё время</a>
                    </div>
                    {this.state.loaded ?
                      <Card.Description className="statistics-inner-wrapper">
                        <div className="statistics-container">
                            <div className="statistics-item">
                              <span>
                                <Icon name = 'plus square outline'/>
                              </span>
                              <h1>{this.state.engToRusWords.length}</h1>
                              <p>Перевод с английского</p>
                            </div>
                            <div className="statistics-item">
                              <span><Icon name = 'file text'/></span>
                              <h1>{this.state.rusToEngWords.length}</h1>
                              <p>Перевод с русского</p>
                            </div>
                            <div className="statistics-item">
                              <span><Icon name = 'gem outline'/></span>
                              <h1>{this.state.audioWords.length}</h1>
                              <p>Аудиотренировка</p>
                            </div>                        
                        </div>
                        <div className="statistics-container">
                            <div className="statistics-item">
                              <span><Icon name = 'book'/></span>
                              <h1>{this.state.cardWords.length}</h1>
                              <p>Словарные карточки</p>
                            </div>
                            <div className="statistics-item">
                              <span><Icon name = 'question circle outline'/></span>
                              <h1>{this.state.trueOrFalseWords.length}</h1>
                              <p>Верно - неверно</p>
                            </div>
                            <div className="statistics-item">
                              <span><Icon name = 'check circle outline'/></span>
                              <h1>{this.state.constructWords.length}</h1>
                              <p>Конструктор слов</p>
                            </div>                        
                        </div>
                        <div className="statistics-container">
                          <div className="statistics-item" onClick={this.openModal}>
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.recreateTxt.length}</h1>
                            <p>Воспроизведи текст</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'check circle outline'/></span>
                            <h1>{this.state.recreateAudioTxt.length}</h1>
                            <p>Воспроизведи аудиотекст</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.fillTheGaps.length}</h1>
                            <p>Заполни пробелы</p>
                          </div>                        
                        </div>
                        <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.placeSpaces.length}</h1>
                            <p>Расставь пробелы</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.commonPhrases.length}</h1>
                            <p>Крылатые фразы</p>
                          </div>
                        </div>                                              
                      </Card.Description>
                    : null}
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Слов изучено</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, "today")} className="active">сегодня</a>
                      <a onClick={this.switchTab.bind(this, "week")}>за неделю</a>
                      <a onClick={this.switchTab.bind(this, "month")}>за месяц</a>
                      <a onClick={this.switchTab.bind(this, "all")}>за всё время</a>
                    </div>
                    {this.state.loaded ?
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span>
                              <Icon name = 'plus square outline'/>
                            </span>
                            <h1>{this.state.engToRusWords.length}</h1>
                            <p>Перевод с английского</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'file text'/></span>
                            <h1>{this.state.rusToEngWords.length}</h1>
                            <p>Перевод с русского</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'gem outline'/></span>
                            <h1>{this.state.audioWords.length}</h1>
                            <p>Аудиотренировка</p>
                          </div>                        
                      </div>
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>{this.state.cardWords.length}</h1>
                            <p>Словарные карточки</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.state.trueOrFalseWords.length}</h1>
                            <p>Верно - неверно</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'check circle outline'/></span>
                            <h1>{this.state.constructWords.length}</h1>
                            <p>Конструктор слов</p>
                          </div>                        
                      </div>             
                    </Card.Description>
                    : null}
                  </Card.Content>
                </Card>                
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Тесты</Card.Header>
                    <div className="statistics-menu">
                      <a onClick={this.switchTab.bind(this, ["test", "today"])} className="active">сегодня</a>
                      <a onClick={this.switchTab.bind(this, ["test", "week"])}>за неделю</a>
                      <a onClick={this.switchTab.bind(this, ["test", "month"])}>за месяц</a>
                      <a onClick={this.switchTab.bind(this, ["test", "all"])}>за всё время</a>
                    </div>     
                    {this.state.testsLoaded ?               
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                        <div className="statistics-item" onClick={this.openModal}>
                          <span><Icon name = 'book'/></span>
                          <h1>{this.state.tests.length}</h1>
                          <p>Тестов пройдено</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'check circle outline'/></span>
                          <h1>{this.state.percentage}</h1>
                          <p>Процент выполнения</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'question circle outline'/></span>
                          <h1>{this.state.mark}</h1>
                          <p>Баллов набрано</p>
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