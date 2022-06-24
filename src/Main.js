import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input,Dropdown, Icon, Modal, Embed} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';

class Decks extends Component {

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
      texts: [],
      books: [],
      videos: [],
      grammar: []

    }
  }

  componentDidMount() {
    var API_key = "AIzaSyANIs2WwcSlrkJhfkw2z-q0Zumsu80CR28";
    var channelID = "UC4a-Gbdw7vOaccHmFo40b9g";
    var maxResults = 48;
    var videoUrl =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&channelId=" +
      channelID +
      "&part=snippet,id&order=date&maxResults=" +
      maxResults;  	
  	axios.all([axios.get('decks.json'),
               axios.get('working.json'),
               axios.get('texts.json'),
               axios.get('books.json'),
               axios.get('grammar2.json'),
               axios.get(videoUrl)])
            .then(axios.spread((decksResponse, wordsResponse, textsResponse, booksResponse, grammarResponse, videosResponse ) => { 
	          let words = decksResponse.data;
	          let allWords = wordsResponse.data;
	          let texts = textsResponse.data;
	          let books = booksResponse.data;
	          let grammar = grammarResponse.data;
	          let videos = videosResponse.data;
          	  let contentArray = [];
          this.setState({
          	allWords: allWords,
            words: words,
            texts: texts,
            books: books,
            grammar: grammar,
            videos: videos,
            contentArray: contentArray
          }, () => console.log(this.state.grammar[0].rules) );
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
      }, () => console.log(this.state))    
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

    consoleState = () =>{

    }

    getUniqueCategory = () =>{
      
    }

    addToList = (e) =>{
      let array = this.state.addedItems.slice();
      let buttons = this.state.arrayOfButtons.slice();
      let disabled = this.state.disabled.slice();
      let icons = this.state.iconsArray.slice();
      let target = e.target.parentElement.parentElement.parentElement.parentElement;
      let name = e.target.parentElement.children[0].textContent;
      let translation = e.target.parentElement.children[1].textContent;
      var index = 0;
        while ((target = target.previousElementSibling)) {
          index++;
      }
      buttons[index] = "Добавлено !";
      icons[index] = false;
      disabled[index] = "disabled";
      let temp = {}
      temp["name"] = name;
      temp["translation"] = translation;
      array.push(temp);
      this.setState({
      	addedItems: array,
      	arrayOfButtons: buttons,
      	iconsArray: icons,
      	disabled: disabled
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
  //сортировка по переводу
  	sortByTranslation = () =>{
      	let state = this.state.sortedByTranslationUp;
  		const words = this.state.currentWords.slice();
  		console.log("current translation", this.state.currentWords);
  		let newWords = words;
  		if(this.state.isOldestFirst){
  			newWords = words.sort((a,b) => a.translation.localeCompare(b.translation));
  		} else {
  			newWords = words.sort((a,b) => b.translation.localeCompare(a.translation));
  		}
  		console.log("new words", newWords);
  		this.setState({
  			isOldestFirst: !this.state.isOldestFirst,
  			currentWords: newWords,
  			sortedByTranslationUp: !state			
  		})		
  	}

   deleteItem = (id) =>{
   	var newWords = this.state.addedItems.slice();
   	console.log(newWords);
 	  var newIndex = (id.target.parentElement.parentElement);
    console.log(newIndex);
	  const index = [...newIndex.parentElement.children].indexOf(newIndex);
	  console.log(index);
	  newWords.splice(index,1);
    this.setState({addedItems: newWords});
   }
	

  render() {
    let color = this.state.currentColor;
    let filteredWords = this.state.currentWords;
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper recommended-wrapper">
          	<div className="main-section section-1">
          	  <div className="section-overlay">
          	  	<div className="section-header">
          	  		<h2>Лучший способ выучить язык</h2>
          	  		<Link to="/training">Начать учиться</Link>
          	  	</div>
          	  </div>              
            </div>
          	<div className="advantage-section">
          	  <div className="advantage-overlay">
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/settings.png" />
          	  			</span>
          	  			<p>Удобный интерфейс</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/notebook.png" />
          	  			</span>
          	  			<p>Множество возможностей</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/user.png" />
          	  			</span>
          	  			<p>Разнообразные тренировки</p>
          	  		</div>          	  		          	  		
          	  </div>
          	  <div className="advantage-overlay">
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/notepad.png" />
          	  			</span>
          	  			<p>Большой каталог материалов</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/house.png" />
          	  			</span>
          	  			<p>Полностью бесплатно</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/pen.png" />
          	  			</span>
          	  			<p>Разные уровни обучения</p>
          	  		</div>          	  		          	  		
          	  </div>          	                
            </div>            
            <div className="half-section">
            	<div className="half-section-image words-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Изучайте слова</h3>
	            		<ul>
	            			<li>20 тематических наборов</li>
	            			<li>4000 слов</li>
	            			<li>Словарь с расширенным функционалом</li>            			            			
	            			<li>Возможность изучать добавленные слова</li>            			
	            		</ul>
	            		<Link to="/vocabulary">Перейти</Link>
            		</div>
            	</div>
            </div>
            <div className="half-section">
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Тренируйтесь</h3>
	            		<ul>
	            			<li>10 видов тренировок</li>
	            			<li>Тренировка чтения, говорения  и понимания на слух</li>
	            			<li>Возможность добавлять на тренировку изучаемые слова</li>
	            		</ul>
	            		<Link to="/training">Перейти</Link>
            		</div>
            	</div>
            	<div className="half-section-image training-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>            	
            </div>
            <div className="half-section">
            	<div className="half-section-image grammar-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Учите грамматику</h3>
	            		<ul>
	            			<li>Изучение времен английского языка</li>
	            			<li>Примеры употребления</li>
	            		</ul>
	            		<Link to="/grammar">Перейти</Link>
            		</div>
            	</div>
            </div>
            <div className="half-section">
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Улучшайте навыки чтения</h3>
	            		<ul>
	            			<li>120 учебных текстов</li>
	            			<li>Различная тематика</li>
	            			<li>Тексты разного уровня сложности</li>
	            		</ul>
	            		<Link to="/texts">Перейти</Link>
            		</div>
            	</div>
            	<div className="half-section-image texts-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>            	
            </div>
            <div className="half-section">
            	<div className="half-section-image books-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Читайте книги</h3>
	            		<ul>
	            			<li>Книги на любой вкус</li>
	            			<li>Возможность слушать аудиокниги</li>
	            			<li>Книги различного уровня сложности</li>
	            		</ul>
	            		<Link to="/books">Перейти</Link>
            		</div>
            	</div>
            </div>     
          </div>
        </div>
        <footer></footer>
      </Fragment>

	);
  }
}

export default Decks;