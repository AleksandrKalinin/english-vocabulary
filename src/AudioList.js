import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input,Dropdown, Icon} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';

class AudioList extends Component {

  constructor(props){
    super(props);
    this.state = {
      words: [],
      options: [],
      categoryValue: '',
      value: null,
      areTextsVisible: true,
      isSingleTextVisible: false,
      isOldestFirst: false,
      isDropdownVisible: true,
      title: '',
      content: '',
      image: null,
      contentArray: [],
      categoryArray: [],
      allWords: [],
      currentWords: [],
      arrayOfColors: ["navy","maroon","magenta","green","teal","tomato"],
      currentColor: "white",
      sortedByNameUp: true,
      sortedByTranslationUp: true,
      addedUp: true,
      addedItems: [],
      arrayOfButtons: [],
      iconsArray: [],
      disabled: [],
      currentAudio: null,
      playState: false
    }
  }

  componentDidMount() {
    axios.all([axios.get('/decks.json'),
               axios.get('working.json')])
              .then(axios.spread((firstResponse, secondResponse) => { 
              let words = firstResponse.data;
              let allWords = secondResponse.data;
              let contentArray = [];
              let currentAudio = new Audio('audio/Baskervilles1.mp3');
          this.setState({
            allWords: allWords,
            words: words,
            contentArray: contentArray,
            currentAudio: currentAudio
          }, () => this.consoleParams() );
       }))
    }

    consoleParams = () =>{
      let newItems = [];
      this.state.words.map((item, i) =>
                    newItems.push({ 
                        key: item.id, 
                        text: item.level, 
                        value: item.level
                     }))
      this.setState({
        options: newItems
      }, () => this.getUnique())
    } 

    getUnique = () => {
      var tempArray = [];
      var arr = this.state.options;
      var comp = 'text';
        const unique = arr
            .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => arr[e]).map(e => arr[e]);
      this.setState({
        options: unique,
        categoryArray: tempArray
      })    
    }  

    newFunc = () =>{
      var options = this.state.options.slice();
      var categoryValue = this.state.value;
      console.log(categoryValue);
      this.setState({
        categoryValue: categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.newFunc() )  

    readMore = (e) =>{
      let arrayOfButtons = [];      
      let iconsArray = [];
      let disabled = [];
      let colors = this.state.arrayOfColors.slice(); 
      let words = this.state.words.slice();
      let allWords = this.state.allWords.slice();
      let currentWords = [];
      let target = e.target.parentElement;
      let color = colors[Math.floor(Math.random()*colors.length)];
      var index = 0;
        while ( (target = target.previousElementSibling) ) {
          index++;
      }
      let activeTargetTitle = e.target.parentElement.children[0].textContent;
      for (var i = 0; i < allWords.length; i++) {
        if(allWords[i]["category"] === activeTargetTitle ){
          currentWords.push(allWords[i])
        } 
      }

      for (var i = 0; i < currentWords.length; i++) {
          arrayOfButtons.push("Добавить");
          iconsArray.push(true);
          disabled.push("");
      }
      
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isDropdownVisible: false,
        currentWords: currentWords,
        currentColor: color,
        arrayOfButtons: arrayOfButtons,
        iconsArray: iconsArray,
        disabled: disabled        
      })
    }

    backToTexts = () =>{
      this.setState({
        areTextsVisible: true,
        isSingleTextVisible: false        
      })
    }


    addedFirst = () =>{
      console.log(this.state);
      let state = this.state.sortedByTranslationUp;
      this.setState({
        addedUp: !state
      })
    }

  //сортировка по имени
    sortByName = () =>{
        let state = this.state.sortedByNameUp;
        console.log("current words", this.state.currentWords);
      const words = this.state.currentWords.slice();
      let newWords = words;
      if(this.state.isOldestFirst){
        newWords = words.sort((a,b) => a.name.localeCompare(b.name));
      } else {
        newWords = words.sort((a,b) => b.name.localeCompare(a.name));
      }
      console.log("new words", newWords);
      this.setState({
        isOldestFirst: !this.state.isOldestFirst,
        currentWords: newWords,
        sortedByNameUp: !state      
      })    
    }

    startPlayer = () =>{
      let currentState = this.state.playState;
      this.setState({
        playState: !currentState
      }, () => this.playAudio() )
    }

    playAudio = () =>{
      let audio = this.state.currentAudio;
      if(this.state.playState){
        audio.play();
      }
      else{
        audio.pause();
      }
      this.setState({
        currentAudio: audio
      })
    }

  render() {
    let color = this.state.currentColor;
    let filteredWords = this.state.currentWords;
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper">
          <Menu className="texts-menu decks-menu" vertical>
            {this.state.isDropdownVisible ? 
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
                </Menu.Item> : null
            }
              <Menu.Item>
                <Button onClick={this.startPlayer}>
                {this.state.playState ?
                 <Icon name='pause circle outline' size='' /> : <Icon name='play circle outline' size='' />  }Listen</Button>

              </Menu.Item>
              <Menu.Item className="no-padding decks-added-outer-wrapper">
                {(this.state.addedItems.length) ? 
                <ul className="decks-added-wrapper">
                  {this.state.addedItems.map((item,index)=> 
                    <li key={index}  className="decks-added-items" style = {{ backgroundColor: this.state.currentColor}}>
                      <span className="decks-added-items-name">{item.name} - {item.translation}</span><span className="decks-added-items-icon" onClick={this.deleteItem} ><Icon name='trash alternate' size='' /></span></li>
                  )}
                </ul> : null
              } 
              </Menu.Item>
              { (this.state.addedItems.length && this.state.isSingleTextVisible) ? 
              <Menu.Item className="decks-button-wrapper" >
                 <Button onClick={this.sendWords} style = {{ backgroundColor: this.state.currentColor}} >Изучить</Button>
              </Menu.Item> : null
              }           
            </Menu>           
              {(this.state.words.length && this.state.areTextsVisible) ? 
              <Card.Group className="texts-cards decks-cards" itemsPerRow={3} >
              {this.state.words.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.level) &&
                <Card key={index}>
                  <Card.Content>
                    <div className="texts-image-wrapper decks-image">
                      <Image src={item.image} />
                      <div className="decks-description">
                          <h2>{item.name}</h2>
                          <h3><span>{item.number}</span></h3>
                          <Button onClick={this.readMore} primary className="decks-button" >Открыть</Button>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
               )}
              </Card.Group> : null
             }
             {this.state.isSingleTextVisible ?
              <div className="decks-outer-wrapper">
              <Menu text className="vocab-top-menu-wrapper decks-top-menu">
                <Menu.Item name='byName'> 
                  <Button style = {{ backgroundColor: this.state.currentColor}} onClick = {this.sortByName}> 
                    по имени 
                    {this.state.sortedByNameUp ? <Icon name='arrow up' size='small' className="nav-icon-left" /> : <Icon name='arrow down' size='small' className="nav-icon-left" />  }
                  </Button>
                </Menu.Item>
                <Menu.Item name='byTranslation'> 
                  <Button style = {{ backgroundColor: this.state.currentColor}} onClick = {this.sortByTranslation}>
                    по переводу 
                    {this.state.sortedByTranslationUp ? <Icon name='arrow up' size='small' className="nav-icon-left" /> : <Icon name='arrow down' size='small' className="nav-icon-left" />  }
                  </Button>
                </Menu.Item>
                <Menu.Item style={{float: "right"}} name='close'> 
                  <Button style = {{ backgroundColor: this.state.currentColor}} onClick = {this.backToDecks}>
                    <Icon name='window close outline' size='small' className="nav-icon-left" /> 
                  </Button>
                </Menu.Item>
              </Menu>
                <Card.Group className="texts-cards decks-cards words-cards" itemsPerRow={4} >
                  {this.state.currentWords.map((item, index) => 
                    <Card key={index}>
                      <Card.Content>
                        <div className="texts-image-wrapper decks-image">
                          <Image src={item.image} />
                          <div className="words-description" style = {{ backgroundColor: this.state.currentColor}} > 
                              <h3>{item.name}</h3>
                              <h4>{item.translation}</h4>
                              <Button className="decks-button-add" onClick={this.addToList} disabled= {this.state.disabled[index]} style = {{ color: this.state.currentColor, height: "41px"}} >
                                {this.state.iconsArray[index] ? null : <Icon name='check circle outline' size='big' />

                                } 
                                {this.state.arrayOfButtons[index]}
                              </Button>
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                   )}
                </Card.Group> 
              </div> : null}
       
          </div>
        </div>
        <footer></footer>
      </Fragment>

  );
  }
}

export default AudioList;