import React, { Component, Fragment } from 'react';
import {Table,  Image, Button, Menu } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';

class SplittedWords extends Component {

  constructor(props){
    super(props);
    this.state = {
      wordsEl: [],
      words: [],
      loaded: false,
      isModalOpen: false,
      sentence: "arched owl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
    }
  }

  componentDidMount(){
    axios.get('/working.json')
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
    let found = words.find(x => x.name.toLowerCase() === newItem);
    if (found) {
      this.setState({
        found
      }, () => this.toggleModal())
    } else {
      console.log('not found')
    }
  } 

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {

    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.state.isModalOpen ?
            <div className = "word-modal__overlay">
              <div className="word-modal">
                <div className="word-modal__image">
                  <img src="word-modal__picture" src = {this.state.found.image}/>
                </div>
                <div className="word-modal__description">
                  <p className="word-modal__title">{this.state.found.name} - {this.state.found.translation}</p>
                  <p className="word-modal__meaning">{this.state.found.meaning}</p>   
                  <button onClick={this.toggleModal}>Закрыть</button>               
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