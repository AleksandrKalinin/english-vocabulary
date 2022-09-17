import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Dropdown, Icon} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';

class Decks extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.setStateOnStart()
  }

  constructMenu = () =>{
    let options = [];
    this.state.words.map((item, i) =>
                  options.push({ 
                      key: item.id, 
                      text: item.level, 
                      value: item.level
                   }))
    this.setState({
      options
    }, () => this.getUnique())
  } 

    getUnique = () => {
      var arr = this.state.options;
      var comp = 'text';
      const options = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
      this.setState({
        options,
      })    
    }  

    setValue = () =>{
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.setValue() )  

    readMore = (id) =>{
      let arrayOfButtons = [];    	
      let iconsArray = [];
      let disabled = [];
      let colors = this.state.arrayOfColors.slice(); 
      let allWords = this.state.allWords.slice();
      let currentWords = [];
      let currentColor = colors[Math.floor(Math.random()*colors.length)];
      let activeTargetTitle = this.state.words.find(x => x.id === id).name;

      for (var i = 0; i < allWords.length; i++) {
      	if(allWords[i]["category"] === activeTargetTitle ){
      		currentWords.push(allWords[i])
          arrayOfButtons.push("Добавить");
          iconsArray.push(true);
          disabled.push(false);          
      	} 
      }

      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isDropdownVisible: false,
        currentWords,
        currentColor,
        arrayOfButtons,
        iconsArray,
        disabled      	
      })
    }


    addToList = (id) =>{
      let addedItems = this.state.addedItems.slice();
      let currentWords = this.state.currentWords.slice();
      let arrayOfButtons = this.state.arrayOfButtons.slice();
      let disabled = this.state.disabled.slice();
      let iconsArray = this.state.iconsArray.slice();
      let selected = currentWords.find(x => x.id === id);      
      arrayOfButtons[id] = "Добавлено !";
      iconsArray[id] = false;
      disabled[id] = "disabled";
      addedItems.push(selected);
      this.setState({
      	addedItems,
      	arrayOfButtons,
      	iconsArray,
      	disabled
      })

    }

    addedFirst = () =>{
    	let state = this.state.sortedByTranslationUp;
    	this.setState({
    		addedUp: !state
    	})
    }

  //сортировка по имени
  	sortByName = () =>{
      let sortedByNameUp = this.state.sortedByNameUp;
  		const words = this.state.currentWords.slice();
  		let currentWords;
  		if(this.state.isOldestFirst){
  			currentWords = words.sort((a,b) => a.name.localeCompare(b.name));
  		} else {
  			currentWords = words.sort((a,b) => b.name.localeCompare(a.name));
  		}
  		this.setState({
  			isOldestFirst: !this.state.isOldestFirst,
  			currentWords,
  			sortedByNameUp: !sortedByNameUp			
  		})		
  	}

  //сортировка по переводу
  	sortByTranslation = () =>{
  		const words = this.state.currentWords.slice();
  		let currentWords;
  		if(this.state.isOldestFirst){
  			currentWords = words.sort((a,b) => a.translation.localeCompare(b.translation));
  		} else {
  			currentWords = words.sort((a,b) => b.translation.localeCompare(a.translation));
  		}

  		this.setState({
  			isOldestFirst: !this.state.isOldestFirst,
  			currentWords,
  			sortedByTranslationUp: !this.state.sortedByTranslationUp			
  		})		
  	}

   deleteItem = (id) =>{
    let arrayOfButtons = this.state.arrayOfButtons.slice();
    let iconsArray = this.state.iconsArray.slice(); 
   	let addedItems = this.state.addedItems.slice();
    let disabled = this.state.disabled.slice();
    arrayOfButtons[id] = "Добавить";    
    iconsArray[id] = true;
    disabled[id] = false;
 	  addedItems.splice(addedItems.findIndex(function(item){
        return item.id === id;
    }), 1);
    this.setState({ addedItems, disabled, iconsArray, arrayOfButtons });
   }

   deleteAll = () => {
    let arrayOfButtons = this.state.arrayOfButtons.slice();
    let iconsArray = this.state.iconsArray.slice(); 
    let addedItems = this.state.addedItems.slice();
    let disabled = this.state.disabled.slice();
    addedItems = [];
    for (var i = 0; i < disabled.length; i++) {
      disabled[i] = false;
      arrayOfButtons[i] = "Добавить";
      iconsArray[i] = true;
    }
    this.setState({ addedItems, arrayOfButtons, iconsArray, disabled  })    
   }

   setStateOnStart = () => {
    this.setState({
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
      allWords: [],
      currentWords: [],
      arrayOfColors: ["#3281F0"],
      currentColor: "white",
      sortedByNameUp: true,
      sortedByTranslationUp: true,
      addedUp: true,
      addedItems: [],
      arrayOfButtons: [],
      iconsArray: [],
      disabled: [],
      contentLoaded: false      
    }, () => this.initialLoad())
   }

   initialLoad = () => {
    axios.all([axios.get('./decks.json'),
               axios.get('./working.json')])
          .then(axios.spread((firstResponse, secondResponse) => { 
          let words = firstResponse.data;
          let allWords = secondResponse.data;
          let contentArray = [];
          this.setState({
            allWords,
            words,
            contentArray,
            contentLoaded: true
          }, () => this.constructMenu());
       }))
   }	

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          {this.state.contentLoaded ?
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
                <Menu.Item className="no-top-padding added-title" style = {{ backgroundColor: this.state.currentColor}} >
                  {this.state.addedItems.length ? "Добавленные" : "Добавленных пока нет"}
                </Menu.Item>
                {(this.state.addedItems.length) ? 
                <Menu.Item className="no-padding decks-added-outer-wrapper">
                  <ul className="decks-added-wrapper">
                    {this.state.addedItems.map((item,index)=> 
                      <li key={index}  className="decks-added-items" style = {{ backgroundColor: this.state.currentColor}}>
                        <span className="decks-added-items-name">{item.name} - {item.translation}</span><span className="decks-added-items-icon" onClick={this.deleteItem.bind(this, item.id)} ><Icon name='trash alternate' /></span></li>
                    )}
                  </ul>
                </Menu.Item> : null }
                { (this.state.addedItems.length && this.state.isSingleTextVisible) ? 
                <Menu.Item className="decks-button-wrapper" >
                   <Button onClick={this.sendWords} style = {{ backgroundColor: this.state.currentColor}} className="decks-button__learn" >Изучить <Icon name='book' className="nav-icon-left" /> </Button>
                   <Button onClick={this.deleteAll} style = {{ backgroundColor: this.state.currentColor}} className="decks-button__learn" >Удалить <Icon name='trash alternate' className="nav-icon-left" /> </Button>
                </Menu.Item> : null
                }           
              </Menu>           
                {(this.state.words.length && this.state.areTextsVisible) ? 
                <Card.Group className="texts-cards decks-cards" itemsPerRow={3} >
                  {this.state.words.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.level) &&
                    <Card key={index} className="decks-single-card">
                      <Card.Content>
                        <div className="texts-image-wrapper decks-image">
                          <Image src={item.image} />
                          <div className="decks-description">
                              <h2>{item.name}</h2>
                              <h3>{item.number} слов</h3>
                              <Button onClick={this.readMore.bind(this, item.id)} primary className="decks-button" >Открыть</Button>
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
                    <Button style = {{ backgroundColor: this.state.currentColor}} onClick = {this.setStateOnStart} title="Назад">
                      <Icon name='window close outline' className="nav-icon-left" size="" /> 
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
                                <Button className="decks-button-add" onClick={this.addToList.bind(this, item.id)} disabled= {this.state.disabled[index]} style = {{ color: this.state.currentColor, height: "41px"}} >
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
          : null}
        </div>
        <footer></footer>
      </Fragment>

	);
  }
}

export default Decks;