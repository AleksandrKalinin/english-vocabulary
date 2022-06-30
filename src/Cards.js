import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Divider, Icon, List, Message, Label} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import TopMenu from './TopMenu';
import axios from 'axios';
import speech from 'speech-synth';

class Cards extends Component {

	constructor(props){
		super(props);
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
      isCardVisible: false,
      isButtonVisible: true,
      isTranslationVisible: false,
      showNavButtons: true,
      showContinueButton: false,
      isFinalVisible: false 
    }, () => this.initialLoad())
   }

   initialLoad = () => {
      axios.get('/working.json')
        .then(res => {
          const words = res.data;
          let result = [];
          for (var i = 0; i < 3; i++) {
            let item = [];
            while(item.length < 5) {
              var el = words[Math.floor(Math.random() * words.length)];
              if (item.indexOf(el) === -1) {
                item.push(el)
              };                
            }
            result.push(item);
          }

          const currentWord = result[0][Math.floor(Math.random() * result[0].length)];
          this.setState({ 
            words, 
            currentWord,
            result });          
        })
   }

    renderComponent = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

    checkResponse = (val) => {
      if (val) {
        var positiveWords = this.state.positiveWords.slice();
        positiveWords.push(this.state.currentWord);
        this.setState({
          positiveWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true,
        })        
      } else {
        var negativeWords = this.state.negativeWords.slice();
        negativeWords.push(this.state.currentWord);      
        this.setState({
          negativeWords,
          isTranslationVisible: true,
          showNavButtons: false,
          showContinueButton: true
        })        
      }     
    }

    continueTraining = () =>{
      let id = this.state.id;
      let result = this.state.result;
      id = id + 1;
      if (id < result.length){ 
        const currentWord =  result[id][Math.floor(Math.random() * result[0].length)];       
        this.setState({
          id,
          currentWord,
          isTranslationVisible: false,
          showNavButtons: true,
          showContinueButton: false        
        })

      }
      else this.setState({
          isFinalVisible: true,
          isTranslationVisible: false,
          showNavButtons: false,
          showContinueButton: false, 
          isCardVisible: false,
          isButtonVisible: false
      })
    }


   voiceWord = () =>{
      var newWord = this.state.currentName;
      speech.say(newWord);
   }    

  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
      <TopMenu/>
       {this.state.isButtonVisible ?
        <Card.Group className="card-header-wrapper">
          <Card>
            <div className="training-wrapper-image">
              <Image src='training/memory.png' />
            </div>  
            <Card.Content>
              <Card.Header>Словарные карточки</Card.Header>
              <Card.Description>
                <Button primary onClick={this.renderComponent} >Начать тренировку</Button>
              </Card.Description>
            </Card.Content>
          </Card>          
        </Card.Group>:
        null
      }
       {this.state.isCardVisible ?
       <Card.Group itemsPerRow={1} className="card-header-wrapper" >
           <Card className="card-training"  >
           <div className="card-image-wrapper recognize-cards">
             <Image src={this.state.currentWord.image} />
           </div>
              <Card.Content>
                <Card.Header>{this.state.currentWord.name} 
                <span onClick={this.voiceWord} className="training-card__icon" title="Прослушать">
                  <Icon name = 'right sound'/> 
                </span>
                </Card.Header>
                {this.state.isTranslationVisible ? 
                  <Fragment>
                    <Card.Meta>{this.state.currentWord.translation}</Card.Meta>
                    <Card.Description>{}</Card.Description>                  
                  </Fragment>:null
                }
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="card-buttons-wrapper">
                {this.state.showNavButtons ?
                <Fragment>
                  <Button onClick={this.checkResponse.bind(this, true)} primary>Знаю</Button>
                  <Button onClick={this.checkResponse.bind(this, false)} primary>Не знаю</Button>
                </Fragment>:null
                }  
                {this.state.showContinueButton ?
                  <Button onClick={this.continueTraining} primary>Продолжить</Button>:null
                }
                </Button.Group>
              </Card.Content>
            </Card>          
      </Card.Group> :
           null
        }
        {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>Результаты</Card.Header>
                  <Divider/>
                  <Card.Description className="audio-list-container"> 
                  { (this.state.negativeWords.length !== 0 ) ?
                    <div className="answers-wrapper">
                      <List className="audio-list">
                      <h2>Верные ответы</h2>
                      {this.state.positiveWords.map((item, index) => 
                          <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
                        )}
                     </List>
                      <List className="audio-list">
                      <h2>Неверные ответы</h2>
                      {this.state.negativeWords.map((item, index) => 
                          <List.Item key={index} ><span>{item.name}</span> - {item.translation}</List.Item>  
                        )}
                     </List>
                   </div> : 
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
                        {this.state.positiveWords.length}
                      </div>
                      <Label>Верно</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {this.state.result.length - this.state.positiveWords.length}
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

export default Cards;