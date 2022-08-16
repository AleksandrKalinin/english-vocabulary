import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Container, Label, List, Message} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Proverbs extends Component {
	constructor(props){
		super(props);
  		this.state = {

  		}
	}


  componentDidMount() {
    this.setStateOnStart();
  }


    startTraining = () =>{
      this.setState({
          isStarterVisible: false,
          isCardVisible: true
      })
    }

    shuffleArray = () =>{
      let currentArray = this.state.currentArray.slice();
      for (let i = currentArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
      }
    }



    continueTraining = () =>{
  	  let mistakeCount = this.state.mistakeCount;
  	  let negativeProverbs = this.state.negativeProverbs.slice();
  	  let positiveProverbs = this.state.positiveProverbs.slice();
      let id = this.state.id;
      let proverbs = this.state.proverbs;
      id = id + 1;
      if (id < 2) {
        const currentProverb = proverbs[id];
        const currentProverbName = proverbs[id].proverb;
        const currentTranslation = proverbs[id].translation;
        let currentArray = currentProverbName.split(" ");
        for (let i = currentArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
        }        
        this.setState({
            id,
            proverbs, 
            currentProverbName,
            currentTranslation,
            currentArray,
            constructedProverb: [],
            positiveProverbs,
            negativeProverbs,
            isCheckButtonVisible: false,
            isDKButtonVisible: true,
            isContinueButtonVisible: false,
            isResultWrong: false,
            nameClass: ''
        })
      }
      else {
        let exercise = {};
        exercise.id = uuidv4();
        exercise.date = new Date();
        exercise.score = this.state.positiveProverbs.length; 
        this.props.actions.updateCommonPhrases(exercise);       
        this.setState({
          isFinalVisible: true,
          isCardVisible: false,
          isStarterVisible: false,
          positiveProverbs,
          negativeProverbs           
        })
      }
  }

   setValue = (e) =>{
    let target = e.target;
    let parent = e.target.parentElement.children;
    var indexTarget = 0;
        while ( (target = target.previousElementSibling) ) {
          indexTarget++
    }
    let constructedProverb = this.state.constructedProverb;
    let currentArray = this.state.currentArray;
    currentArray.splice(indexTarget,1);
    constructedProverb.push(e.target.textContent);
    this.setState({
      constructedProverb
    })
    if(currentArray.length == 0){
      this.setState({
        isCheckButtonVisible: true,
        isDKButtonVisible: false
      })
    }
  } 

    removeValue = (e) =>{
      let target = e.target;
      let parent = e.target.parentElement.children;
      var indexTarget = 0;
          while ( (target = target.previousElementSibling) ) {
            indexTarget++
      }
      let constructedProverb = this.state.constructedProverb;
      let currentArray = this.state.currentArray;
      constructedProverb.splice(indexTarget,1);
      currentArray.push(e.target.textContent);
      this.setState({
        currentArray
      })
      if(currentArray.length > 0){
        this.setState({
          isCheckButtonVisible: false
        })
      }
  }

  dontKnow = (e) =>{
    let negativeProverbs = this.state.negativeProverbs;    
    let currentProverbName = this.state.currentProverbName;
    let currentArray = currentProverbName.split(" ");
    let constructedProverb = [];
    for (var i = 0; i < currentArray.length; i++) {
      constructedProverb.push(currentArray[i])
    }
    negativeProverbs.push(currentProverbName);
    this.setState({
      currentArray: [],
      isDKButtonVisible: false,
      isContinueButtonVisible: true,
      isCheckButtonVisible: false,
      constructedProverb
    })
  }

  checkProverb = (e) =>{
    let positiveProverbs = this.state.positiveProverbs.slice();
    let negativeProverbs = this.state.negativeProverbs.slice();
    var sentence = this.state.constructedProverb.slice().join(' ');
    if(sentence === this.state.currentProverbName){
      positiveProverbs.push(this.state.currentProverbName)
      this.setState({
        nameClass: 'audio-name-green',
        isContinueButtonVisible: true,
        isCheckButtonVisible: false,
        isDKButtonVisible: false,
        positiveProverbs
      })      
    }
    else {
      negativeProverbs.push(this.state.currentProverbName)
      this.setState({
        isContinueButtonVisible: true,
        isCheckButtonVisible: false,
        isDKButtonVisible: false,
        nameClass: 'audio-name-red',
        isResultWrong: true,
        negativeProverbs
      })      
    }
  }

  setStateOnStart = () => {
    this.setState({
      proverbs: [],
      id: 0,
      currentProverbName: '',
      currentTranslation: '',
      mistakeCount: 0,
      positiveProverbs: [],
      negativeProverbs: [],
      currentArray: [],
      isStarterVisible: true,
      isCardVisible: false,
      isFinalVisible: false,
      areButtonsVisible: false,
      isContinueButtonVisible: false,
      isCheckButtonVisible: false,
      isDKButtonVisible: true,
      constructedProverb: [],
      nameClass: '',
      isResultWrong: false      
    }, () => this.initialLoad())
  }

  initialLoad = () => {
    let id = this.state.id;
    axios.get('/proverbs.json')
      .then(res => {
        const proverbs = res.data;
        let random = [];
        while(random.length < 2) {
          var el = proverbs[Math.floor(Math.random() * proverbs.length)];
          if (random.indexOf(el) === -1) {
            random.push(el)
          };                
        }  
        const currentProverb = random[id];
        const currentProverbName = random[id].proverb;
        const currentTranslation = random[id].translation;
        let currentArray = currentProverbName.split(" ");
        for (let i = currentArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
        }                    
        this.setState({ 
            proverbs: random, 
            currentProverbName,
            currentTranslation,
            currentArray
          });
      })
  }

  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isStarterVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
          <div className="training-wrapper-image">
            <Image src='training/proverbs.jpg' />
          </div>  
            <Card.Content>
              <Card.Header>Составь слово</Card.Header>
              <Card.Description>
                <Button primary onClick={this.startTraining}>Начать тренировку</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       	<Container className="list-container">
       		<Card className="construct-card proverb-card">
	       		<Label>
              {this.state.currentTranslation}
            </Label>
              <div className={`proverb-result ${this.state.nameClass}`} >
                  {this.state.constructedProverb.map((item,index) =>
                      <span key={index} className="proverb-span" onClick={this.removeValue}>{item}</span>
                  )}
              </div>
              {this.state.isResultWrong ?
                <div className={`proverb-result audio-name-green`}>
                  {this.state.currentProverbName}
                </div> : null
              }
              <div className="fragment-variants">
                {this.state.currentArray.map((item, index) =>
                  <span onClick={this.setValue} key={index} className="fragment-span">{item}</span>
                )}
              </div>
              <div className="proverb-button-container">
              {this.state.isCheckButtonVisible ? 
                <Button primary onClick={this.checkProverb} >Проверить</Button> : null
              }
              {this.state.isDKButtonVisible ? 
                <Button primary onClick={this.dontKnow}>Не знаю</Button> :null
              }
              {this.state.isContinueButtonVisible ? 
                <Button primary onClick={this.continueTraining} >Продолжить</Button> : null
              }                
              </div>
       		</Card>
      	</Container> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>Результаты</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  {  (this.state.negativeProverbs.length !== 0 ) ?
                      <div className="answers-wrapper">
                        <List className="audio-list">
                        <h2>Верные ответы</h2>
                        {this.state.positiveProverbs.length ? this.state.positiveProverbs.map((item, index) => 
                            <List.Item key={index} ><span>{item}</span></List.Item>  
                          ) : null}
                       </List>
                        <List className="audio-list">
                        <h2>Неверные ответы</h2>
                        {this.state.negativeProverbs.map((item, index) => 
                            <List.Item key={index} ><span>{item}</span></List.Item>  
                          )}
                       </List>
                     </div>: 
                   <Message>
                      <Message.Header>Поздравляем!</Message.Header>
                      <p>
                        Все задания выполнены правильно
                      </p>
                   </Message> 
                  }
                  </Card.Description>
                  <Card.Description className="results-wrapper">
                    <div className="positive-results-wrapper"> 
                      <div className="positive-results">
                        {this.state.positiveProverbs.length}
                      </div>
                      <Label>Верно</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {2 - this.state.positiveProverbs.length}
                      </div> 
                      <Label>Неверно</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                    <Button primary onClick={this.setStateOnStart}>Продолжить</Button>
                    <Button primary><Link className="training-link" to="/training">К тренировкам</Link></Button>
                  </Button.Group>
                </Card.Content>
              </Card>          
        </Card.Group>          
           : null
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Proverbs);