import React, { Component, Fragment } from 'react';
import {Table,  Image, Button, Menu } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';
//import { pronounce } from "node-pronounce";

class SplittedWords extends Component {

  constructor(props){
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      wordsEl: [],
      words: [],
      selected: '',
      loaded: false,
      isModalFoundOpen: false,
      isModalInputOpen: false,
      sentence: "arched owl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
    }
  }

  componentDidMount(){
    axios.get('/words_full.json')
      .then(res => {
        const words = res.data;
        let splitted = this.state.sentence.split(" ");
        this.setState({ 
          words, splitted, loaded: true
      })    
    })
  } 

  searchForWord = (item) => {
    let words = this.state.words.slice()
    let newItem = item.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    let found = words.find(x => x.name === newItem);
    if (found) {
      this.setState({
        found
      }, () => this.toggleFoundModal())
    } else {
      this.setState({
        selected: newItem
      }, () => this.toggleInputModal())
    }
  } 

  toggleFoundModal = () => {
    this.setState({
      isModalFoundOpen: !this.state.isModalFoundOpen
    })
  }

  toggleInputModal = () => {
    this.setState({
      isModalInputOpen: !this.state.isModalInputOpen
    })
  }

  changeFile = (e) => {
    console.log(e);
    this.setState({
      filePath: e.target.value
    })
  }

  changeTranslation = (e) => {
    this.setState({
      translation: e.target.value
    })
  }

  changeDefinition = (e) => {
    this.setState({
      definition: e.target.value
    })
  }

  addToWords = () => {
    let word = {};
    word.name = this.state.selected;
    word.transription = this.state.transcription;
    word.translation = this.state.translation;
    word.category = "common";
    word.id = 1;
    word.date = new Date();
    word.definition = this.state.definition;
    word.image = this.state.filePath;
    //pronounce(this.state.selected);
    console.log(word);
  }

  render() {
    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.state.isModalFoundOpen ?
            <div className = "word-modal__overlay">
              <div className="word-modal">
                <div className="word-modal__image">
                  <img src="word-modal__picture" src = {this.state.found.image}/>
                </div>
                <div className="word-modal__description">
                  <p className="word-modal__title">{this.state.found.name} - {this.state.found.translation}</p>
                  <p className="word-modal__meaning">{this.state.found.definition}</p>   
                  <Button primary onClick={this.toggleFoundModal}>Закрыть</Button>              
                </div>
              </div>              
            </div>
          : null}
          {this.state.isModalInputOpen ?
            <div className = "word-modal__overlay">
              <div className="word-modal">
                <div className="word-modal__description">
                  <p className="word-modal__title">{this.state.selected}</p>
                  <textarea value = {this.state.translation} onChange = {this.changeTranslation} type = "text" className="word-modal__textarea" placeholder="Добавить перевод" />
                  <textarea value = {this.state.definition} onChange = {this.changeDefinition} type = "text" className="word-modal__textarea" placeholder="Добавить значение" />   
                  <Button
                      primary
                      content="Выбрать картинку"
                      labelPosition="left"
                      icon="file"
                      onClick={() => this.fileInputRef.current.click()}
                      className="word-modal__file"
                  />
                  <input ref={this.fileInputRef}
                         type="file"
                         hidden
                         onChange={this.changeFile} />
                  <div className="word-modal__buttons">
                    <Button primary onClick={this.addToWords}>Добавить</Button>
                    <Button primary onClick={this.toggleInputModal}>Закрыть</Button>                      
                  </div>
                </div>
              </div>              
            </div>
          : null}
          {this.state.loaded ?
            <div className="splitted-wrapper">
              {this.state.splitted.map((item, index) => 
                <span onClick={this.searchForWord.bind(this, item)}>{`${item} `}</span>
              )}
            </div>
          : null}
        </div>
        <footer></footer>        
      </Fragment>
    );
  }
}

export default SplittedWords;