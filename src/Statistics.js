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
      engToRusWords: this.props.store.engToRusWords,
      rusToEngWords: this.props.store.rusToEngWords,
      cardWords: this.props.store.cardWords,
      constructWords: this.props.store.constructWords,
      audioWords: this.props.store.audioWords,
      trueOrFalseWords: this.props.store.trueOrFalseWords,
      loaded: true
    })
    axios.get('/words_full.json')
      .then(res => {
        let words = res.data;
        this.setState({ 
          words
        }, () => this.splitIntoArrays());
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

  inDayRange = () => {
    let engToRusWords = this.props.store.engToRusWords;
    let rusToEngWords = this.props.store.rusToEngWords;
    let audioWords = this.props.store.audioWords;
    let constructWords = this.props.store.constructWords;
    let trueOrFalseWords = this.props.store.trueOrFalseWords;
    let cardWords = this.props.store.cardWords;

    let current = new Date();
    console.log(current);
    let year = current.getFullYear();
    let month = current.getMonth();
    let day = current.getDate();
    let today = new Date(`${year}-${month + 1}-${day}`);

    engToRusWords = engToRusWords.filter(ifInRange);
    rusToEngWords = rusToEngWords.filter(ifInRange);
    audioWords = audioWords.filter(ifInRange);
    constructWords = constructWords.filter(ifInRange);
    trueOrFalseWords = trueOrFalseWords.filter(ifInRange);
    cardWords = cardWords.filter(ifInRange);

    function ifInRange(item) {
      let date = new Date(item.date);
      return (date.getTime() <= today.getTime() + 86400000 && date.getTime() >= today.getTime())
    }

    this.setState({
      engToRusWords, rusToEngWords, audioWords, constructWords, trueOrFalseWords, cardWords
    })

    console.log(engToRusWords);

  }

  inWeekRange = () => {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth();
    let day = current.getDate();
    let weekDay = current.getDay();
    let weekDays = 7;
    console.log(weekDay);
    let start = new Date(`${year}-${month + 1}-${day}`);
    function ifInRange(item) {
      let date = new Date(item.date);
      return (date.getTime() <= start.getTime() + (86400000 * (7 - weekDay)) && date.getTime() >= start.getTime() - (86400000 * (7 - weekDay)))
    }
  }

  inMonthRange = () => {
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
  }

  inAllRange = () => {

  }  

  switchTab = (tab) => {
    if (tab === 'today') {
      this.inDayRange();
    } else if (tab === 'week') {
      this.inWeekRange();
    } else if (tab === 'month') {
      this.inMonthRange();
    } else {
      this.inAllRange();
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
                    	<a className="active">сегодня</a>
                    	<a>за неделю</a>
                    	<a>за месяц</a>
                      <a>за всё время</a>
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
                            <h1>{this.props.store.recreateTxt}</h1>
                            <p>Воспроизведи текст</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'check circle outline'/></span>
                            <h1>{this.props.store.recreateAudioTxt}</h1>
                            <p>Воспроизведи аудиотекст</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.props.store.fillTheGaps}</h1>
                            <p>Заполни пробелы</p>
                          </div>                        
                        </div>
                        <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>{this.props.store.placeSpaces}</h1>
                            <p>Расставь пробелы</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>{this.props.store.commonPhrases}</h1>
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
                      <a className="active">сегодня</a>
                      <a>за неделю</a>
                      <a>за месяц</a>
                      <a>за всё время</a>
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
                      <a className="active">сегодня</a>
                      <a>за неделю</a>
                      <a>за месяц</a>
                      <a>за всё время</a>
                    </div>                    
                    <Card.Description className="statistics-inner-wrapper">
                      <div className="statistics-container">
                        <div className="statistics-item" onClick={this.openModal}>
                          <span><Icon name = 'book'/></span>
                          <h1>{this.props.store.testsComplete}</h1>
                          <p>Тестов пройдено</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'check circle outline'/></span>
                          <h1>{this.props.store.testsRate}</h1>
                          <p>Процент выполнения</p>
                        </div>
                        <div className="statistics-item">
                          <span><Icon name = 'question circle outline'/></span>
                          <h1>{this.props.store.testsScore}</h1>
                          <p>Баллов набрано</p>
                        </div>                        
                      </div>
                    </Card.Description>
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