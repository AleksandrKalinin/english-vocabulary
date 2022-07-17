import React, { Component, Fragment } from 'react';
import {Table,  Image, Button, Menu, Icon, TextArea, Form, Checkbox, Input } from 'semantic-ui-react';
import TopMenu from './TopMenu';
import Comments from './Comments';
import ModalFont from './ModalFont';
import ModalColor from './ModalColor';
import {Link} from "react-router-dom";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import iconv from 'iconv-lite';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';


class SelectedBook extends Component {

  constructor(props){
    super(props);
    this.fileInputRef = React.createRef();    
    this.myRef = React.createRef();
    this.state = {
      text: null,
      pageIndexes: [],
      currentPageId: 0,
      loaded: false,
      settingsFont: false,
      SettingsPalette: false,
      fontSize: 16,
      fontFamily: "'Times New Roman', sans-serif",
      lineHeight: 32,
      fontWeight: 400,
      pages: 0,
      isFontModalOpen: false,
      fontState: [false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
      bgState: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
      
      color: '#222222',
      backgroundColor: '#f6f6f6',

      commentsVisible: false,

      wordsEl: [],
      words: [],
      selected: '',
      isModalFoundOpen: false,
      isModalInputOpen: false                
    }
  }

  componentDidMount(){
    console.log(this.props);
    let allComments = this.props.store.booksComments;
    let selectedComments = allComments.find(x => x.id == this.props.match.params.id);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type','text/plain; charset=UTF-8');  
    const that = this;
    axios.all([
      axios.get('/books.json'), 
      axios.get('/words_full.json')
    ])   
    .then(axios.spread((obj1, obj2) => {
      let books = obj1.data; 
      let words = obj2.data;
      let selectedBook = books.find(x => x.id == this.props.match.params.id);
      fetch(selectedBook.link, myHeaders)
        .then(response => response.arrayBuffer())
        .then(function (buffer) {
            const decoder = new TextDecoder('iso-8859-1');
            let text = decoder.decode(buffer).split("\n");
            return text
        })
        .then((text) => that.setState({words, text, commentsLength: selectedComments.comments.length }, () => that.splitIntoPages() ))
    })) 

  } 

  splitIntoPages = () => {
    let text = this.state.text;
    let pages = [];
    let words = [];
    let pageIndexes = [];
    let value = 1600 / this.state.lineHeight;
    let pagesCount = Math.ceil(text.length / value);
    let currentMin = 0;
    let currentMax = 50;
      for (var i = 0; i < pagesCount; i++) {
        let txt = text.slice(currentMin, currentMax);
        if (currentMin === 0 ) {
          let newTxt = [];
          for (var i = 0; i < txt.length; i++) {
            let newSentence = [];
            newSentence.push(txt[i].split(' '));
            newTxt.push(newSentence);
          }
          words.push(newTxt);
        }
        pages.push(txt);
        currentMin = currentMin + 50;
        currentMax = currentMax + 50;
      }
      for (var i = 0; i < pagesCount; i++) {
        pageIndexes.push(i);
      }
      this.setState({ pages, 
                      pageIndexes, 
                      currentPage: pages[0],
                      splittedPage: words,
                      loaded: true });
  }  

    prevButton = () =>{
      let currentPageId = this.state.currentPageId;
      let pages = this.state.pages;
      if(currentPageId > 0){
        currentPageId--;
      }
      let currentPage = pages[currentPageId];

      let newTxt = []; let words = [];
      for (var i = 0; i < currentPage.length; i++) {
        let newSentence = [];
        newSentence.push(currentPage[i].split(' '));
        newTxt.push(newSentence);
      }
      words.push(newTxt);  
      console.log(words);
      this.setState({
          splittedPage: words,
          currentPageId,
          currentPage
      }, () => this.scrollToTop())
    }

    nextButton = () =>{
      let currentPageId = this.state.currentPageId;
      let pages = this.state.pages.slice();
      if(currentPageId < pages.length - 1){
        currentPageId++;
      }
      let currentPage = pages[currentPageId];
      console.log(currentPage);
      let newTxt = []; let words = [];
      for (var i = 0; i < currentPage.length; i++) {
        let newSentence = [];
        newSentence.push(currentPage[i].split(' '));
        newTxt.push(newSentence);
      }
      words.push(newTxt);  
      console.log(words);

      this.setState({
          splittedPage: words,
          currentPageId,
          currentPage
      }, () => this.scrollToTop())
    } 

    scrollToTop = () =>{
      window.scrollTo(0, this.myRef.offsetTop)
    }  

  changePage = (e) =>{
      let currentPageId = Number(e.target.value);
      let pages = this.state.pages;
      let currentPage = pages[currentPageId];
      this.setState({
          currentPageId, currentPage
      })  
  }

  toggleComments = () => {
    this.setState({ commentsVisible: !this.state.commentsVisible })
  }


  searchForWord = (item, e) => {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        let words = this.state.words.slice();
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
        break;
      default:
        return;
    }    
  } 

  toggleFoundModal = () => {
    this.props.actions.toggleSearchModal(true);
    /*
    this.setState({
      isModalFoundOpen: !this.state.isModalFoundOpen
    }) */
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
  }

  changeFont = () => {
    this.props.actions.toggleFontModal(true);
  }

  changeColor = () => {
    this.props.actions.toggleColorModal(true);
  }

  closeSearchModal = () => {
    this.props.actions.toggleSearchModal(false);
  }

  closeInputModal = () => {
    this.setState({
      isModalInputOpen: false
    });
  }  

  render() {
    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.props.store.isSearchModalOpen ?
            <div className = "word-modal__overlay">
              <div className="word-modal">
                <div className="word-modal__image">
                  <img src="word-modal__picture" src = {this.state.found.image}/>
                </div>
                <div className="word-modal__description">
                  <p className="word-modal__title">{this.state.found.name} - {this.state.found.translation}</p>
                  <p className="word-modal__meaning">{this.state.found.definition}</p>   
                  <Button primary onClick={this.closeSearchModal}>Закрыть</Button>              
                </div>
              </div>              
            </div>
          : null}
          {this.state.isModalInputOpen ?
            <div className = "word-modal__overlay">
              <div className="word-modal">
                <div className="word-modal__reject">
                   <p>Sorry, cannot find selected word is our vocabulary</p>
                   <Button primary onClick={this.closeInputModal}>Закрыть</Button>
                </div>
              </div>              
            </div>
          : null}           
          {/*this.state.isModalInputOpen ?
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
          : null */}          
          {this.props.store.isFontModalOpen ?
            <ModalFont />
          : null}
          {this.props.store.isColorModalOpen ?
            <ModalColor />
          : null}
          <div className="navigation-panel">
            <div className="navigation-progress"> 
              <input  
                type="range" 
                value={this.state.currentPageId} 
                max={this.state.pages.length - 1} 
                min="0"
                onChange={this.changePage} />
            </div>
            <div className="nav-pagination">{this.state.currentPageId + 1} / {this.state.pages.length}</div>            
            <div className="navigation-links">
              <span onClick={this.prevButton} className="navigation-links__item" title="Назад"><Icon name='arrow left' size='large' /> </span>
              <span onClick={this.nextButton} className="navigation-links__item" title="Вперед"><Icon name='arrow right' size='large' /> </span>
              <span onClick={this.changeFont} className="navigation-links__item" title="Настройки шрифта"><Icon name='font' size='large' /> </span>
              <span onClick={this.changeColor} className="navigation-links__item" title="Настройки цвета"><Icon name='tint' size='large' /> </span>
            </div>
          </div>
          {/*
          <div className="selected-book" style={{ backgroundColor: this.state.backgroundColor, color: this.state.color}}>
            {this.state.loaded ?
              <div className="selected-book__content book-content" style= 
                                          {{ lineHeight: this.state.lineHeight + "px",
                                             fontWeight: this.state.fontWeight, 
                                             fontSize:   this.state.fontSize + "px", 
                                             fontFamily: this.state.fontFamily }}>
                  {this.state.currentPage.map((item,index) => <p key={index}>{item}</p>) }             
              </div>
            : null}
          </div> */}
          <div className="selected-book" style={{ backgroundColor: this.props.store.backgroundColor, color: this.props.store.color}}>
            {this.state.loaded ?
              <div className="selected-book__content book-content" style= 
                                          {{ lineHeight: this.props.store.lineHeight + "px",
                                             fontWeight: this.props.store.fontWeight, 
                                             fontSize:   this.props.store.fontSize + "px", 
                                             fontFamily: this.props.store.fontFamily }}>
                  {this.state.splittedPage.map((page, index1) => 
                    <>
                      {page.map((sentence, index2) => 
                        <>
                          {sentence.map((word, index3) => 
                            <p>
                              {word.map((item, index4) => 
                                <span onClick={this.searchForWord.bind(this, item)}>{`${item} `}</span>
                              )}
                            </p>
                          )}
                        </>
                      )}
                    </> 
                  )}
              </div>
            : null}
          </div>          
          <div className="single-text-form__wrapper">
            <div className="comments__header">
              {this.state.commentsLength ?
                <>
                <span className="comments-header__counter">Комментариев: {this.state.commentsLength}</span>
                <span className="comments-header__button" onClick={this.toggleComments}>{this.state.commentsVisible ? 'Скрыть комментарии': 'Показать комментарии'}</span>
                </>
              : null}
            </div>
            {this.state.commentsVisible ?
              <Comments id={this.props.match.params.id} />
            : null}           
          </div>      
        </div>
        <footer></footer>        
      </Fragment>
    );
  }
}


function mapStateToProps(state){
  return { store: state.reducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectedBook);