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
      sentence: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
    }
  }

  componentDidMount(){
    let sentence = this.state.sentence;
    let wordsEl = [];
    let words = this.state.sentence.split(" ");
    this.setState({
      words, loaded: true
    })
    /*
    for (var i = 0; i < words.length; i++) {
      wordsEl.push(`<span>${words[i]}</span>`)
    } */
    console.log(wordsEl);
  } 

  showModal = (item) => {
    alert(item);
  } 

  render() {

    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.state.loaded ?
            <div className="splitted-wrapper">
              {this.state.words.map((item, index) => 
                <span onClick={this.showModal.bind(this, item)}>{`${item} `}</span>
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