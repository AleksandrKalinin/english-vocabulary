import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input,Dropdown, Icon } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';


class Fragments extends Component {

  constructor(props){
    super(props);
    this.state = {
        texts: []
    }
  }

  componentDidMount() {
      this.setStateOnStart();
    }

    setStateOnStart = () => {
      this.setState({
        texts: [],
        options: [],
        categoryValue: '',
        value: null,
        areTextsVisible: true,
        isSingleTextVisible: false,
        isMenuVisible: true,
        isCheckButtonVisible: false,
        isResultVisible: false,
        title: '',
        content: '',
        image: null,
        contentArray: [],
        currentTempArray: [],
        currentStringArray: [],
        currentRandomWord: '',
        currentFinalArray: [],
        currentRandomArray: [],
        currentOneArray: [],
        activeInput: 0,
        activeArray: [],
        sortedRandomArray: [],
        comparativeRandomArray: [],
        fragmentArrayIndexes: [],
        rightAnswers: 0,
        //livesCount: 3,
        livesArray: []        
      }, () => this.initialLoad())
    }

    initialLoad = () => {
      axios.get('/texts.json')
        .then(res => {
          let texts = res.data;
          let contentArray = [];
          texts.map((item, index) => contentArray.push(item.content) )
          this.setState({ 
            texts,
            contentArray
          }, () => this.setMenuParams());
        })
    }

    setMenuParams = () =>{
      let options = [];
      this.state.texts.map((item, i) =>
                    options.push({ 
                        key: item.id, 
                        text: item.difficulty, 
                        value: item.difficulty 
                     }))
      this.setState({
        options
      }, () => this.getUnique())
    } 

    getUnique = () => {
      var options = this.state.options.slice();
      var comp = 'text';
      const unique = options
          .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => options[e]).map(e => options[e]);
      this.setState({
        options
      })    
    }  

    selectValue = () => {
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.selectValue() )         

    readMore = (id) =>{
      let texts = this.state.texts.slice();
      let title = texts[id].title;
      let content = texts[id].content;
      let image = texts[id].image
      this.buildLives();
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        isMenuVisible: false,
        title,
        content,
        image
      }, () => this.builtArray())
    }

    backToTexts = () =>{
      this.setState({
        areTextsVisible: true,
        isSingleTextVisible: false,
        isMenuVisible: true,
    		contentArray: [],
    		currentTempArray: [],
    		currentStringArray: [],
    		currentRandomWord: '',
    		currentFinalArray: [],
    		currentRandomArray: [],
    		currentOneArray: [],
    		activeInput: 0,
    		activeArray: [],
    		sortedRandomArray: [],
    		comparativeRandomArray: [],
    		fragmentArrayIndexes: []        

      })
    }



    builtArray = () => {
      let currentOneArray = [];
	    let activeTargetContent = this.state.content.slice();
      let currentStringArray = activeTargetContent.split(". ");
      currentStringArray.pop();
      let currentFullArray = [];
      for (var i = 0; i < currentStringArray.length; i++) {
      	currentFullArray.push(currentStringArray[i].split(" "));
      }
      let currentWordArray = currentStringArray[0].split(" ");
      let currentRandomArray = [];
      let currentRandomIndexes = [];
      for (var i = 0; i < currentFullArray.length; i++) {
      	let j = Math.floor(Math.random()*currentFullArray[i].length);
      	currentRandomArray.push(currentFullArray[i][j]);
      	currentRandomIndexes.push(j);
      }
      let random = currentWordArray[Math.floor(Math.random()*currentWordArray.length)];
      let currentFinalArray = [];
    
      for (var i = 0; i < currentFullArray.length; i++) {
      	let curArr = currentFullArray[i];
	      	for (var j = 0; j < curArr.length; j++) {
            	currentOneArray.push(curArr[j]);
		      	if (j !== currentRandomIndexes[i] ) {
		      		currentFinalArray.push(<span className="fragment-span">{curArr[j]}</span>)
		      	}
		      	else {
		      		currentFinalArray.push(<span onClick={this.resetValue} className="fragment-input"></span>)
		      	}
	      	}
	      	currentFinalArray.push(<span className="fragment-dot">.</span>);
      }

      this.setState({
      	currentStringArray,
        currentWordArray,
        currentRandomWord: random,
        currentFinalArray,
        currentRandomIndexes,
        currentRandomArray,
        currentFullArray,
        currentOneArray
      }, () => this.shuffleArray())     
    }

   setValue = (e) => {
      let activeInput = this.state.activeInput;
      let activeArray = [];
      let currentFullArray = this.state.currentFullArray.slice();
      let currentFinalArray = this.state.currentFinalArray.slice();
      let currentRandomArray = this.state.currentRandomArray.slice();
      let currentRandomIndexes = this.state.currentRandomIndexes.slice();
      let activeTargetTitle = e.target.textContent;
      let fragmentArray = [];
      let fragmentArrayIndexes = [];
      let fragmentDescription = document.getElementsByClassName('fragment-description')[0].children;
      for (var i = 0; i < fragmentDescription.length; i++) {
      	if(fragmentDescription[i].className == "fragment-input"){
      		fragmentArrayIndexes.push(i);
      		fragmentArray.push(fragmentDescription[i]);
      	}
      }
      for (var i = 0; i < fragmentArrayIndexes.length; i++) {
      	activeArray.push(i);
      }
      for (var i = 0; i < fragmentDescription.length; i++) {
      	if( (fragmentDescription[i].className == "fragment-input") && (i == fragmentArrayIndexes[activeInput])){
      		fragmentDescription[i].textContent = activeTargetTitle;
      	}
      }
		  fragmentArrayIndexes.splice(activeInput, 1);
      let comparativeRandomArray = this.state.comparativeRandomArray.slice();
      let sortedRandomArray = this.state.sortedRandomArray.slice();
      let target = e.target;
      comparativeRandomArray.push(target.textContent);
      var indexTarget = 0;
        while ( (target = target.previousElementSibling) ) {
          indexTarget++
      }

      sortedRandomArray.splice(indexTarget, 1);
      if (sortedRandomArray.length === 0) {
      	this.setState({
      		isCheckButtonVisible: true
      	})
      }

      activeInput++;
      this.setState({
  			activeInput,
  			activeArray,
  			fragmentArrayIndexes,
  			currentRandomArray,
  			comparativeRandomArray,
  			sortedRandomArray
		})
    
  }

	shuffleArray = () => {
		let array = this.state.currentRandomArray.slice();
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
	    this.setState({
        	sortedRandomArray: array	    	
	    })
	}

    resetValue = (e) =>{
	    let sortedRandomArray = this.state.sortedRandomArray.slice(); 
      let element = e.target;
      if (e.target.textContent !== "") {
      	  sortedRandomArray.push(e.target.textContent);
      	  element.innerText = "";
  	      this.setState({
  	      	sortedRandomArray: sortedRandomArray
  	      })
	        var indexTarget = 0;
	        while ( (element = element.previousElementSibling) ) {
	          indexTarget++
	        }
      }
    }

    submitText = (e) =>{
    	let comparativeRandomArray = this.state.comparativeRandomArray.slice();
    	let currentSortedArray = this.state.currentRandomArray.slice();
    	let sortedRandomArray = this.state.sortedRandomArray.slice();
    	let count = 0;
    	for (var i = 0; i < currentSortedArray.length; i++) {
    		if (currentSortedArray[i] === comparativeRandomArray[i]) {
    			count++;
    		}
    		else {
    			sortedRandomArray.push(comparativeRandomArray[i])
    		}
    		
    	}
    	let rightAnswers = count;
      let exercise = {};
    	this.setState({
    		isCheckButtonVisible: false,
    		isResultVisible: true,
    		isSingleTextVisible: false,
    		rightAnswers,
    		sortedRandomArray
    	})
    }

    tryAgain = () =>{
    	let lives = this.state.livesCount;
    	lives = lives - 1;
    	this.setState({
    		isResultVisible: false,
    		isSingleTextVisible: true,
    		livesCount: lives
    	}, () => this.buildLives() )
    }

    buildLives = () =>{
    	let livesCount = this.state.livesCount;
    	let lives = [];
    	for (var i = 0; i < livesCount; i++) {
    		lives.push(<Icon name='like' size='big' />)
    	}
    	this.setState({
    		livesArray: lives
    	})
    }


  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper fragments-wrapper">
          {this.state.isMenuVisible && this.state.texts.length ?
            <Menu className="texts-menu" vertical>
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
              </Menu.Item>
            </Menu> : null 
          }
            {(this.state.texts.length && this.state.areTextsVisible) ? 
              <Card.Group className="texts-cards" itemsPerRow={3} >
              {this.state.texts.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.difficulty) &&
                <Card key={index}>
                  <Card.Content>
                    <div className="texts-image-wrapper">
                      <Image src={item.image} />
                    </div>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Description>
                      {item.content.substr(0,250) + ' ...'}
                    </Card.Description>
                  </Card.Content>
                  <Button onClick={this.readMore.bind(this, item.id)} >Читать далее</Button>
                </Card>
               )}
              </Card.Group> : null
             }
             {this.state.isSingleTextVisible ? 
                <Card className="single-text-card single-fragments-card">
                	<div className="fragments-close">
                		<span onClick={this.backToTexts}>
                			<Icon name='close' size='big' />
                		</span>
                	</div>
                  <Card.Content className="fragments-content">
                    <Card.Description className="single-text-card-description p-wrap fragment-description">
                    	{this.state.currentFinalArray}
                    </Card.Description> 
                  </Card.Content>
             	<div className="fragment-variants">
            		{this.state.sortedRandomArray.map((item, index) =>
            			<span onClick={this.setValue} key={index} className="fragment-span">{item}</span>
            		)}
	            	{this.state.isCheckButtonVisible ? 
	            		<Button onClick={this.submitText} >Проверить</Button> :null
	            	}             		
            	</div>
                </Card>:null
              } 
              {this.state.isResultVisible ?
                <Card className="single-text-card single-fragments-card">
                  <Card.Content className="fragments-content">
                    <Card.Description className="single-text-card-description p-wrap fragment-description">
                    	<h2>Вы расставили правильно {this.state.rightAnswers} из {this.state.currentRandomArray.length} слов </h2>
                    </Card.Description>
                  </Card.Content>
                  <div className="fragment-variants">
                  	<Button primary onClick={this.setStateOnStart}>Заново</Button>
                    <Button primary ><Link className="training-link" to="/training">К тренировкам</Link></Button>
                  </div> 
                </Card> : null
              }         
          </div>
        </div>
        <footer></footer>
      </Fragment>

  );
  }
}

function mapStateToProps(state) {
  return {store: state.exercisesReducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Fragments);