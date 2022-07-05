import React, { Component, Fragment } from 'react';
import {Table,  Image, Button, Menu, Icon } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';
import {bindActionCreators} from 'redux';
import actions from './actions/index';

import {connect} from 'react-redux';


class SelectedBook extends Component {

  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      text: '',
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
      
      fontSizeTemp: 16,
      lineHeightTemp: 32,
      fontFamilyTemp: "'Times New Roman', sans-serif",
      fontWeightTemp: 400,


      color: '#222222',
      backgroundColor: '#f6f6f6',

      isColorModalOpen: false,
      activeFontColor: '#222222',
      activeBgColor: '#f6f6f6',
      fontState: [false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
      bgState: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
      colorScheme: [  
              '#000000','#111111','#222222','#333333',
              '#444444','#555555','#666666','#777777',
              '#888888','#999999','#a7a7a7','#b8b8b8',
              '#d0d0d0','#dcdcdc','#f6f6f6','#ffffff'   ]      
    }
  }

  componentDidMount(){
    axios.get('/books/' + this.props.store.selectedBook.link)
      .then(res => {
        this.setState({
          text: res.data.toString().split("\n")
        }, () => this.splitIntoPages())
      })
  } 

  splitIntoPages = () => {
    let text = this.state.text;
    let pages = []; let pageIndexes = [];
    let value = 1600 / this.state.lineHeight;
    let pagesCount = Math.ceil(text.length / value);
    let currentMin = 0;
    let currentMax = 50;
      for (var i = 0; i < pagesCount; i++) {
        pages.push(text.slice(currentMin,currentMax));
        currentMin = currentMin + 50;
        currentMax = currentMax + 50;
      }
      for (var i = 0; i < pagesCount; i++) {
        pageIndexes.push(i);
      }
      this.setState({ pages, 
                      pageIndexes, 
                      currentPage: pages[0],
                      loaded: true }, () => console.log(this.state));
  }  

    prevButton = () =>{
      let currentPageId = this.state.currentPageId;
      let pages = this.state.pages;
      if(currentPageId > 0){
        currentPageId--;
      }
      let currentPage = pages[currentPageId];
      this.setState({
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
      this.setState({
          currentPageId,
          currentPage
      }, () => this.scrollToTop())
    } 

    scrollToTop = () =>{
      window.scrollTo(0, this.myRef.offsetTop)
    }  

    changeFont = () => {
      this.setState({
        isFontModalOpen: true
      })
    } 

    changeColor = () => {
      this.setState({
        isColorModalOpen: true
      })
    }     


  changePage = (e) =>{
      let currentPageId = Number(e.target.value);
      let pages = this.state.pages;
      let currentPage = pages[currentPageId];
      this.setState({
          currentPageId, currentPage
      })  
  }

  closeModal = () => {
    this.setState({
      isFontModalOpen: false,
      isColorModalOpen: false
    })
  }

  changeValue = (e) =>{
    this.setState({fontSizeTemp: e.target.value})
  }

  changeFontFamily = (e) =>{
    this.setState({fontFamilyTemp: e.target.value})
  }

  changeFontWeight = (e) =>{
    this.setState({fontWeightTemp: e.target.value})
  }

  changeLineHeight = (e) =>{
    this.setState({lineHeightTemp: e.target.value})
  } 

  applyFontSettings = () => {
    this.setState({
      fontSize: this.state.fontSizeTemp,
      lineHeight: this.state.lineHeightTemp,
      fontFamily: this.state.fontFamilyTemp,
      fontWeight: this.state.fontWeightTemp,
      isFontModalOpen: false
    })
  }


  setFontColor = (e) =>{
    let fontState = this.state.fontState.slice();
    let index = e.currentTarget.getAttribute("data-index");
    for (var i = 0; i < fontState.length; i++) {
      fontState[i] = false;
    }
    fontState[index] = true;
    this.setState({
      activeFontColor: e.currentTarget.getAttribute("colorvalue"),
      fontState
    })
  }

  setBgColor = (e) =>{
    let bgState = this.state.bgState.slice();
    let index = e.currentTarget.getAttribute("data-index");
    for (var i = 0; i < bgState.length; i++) {
      bgState[i] = false
    }
    bgState[index] = true;
    this.setState({
      activeBgColor: e.currentTarget.getAttribute("colorvalue"),
      bgState
    })
  }

  applyColorSettings = () =>{
    this.setState({
      color: this.state.activeFontColor,
      backgroundColor: this.state.activeBgColor,
      isColorModalOpen: false
    })    
  }

  render() {
    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.state.isFontModalOpen ?
            <div className="settings-overlay">
              <div className="select-palette-wrapper select-font-wrapper">
                <span className="close-button" onClick={this.closeModal}>
                  <i className="fas fa-times"></i>
                </span>
                <div className="select-font">
                  <div className="select-font-block">
                    <span>Размер</span>
                    <div className="select-font-input">
                      <input onChange={this.changeValue} type="range" min="8" max="24" value={this.state.fontSizeTemp} name=""/>               
                      <span className="select-font-value">{this.state.fontSizeTemp}</span>
                    </div>
                  </div>
                  <div className="select-font-block">
                    <span>Интервал</span>         
                    <div className="select-font-input">
                      <input onChange={this.changeLineHeight} type="range" min="16" max="72" value={this.state.lineHeightTemp} name=""/>                
                      <span className="select-font-value">{this.state.lineHeightTemp}</span>
                    </div>
                  </div>
                  <div className="select-font-block">
                    <span>Жирность</span>
                    <div className="select-font-input">
                      <input onChange={this.changeFontWeight} type="range" min="200" max="900" step="100" value={this.state.fontWeightTemp} name=""/>               
                      <span className="select-font-value">{this.state.fontWeightTemp}</span>
                    </div>  
                  </div>
                </div>
                <select className="select-font-family" onChange={this.changeFontFamily} value={this.state.fontFamily}>
                  <option value ="'Times New Roman', sans-serif">Times New Roman</option>
                  <option value ="'Arial', sans-serif">Arial</option>
                  <option value ="'Verdana', sans-serif">Verdana</option>
                  <option value ="'Lucida Console', sans-serif">Lucida Console</option>
                  <option value ="'Georgia', serif">Georgia</option>
                  <option value ="'Courier New', monospace">Gourier New</option>
                </select>
                <p className="select-font-example" style={{ 
                                      fontSize: this.state.fontSizeTemp + "px", 
                                      fontFamily: this.state.fontFamilyTemp,
                                      lineHeight: this.state.lineHeightTemp + "px",
                                      fontWeight: this.state.fontWeightTemp }} >Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>                  
                <button className="normal-button" onClick={this.applyFontSettings} >Применить</button>
              </div>    
            </div>
          : null}
          {this.state.isColorModalOpen ?
            <div className="settings-overlay">
              <div className="select-palette-wrapper">
                <span className="close-button" onClick={this.closeModal} >
                  <i className="fas fa-times"></i>
                </span>
                <div className="select-palette-container">
                  <div className="palette-container-item">
                    <p>Шрифт</p>
                    <div className="select-palette">
                      {this.state.colorScheme.map((item,index) =>
                        <div key={index} className="palette-item" data-index={index} onClick={this.setFontColor} style={{ backgroundColor: item }} colorvalue={item}>
                          {this.state.fontState[index] ? 
                            <span><i className="fas fa-check"></i></span>  : null
                          }
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="palette-container-item">
                    <p>Фон</p>
                    <div className="select-palette">
                      {this.state.colorScheme.map((item,index) =>
                        <div key={index} className="palette-item" data-index={index} onClick={this.setBgColor} style={{ backgroundColor: item }} colorvalue={item}>
                          {this.state.bgState[index] ?
                            <span><i className="fas fa-check"></i></span> 
                             : null
                          }
                        </div>
                      )}          
                    </div>
                  </div>
                </div>
                <div className="palette-item-selected" style={{ backgroundColor: this.state.activeBgColor }} >
                  <span style={{ color: this.state.activeFontColor  }} >Lorem ipsum </span>
                </div>                
                <button className="normal-button" onClick={this.applyColorSettings} >Применить</button>          
              </div>              
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(SelectedBook);