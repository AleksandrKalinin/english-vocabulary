import React, { Component, Fragment } from 'react';
import { List, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import VocabWord from'./VocabWord'
import VocabSideMenu from'./VocabSideMenu'
import TopMenu from './TopMenu'
import VocabTopMenu from './VocabTopMenu'
import speech from 'speech-synth';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			words: [],
			isOldestFirst: true,
			visible: 15,
			query: '',
			searchString: [],
			search: '',
			categories: [],
			categoryValue: 'all'	
		};
		this.delete = this.delete;
		this.voiceWord = this.voiceWord;
		this.voiceWordFromModal = this.voiceWordFromModal;
		this.handler = this.handler.bind(this);	
		this.sortByName = this.sortByName;
		this.sortByTranslation = this.sortByTranslation;
		this.sortByDate = this.sortByDate;
		this.newFunction = this.newFunction;	
		
	}

 handler() {
    this.setState({
     words: []
    })
  }

//подгрузка слов
	loadMore = () => {
	    this.setState((prev) => {
	      return {visible: prev.visible + 15};
	    });
	  }
//сортировка по дате
	sortByDate = () => {
    const words = this.state.words.slice();
    let newWords = [];
    if(this.state.isOldestFirst){
      newWords = words.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    }
    else{
      newWords = words.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });      
    }
    console.log(newWords);
    this.setState({
      isOldestFirst: !this.state.isOldestFirst,
      words: newWords
    })
	} 
//сортировка по имени
	sortByName = () =>{
		const words = this.state.words;
		let newWords = words;
		if(this.state.isOldestFirst){
			newWords = words.sort((a,b) => a.name.localeCompare(b.name));
		} else {
			newWords = words.sort((a,b) => b.name.localeCompare(a.name));
		}
		this.setState({
			isOldestFirst: !this.state.isOldestFirst,
			words: newWords
		})		
	}
//сортировка по переводу
	sortByTranslation = () =>{
		const words = this.state.words;
		let newWords = words;
		if(this.state.isOldestFirst){
			newWords = words.sort((a,b) => a.translation.localeCompare(b.translation));
		} else {
			newWords = words.sort((a,b) => b.translation.localeCompare(a.translation));
		}
		this.setState({
			isOldestFirst: !this.state.isOldestFirst,
			words: newWords
		})		
	}

	componentDidMount() {
	    axios.get('./vocabulary.json')
	      .then(res => {
	        const words = res.data;
	        this.setState({ words });
	      })
	  }
/*
	handleInputChange = (event) => {
	    this.setState({
	        query: event.target.value
	    },
	    ()=>{
	  this.filterArray();
	})


	filterArray = () => {
	    let searchString = this.state.query;
	    let words = this.state.words;
	    if(searchString.length > 0){
	        words = words.filter(searchString);
			this.setState({
			   words: words
			})
	    }
	}
*/

	  /*
    sortByPriceAsc = () =>{
      this.setState(prevState => {
        this.words.sort((a,b) => (a.name - b.name) )
      })
    }

    sortByPriceDesc = () =>{
      this.setState(prevState => {
        this.swords.sort((a,b) => (b.name - a.name) )
      })
    } 

<input type="text" id="filter" placeholder="Search for..."  onChange={this.handleInputChange} />

    */
//поиск  

//text to speech

/*
  deleteItem(e,id){
 	var newWords = this.state.words.slice();
    console.log(newWords);
    var index = newWords.indexOf(e.target.value);
    console.log(index);
    
    if (index !== -1) {
        newWords.splice(index, 1);
        this.setState({words: newWords});
      }  
  
    }
*/
   delete = (id) =>{
   	var newWords = this.state.words.slice();
   	console.log(newWords);
 	var newIndex = (id.target.parentElement.parentElement.parentElement);
    console.log(newIndex);
	const index = [...newIndex.parentElement.children].indexOf(newIndex);
	console.log(index);
	newWords.splice(index,1);
        this.setState({words: newWords});
   }

   newFunction = () =>{
   	console.log('new');
   }

   voiceWord = (el) =>{
   		var newWords = this.state.words.slice();
   		var newIndex = (el.target.parentElement.parentElement.parentElement);
   		var first = newIndex.children[1].firstChild.firstChild.textContent;
   		console.log(first);
   		speech.say(first);
   }

   voiceWordFromModal = (el) =>{
   		var newWords = this.state.words.slice();
   		var newIndex = (el.target.parentElement.children[1].textContent);
   		console.log(newIndex);
   		speech.say(newIndex);
   }

   myCallback = (dataFromChild) =>{
   	console.log(dataFromChild);
   		this.setState({
   			categoryValue: dataFromChild.value,
   			options: dataFromChild.options
   		}) 
   }

   topMenuCallback = (dataFromChild) =>{
   	console.log(dataFromChild);
   		this.setState({
   			words: dataFromChild
   		}) 
   } 

   searchCallback = (dataFromChild) =>{
   	console.log(dataFromChild);
   		this.setState({
   			search: dataFromChild
   		}) 
   } 

   consoleState = ()=>{
   	console.log(this.state)
   }

  render() {
  	let filteredWords = this.state.words.filter(
  		(word) =>{
  			return word.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
  		}
  	);  	
    return (
    	<Fragment>
	    	<div className="content-wrapper">
	    		<TopMenu></TopMenu>
	    		<div className="vocab-side-menu">
	    			<VocabSideMenu callbackFromParent={this.myCallback} items={this.state.words} ></VocabSideMenu>
	    			<div className="vocab-top-menu">
	    				<VocabTopMenu 
	    					words ={this.state.words} 
	    					handler = {this.handler}
	    					sortByName={this.sortByName}
	    					sortByTranslation={this.sortByTranslation}
	    					sortByDate ={this.sortByDate}
	     					callbackFromApp={this.topMenuCallback}
	    					searchFromApp={this.searchCallback} 
	    					>
						</VocabTopMenu>
			 			<List className="vocab-list" relaxed='very'>
							{filteredWords.slice(0,this.state.visible).map((word,index) => 
								(this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === word.category) && 
								<VocabWord
									newFunction={this.newFunction}
									voiceWord={this.voiceWord}
									voiceWordFromModal = {this.voiceWordFromModal}
									delete={this.delete}
									key={word.id} 
									name={word.name} 
									translation={word.translation} 
									meaning={word.meaning}
									image={word.image} 
									index={index}>
								</VocabWord>
							)} 
			  			</List>
			  			<div className="load-more-button">
							{this.state.visible < this.state.words.length &&
				            	<Button onClick={this.loadMore} primary>Load more</Button>
				          	}				  				
			  			</div>
	    			</div>
	    		</div>
	    	</div>
	    	
	    	<footer></footer>
	    </Fragment>	
	);
  }
}

export default App;
