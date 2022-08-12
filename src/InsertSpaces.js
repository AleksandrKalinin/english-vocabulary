import React, { Component, Fragment } from 'react';
import { Card, Image, Button, Icon, Menu, Input, Dropdown} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import SpeechRecognition from 'react-speech-recognition';
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';


class InsertSpaces extends Component {

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
      texts: [],
      contentArray: [],
      areTextsVisible: true,
      isMenuVisible: true,
      isSingleTextVisible: false,
      isResultVisible: false,
      isResultWrong: false,
      negativeWords: [],
      positiveWords: [],
      content: '',
      inputContent: '',
      textContent: '',
      newContent: '',
      image: null,
      options: [],
      textsLoaded: false,
      categoryValue: ''
    }, () => this.initialLoad())
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
        }, () => {
            this.setState({
              textsLoaded: true
            })
            this.createMenuItems()
          });
      }) 
  }


    readMore = (id) =>{
      let texts = this.state.texts.slice();
      let title = texts[id].title;
      let content = texts[id].content;
      let inputContent = texts[id].content;
      inputContent = inputContent.replace(/\s/g, '');
      let image = texts[id].src;
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        title,
        content,
        image,
        inputContent
      })      
    }


  showFinal = () =>{
      this.setState({
        isResultVisible: true,
        isTaskStarted: false
   
      })
  }

setCaretPosition = (ctrl, pos) => {

  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);

  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

  updateValue = (event) =>{
  	let newContent = this.state.newContent;
  	let target = event.target;
    let str = event.target.value;
    let indexOfSpace = event.target.value.indexOf(" ") + 1;
    let word = event.target.value.substr(0, indexOfSpace - 1);
    let newstr = event.target.value.substring(indexOfSpace);
    newContent = newContent + (word + ' ');
      this.setState({
      	newContent,
        inputContent: newstr
      }, () => this.setCaretPosition(target, 0));
  }

  startExercise = () => {
    this.setState({
      isTaskStarted: true,
      isSingleTextVisible: false
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
        options: unique
      })    
    }  

    selectCategory = () =>{
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.selectCategory() )

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
              {(this.state.textsLoaded && this.state.areTextsVisible) ? 
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
                    <Button primary onClick={this.startExercise}>Я прочитал</Button> 
                  </Card.Content>
                </Card>:null
              }             
             {this.state.isTaskStarted ? 
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>
                  <Card.Content className="fragments-content recreate-text-content">
                    <p className="single-text-card-description p-wrap fragment-description recreate-text inserted-text">
                      { this.state.newContent}
                    </p>
                    <Input className="insert-spaces-input" value={this.state.inputContent} onChange={this.updateValue} />
                    <Button.Group className="card-buttons-wrapper">
                        <Button primary onClick={this.showFinal}>Проверить</Button>
                      </Button.Group>
                  </Card.Content>
                </Card>:null
              }
              {this.state.isResultVisible ?
                <Card className="single-text-card single-fragments-card">
                  <div className="fragments-close">
                    <span onClick={this.backToTexts}>
                      <Icon name='close' size='big' />
                    </span>
                  </div>                
                  <Card.Content className="fragments-content">
                    <div className="recreate-results">
                      <div className="recreate-results__item recreate-item">
                        <h3 className="recreate-item__title">Исходный текст</h3>
                        <p className="recreate-item__text">{this.state.content}</p>
                      </div>
                      <div className="recreate-results__item recreate-item">
                        <h3 className="recreate-item__title">Результат</h3>
                        <p className="recreate-item__text">{this.state.newContent}</p>
                      </div>                      
                    </div>                                     
                  </Card.Content>
                  <div className="fragment-variants">
                    <Button primary onClick={this.setStateOnStart}>Заново</Button>
                    <Button primary><Link className="training-link" to="/training">К тренировкам</Link></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(InsertSpaces);