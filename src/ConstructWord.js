import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, Container, Label, List, Message, TextArea} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';
import './style.css';
import {Link} from "react-router-dom";

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class ConstructWord extends Component {

	constructor(props){
		super(props);
    	this.btn = React.createRef();
  		this.state = {

  		}
	}

  componentDidMount() {
    this.setStateOnStart();
  }

    setStateOnStart = () => {
      this.setState({
        words: [],
        negativeWords: [],
        positiveWords: [],
        id: 0,
        currentWord: '',
        currentFullWord: null,
        currentTranslation: '',
        currentMeaning: '',
        isStarterVisible: true,
        isCardVisible: false,
        isFinalVisible: false,
        inputValue: null,
        nameArray: [],
        wordNameArray: [],
        nameArrayId: 0,
        currentValue: '',
        search: '',
        currentImage: null,
        areButtonsVisible: true,
        isImageVisible: false,
        wordId: 0,
        mistakeCount: 0,
        animationState: false,
        fade: false        
      }, () => this.initialLoad())
    }

    initialLoad = () => {
      var id = this.state.id;
      axios.get('/vocabulary2.json')
      .then(res => {
        const words = res.data;
        const currentFullWord = words[id];
        const currentWord = words[id].name;
        const currentTranslation = words[id].translation;
        const currentImage = words[id].image;
        const currentMeaning = words[id].meaning;
        const nameArray = currentWord.split('');
        const randomNameArray = currentWord.split('');
        for (let i = randomNameArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [randomNameArray[i], randomNameArray[j]] = [randomNameArray[j], randomNameArray[i]];
        }
        const wordNameArray = [];
        for (var i = 0; i < nameArray.length; i++) {
          wordNameArray.push(' ');
        }
        this.setState({ 
          words, 
          currentWord,
          currentTranslation,
          currentImage,
          currentMeaning,
          randomNameArray,
          nameArray,
          wordNameArray,
          currentFullWord
          });
      })
      document.body.addEventListener("keydown", this.myHandler);
    }
 
  myHandler = (e) =>{
    const fade = this.state.fade;
    let mistakeCount = this.state.mistakeCount;
    let currentFullWord = this.state.currentFullWord;
    let negativeWords = this.state.negativeWords.slice();
    let positiveWords = this.state.positiveWords.slice();
    let currentValue = this.state.currentValue;
    let currentWord = this.state.currentWord;      
    let id = this.state.nameArrayId;
    let nameArray = this.state.nameArray;
    let randomNameArray = this.state.randomNameArray;
    let tempParam;
    if ((e.key=== nameArray[id]) && (currentValue.length < currentWord.length) && (this.state.isCardVisible) ) {
        currentValue = currentValue + e.key;
        this.state.wordNameArray[id] = e.key;
        for (var i = 0; i < randomNameArray.length; i++) {
          if (randomNameArray[i] === e.key) {
            tempParam = i;
            break;
          }
        }
        randomNameArray.splice(tempParam,1);       
        ++id;
        this.setState({
          currentValue,
          nameArrayId: id,
          inputValue: e.key,
          randomNameArray
        }, () => this.checkValue() )
      }
      else if((e.key !== nameArray[id]) && (currentValue.length < currentWord.length) && (this.state.isCardVisible) ) {
        mistakeCount++;
        this.setState({
          mistakeCount,
          fade: true
        })
      }
      else if((e.keyCode == '13') && (this.state.isCardVisible) ){
        this.continueTraining();
      }

      else {
        this.setState({
          isFinalVisible: true,
          isCardVisible: false
        })        
      }
  }   

  startTraining = () =>{
    this.setState({
        isStarterVisible: false,
        isCardVisible: true
    })
  }


    continueTraining = () =>{
  	  let mistakeCount = this.state.mistakeCount;
  	  let currentFullWord = this.state.currentFullWord;
  	  let negativeWords = this.state.negativeWords.slice();
  	  let positiveWords = this.state.positiveWords.slice();
  	  let currentValue = this.state.currentValue;
  	  let currentWord = this.state.currentWord;	  
  		if (mistakeCount > 2){
  			negativeWords.push(currentFullWord);
  		}

  		else if(currentWord !== currentValue){
  		  	negativeWords.push(currentFullWord);
  		  	this.setState({
  		  		negativeWords
  		  	})
  		}
  		else{
  			positiveWords.push(currentFullWord)
  		} 
      let id = this.state.id;
      let wordsLength = this.state.words.length;
      let words = this.state.words; 

      id = id + 1;
      if(id < wordsLength) {
      const currentFullWord = words[id];
      const currentWord = words[id].name;
  		const currentTranslation = words[id].translation;
  		const currentImage = words[id].image;
  		const currentMeaning = words[id].meaning;        
  		const nameArray = currentWord.split('');
  		const randomNameArray = currentWord.split('');
  		for (let i = randomNameArray.length - 1; i > 0; i--) {
  		    const j = Math.floor(Math.random() * (i + 1));
  		    [randomNameArray[i], randomNameArray[j]] = [randomNameArray[j], randomNameArray[i]];
  		}
  		const wordNameArray = [];
  		for (var i = 0; i < nameArray.length; i++) {
  			wordNameArray.push(' ');
  		}
        this.setState({
            id,
            words, 
            currentWord,
            currentFullWord,
            currentTranslation,
            currentImage,
            currentMeaning,
            randomNameArray,
            nameArray,
            wordNameArray,
            isImageVisible: false,
            areButtonsVisible: true,
            currentValue: '',
            nameArrayId: 0,
            mistakeCount: 0,
            positiveWords,
            negativeWords
        })
      }
        else {
          let words = this.state.positiveWords.slice();
          let constructWords = this.props.store.constructWords.slice();
          for (var i = 0; i < words.length; i++) {
            if (!(constructWords.find(el => el.id === words[i].id))) {
              words[i]["learnedDate"] = new Date();
              this.props.actions.updateConstructWords(words[i])
            }
          } 
          this.setState({
           isFinalVisible: true,
           isCardVisible: false,
           isStarterVisible: false,
      			positiveWords,
      			negativeWords           
          })
        }
    }
  
   voiceWord = () =>{
      var newWord = this.state.currentName;
      speech.say(newWord);
   }  

   checkValue = () =>{
   	var currentWord = this.state.currentWord;
    var currentValue = this.state.currentValue;
    if(currentWord.length === currentValue.length){
    	this.setState({
    		areButtonsVisible: false,
    		isImageVisible: true
    	})
    }   	
   }

   compareWord = (e) =>{
    var id = this.state.nameArrayId;
    var currentWord = this.state.currentWord;
    var nameArray = this.state.nameArray;
    var randomNameArray = this.state.randomNameArray;
    var currentValue = this.state.currentValue;
    var currentLetter = e.target.textContent.slice(0,1);
    var mistakeCount = this.state.mistakeCount;
      if( (currentLetter === nameArray[id]) && (currentValue.length < currentWord.length) ){
        e.target.className = "hidden";
        currentValue = currentValue + currentLetter;
        this.state.wordNameArray[id] = currentLetter;
        ++id;
        this.setState({
          currentValue,
          nameArrayId: id,
          inputValue: currentLetter
        }, () => this.checkValue() )
      }
      else if((currentLetter !== nameArray[id]) && (currentValue.length < currentWord.length)) {
	      mistakeCount++;
	      this.setState({
	      	mistakeCount,
          fade: true
	      })
      }
      else {
      	this.setState({
      		isFinalVisible: true,
      		isCardVisible: false
      	})      	
      }
} 



  render() {
    const fade = this.state.fade;
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isStarterVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
          <div className="training-wrapper-image">
            <Image src='training/construct.jpg' />
          </div>  
            <Card.Content>
              <Card.Header>?????????????? ??????????</Card.Header>
              <Card.Description>
                <Button primary onClick={this.startTraining}>???????????? ????????????????????</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       	<Container className="list-container">
       		<Card className="construct-card">
	       		<Label>
              {this.state.currentTranslation}
            </Label>
            <Container 
                onAnimationEnd={() => this.setState({ fade: false })}
                className={fade ? 'fade construct-word-container' : 'construct-word-container'}>
              <ul>
              {this.state.wordNameArray.map((name,index) =>
                <input key={index}  readOnly value={name} maxLength="1" />
               )}
              </ul>
              {this.state.areButtonsVisible ? 
	              <ul>
	              {this.state.randomNameArray.map((name,index) =>
	                <li key={index} 
                      onClick={this.compareWord}
                  > 
                      {name} 
                  </li>
	               )}
	              </ul>: null 
              }
            {this.state.isImageVisible ?
            	<Fragment>
            		<p>{this.state.currentMeaning}</p>
                   <div className="texts-image-wrapper">
                    <Image src={this.state.currentImage} ></Image>
                  </div>
            	</Fragment> 
            	 : null
            }
            </Container>
            <Button primary onClick={this.continueTraining} >????????????????????</Button>
       		</Card>
      	</Container> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>????????????????????</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  {  (this.state.negativeWords.length !== 0 ) ?
                    <List className="audio-list">
                    {this.state.negativeWords.map((item, index) => 
                        <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
                      )}
                   </List>: 
                   <Message>
                      <Message.Header>??????????????????????!</Message.Header>
                      <p>
                        ?????? ?????????????? ?????????????????? ??????????????????
                      </p>
                   </Message> 
                  }

                  </Card.Description>
                  <Card.Description className="results-wrapper">
                    <div className="positive-results-wrapper"> 
                      <div className="positive-results">
                        {this.state.positiveWords.length}
                      </div>
                      <Label>??????????</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {this.state.words.length - this.state.positiveWords.length}
                      </div> 
                      <Label>??????????????</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                        <Button primary onClick={this.setStateOnStart}>????????????????????</Button>
                        <Button primary><Link className="training-link" to="/training">?? ??????????????????????</Link></Button>
                  </Button.Group>
                </Card.Content>
              </Card>          
        </Card.Group>          
           : null
        }
        </div>
        <footer>
        </footer>
    </Fragment>
	);
  }
}

function mapStateToProps(state) {
  return {store: state.reducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructWord);