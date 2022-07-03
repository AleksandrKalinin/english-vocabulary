import React, { Component, Fragment } from 'react';
import { List, Button, Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import VocabWord from'./VocabWord'
import VocabSideMenu from'./VocabSideMenu'
import TopMenu from './TopMenu'
import VocabTopMenu from './VocabTopMenu'
import speech from 'speech-synth';

import {bindActionCreators} from 'redux';
import actions from './actions/index';

import {connect} from 'react-redux';

class Vocabulary extends Component {
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
		this.handler = this.handler.bind(this);	
		this.sortByName = this.sortByName;
		this.sortByTranslation = this.sortByTranslation;
		this.sortByDate = this.sortByDate;
	
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
			newWords = words.sort((a,b) => a.name.localeCompare(b.name) /*console.log('a,b ', a,b) */ );
		} else {
			newWords = words.sort((a,b) => b.name.localeCompare(a.name) /*console.log('b,a ', b,a) */ );
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

	UNSAFE_componentWillMount(){
	    axios.get('/working.json')
	      .then(res => {
	        const words = res.data;
	        this.setState({ words });
	      })
	  }

   delete = (id) =>{
   	let words = this.state.words.slice();
   	words.splice(words.findIndex(function(i){
    	return i.id === id;
		}), 1);
   	this.setState({	words	})
   }

   deleteWord = (id) => {
   	let words = this.state.words.slice();
   	words.splice(words.findIndex(function(i){
    	return i.id === id;
		}), 1);
   	this.setState({	words	}, () => this.toggleModal());
   }

   myCallback = (dataFromChild) =>{
   		this.setState({
   			categoryValue: dataFromChild.value,
   			options: dataFromChild.options
   		}) 
   }

   topMenuCallback = (dataFromChild) =>{
   		this.setState({
   			words: dataFromChild
   		}) 
   } 

   searchCallback = (dataFromChild) =>{
   		this.setState({
   			search: dataFromChild
   		}) 
   } 

   consoleState = () => {
   	console.log(this.state)
   }

   toggleModal = () => {
   	let value = this.props.store.vocabModalOpen;
   	this.props.actions.toggleVocabModal(!value);
   }



  render() {  	
  	let filteredWords = this.state.words.filter(
  		(word) =>{
  			return word.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
  		}
  	);  	
    return (
    	<Fragment>
    		{this.props.store.vocabModalOpen ?
	    		<div className="modal-container">
	    			<div className="modal-word">
	    				<span title="Закрыть" onClick={this.toggleModal} className="modal-word__icon modal-word__icon--close"><Icon name = 'close' size="large" /></span>
	    				<div className="modal-word__image">
	    					<img src = {this.props.store.selectedVocabWord.image} />
	    				</div>
	    				<p className="modal-word__title">{this.props.store.selectedVocabWord.name} - <span className="modal-word__translation">{this.props.store.selectedVocabWord.translation}</span></p>
	    				<span onClick={this.deleteWord.bind(this, this.props.store.selectedVocabWord.id)} title="Удалить" className="modal-word__icon modal-word__icon--delete"><Icon size="large" name = 'trash alternate outline'/></span>
	    			</div>
	    		</div>
    		: null}
	    	<div className="content-wrapper">
	    		<TopMenu></TopMenu>
	    		<div className="vocab-side-menu">
	    			<VocabSideMenu callbackFromParent={this.myCallback} items={this.state.words} ></VocabSideMenu>
	    			<div className="vocab-top-menu">
	    				<VocabTopMenu 
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
									word = {word}
									delete={this.delete}
									id={word.id}
									key={word.id} 
									name={word.name}
									transcription = {word.transcription} 
									translation={word.translation} 
									meaning={word.meaning}
									image={word.image} 
									index={index}>
								</VocabWord>
							)} 
			  			</List>
			  			<div className="load-more-button">
							{this.state.visible < this.state.words.length &&
				            	<Button onClick={this.loadMore} primary>Загрузить ещё</Button>
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

function mapStateToProps(state){
  return {store: state.reducer};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
