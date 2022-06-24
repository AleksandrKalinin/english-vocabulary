import React, { Component, Fragment } from 'react';
import {  List, Icon} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition'


class Settings extends Component {

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

      email: "user1233",
      password: 69691231

		}
	}



  componentDidMount() {
    axios.get('/working.json')
      .then(res => {
        let words = res.data;

        this.setState({ 
          words
        });
      })        
  }   




  render() {

    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="settings-wrapper">
            <List className="settings-list"> 

              <List.Item> <Icon name='user circle' size='' /> 
                          <span className="settings-item-title">Аккаунт</span>
                          <div className="settings-item-wrapper">
                            <p>Email: {this.state.email}</p>
                            <p>Password: {this.state.password}</p>
                          </div>
              </List.Item>
              <List.Item> 
                <Icon name='settings' size='' />
                <span className="settings-item-title">Настройки темы</span>
              </List.Item>
              <List.Item> 
                <Icon name='sound' size='' />
                
                 <span className="settings-item-title">Настройки звука</span>
              </List.Item>
            </List>
          </div>
        </div>
        <footer></footer>
      </Fragment>
	);
  }
}

export default Settings;