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
      words: [],
      contentArray: [],
      areTextsVisible: true,
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
    console.log(this.props.store)
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
  		nameArrays: nameArrays,
  		barChartData: finalData
  	}, () => this.getYesterdaysDate())     

  }

	getYesterdaysDate = () => {
    let data = this.state.barChartData.slice(0,6);
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dateArray = [];		
    var date = new Date();
    let i = 0;
    while ( i < 6) {
		  date.setDate(date.getDate() - 1);
      //date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	    dateArray.push(days[date.getDay()]); 
	    i++;  	
    }
    for (var j = 0; j < data.length; j++) {
      data[j]["name"] = dateArray[j]
    }
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
              {this.state.isMenuVisible ?
                <Menu className="texts-menu" vertical>
                  <Menu.Item>
                    <Button onClick={this.getYesterdaysDate}>Press</Button>
                  </Menu.Item>
                </Menu> : null 
              }          
              {this.state.areTextsVisible ?
              <Card.Group className="texts-cards statistics-wrapper" itemsPerRow={1} >
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Графики</Card.Header>
                    <Card.Description className="statistics-inner-wrapper">
    		              <BarChart
    		                width={800}
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
                    <Card.Header className="statistics-wrapper-header">Результаты</Card.Header>
                    <div className="statistics-menu">
                    	<a className="active">сегодня</a>
                    	<a>за неделю</a>
                    	<a>за месяц</a>
                      <a>за всё время</a>
                    </div>
                    <Card.Description className="statistics-inner-wrapper">
                    	<div className="statistics-container">
	                      	<div className="statistics-item">
	                      		<span>
	                      			<Icon name = 'plus square outline'/>
	                      		</span>
	                      		<h1>24</h1>
	                      		<p>Слов добавлено</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'file text'/></span>
	                      		<h1>3</h1>
	                      		<p>Упражнений выполнено</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'gem outline'/></span>
	                      		<h1>5</h1>
	                      		<p>Фраз выучено</p>
	                      	</div>                    		
                    	</div>
                    	<div className="statistics-container">
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'book'/></span>
	                      		<h1>14</h1>
	                      		<p>Страниц прочитано</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'question circle outline'/></span>
	                      		<h1>1</h1>
	                      		<p>Верно - неверно</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'check circle outline'/></span>
	                      		<h1>1</h1>
	                      		<p>Тестов пройдено</p>
	                      	</div>                    		
                    	</div>
                      <div className="statistics-container">
                          <div className="statistics-item">
                            <span><Icon name = 'book'/></span>
                            <h1>14</h1>
                            <p>Страниц прочитано</p>
                          </div>
                          <div className="statistics-item">
                            <span><Icon name = 'question circle outline'/></span>
                            <h1>1</h1>
                            <p>Верно - неверно</p>
                          </div>
                      </div>                                 	                      	
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header className="statistics-wrapper-header">Слова</Card.Header>
                    <Card.Description className="statistics-inner-wrapper">
                    	<div className="statistics-container">
	                      	<div className="statistics-item" onClick={this.openModal}>
	                      		<span><Icon name = 'book'/></span>
	                      		<h1>1210</h1>
	                      		<p>Слов всего</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'check circle outline'/></span>
	                      		<h1>54</h1>
	                      		<p>Слов изучено</p>
	                      	</div>
	                      	<div className="statistics-item">
	                      		<span><Icon name = 'question circle outline'/></span>
	                      		<h1>1156</h1>
	                      		<p>Слов на изучении</p>
	                      	</div>                    		
                    	</div>
                    </Card.Description>
                  </Card.Content>
                </Card>                
              </Card.Group>: null
             } 
          </div>
        </div>
        <footer></footer>
      </Fragment>
	);
  }
}

function mapStateToProps(state){
  return {store: state.reducer};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Statistics);