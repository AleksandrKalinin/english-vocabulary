import React, { Component, Fragment } from 'react';
import { Button, Card, Menu, Dropdown, Icon, Form, Divider, Label } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import axios from 'axios';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Tests extends Component {

  constructor(props){
    super(props);
    this.state = {
      tests: [],
      options: [],
      categoryValue: '',
      categoryArray: [],
      areTestsVisible: true,
      isSingleTestVisible: false,
      title: '',
      content: '',
      image: null,
      value: '',
      currentValue: '',
      currentTest: [],
      activeTest: null,
      curIndexTest: 0,
      curIndexCheckbox: 0,
      correctResults: [],
      correctAnswers: [],
      incorrectAnswers: [],
      isMenuVisible: true,
      isTooltipVisible: false,
      currentColor: null
    }
  }

  componentDidMount() {
      axios.get('./tests.json')
        .then(res => {
          let tests = res.data;
          this.setState({ 
            tests: tests
          }, () => this.getMenuParams());
        })
    }

    componentDidUpdate(prevState) {
      if (prevState.currentTest !== this.state.currentTest) {
        
      }
    }

    getMenuParams = () =>{
      let newItems = [];
      this.state.tests.map((item, i) =>
                    newItems.push({ 
                        key: item.title, 
                        text: item.difficulty, 
                        value: item.difficulty
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

    selectCategory = () =>{
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.selectCategory() ) 

    testChange = (e) =>{
      let parentid = e.target.getAttribute("parentid");   
      let id = e.target.getAttribute("id");
      let currentTest = this.state.currentTest.slice();
      const arr = new Array(3).fill(false);
      arr[id] = true;
      currentTest[parentid] = arr;
      this.setState({
        currentTest
      })
    }

    selectTest = (testId) =>{
      let tests = this.state.tests.slice();
      let activeTest = tests.find(x => x.id === testId);

      let currentTest = [];
      let testItem = [];
      let correctResults = [];

      activeTest.tasks.map((item, index) => correctResults.push(item.correct_answer));      
      for (let i = 0; i < 3; i++) {
        testItem.push(false);
      }
      for (let x = 0; x < activeTest.tasks.length; x++) {
        currentTest.push(testItem);
      }

      this.setState({
        activeTest,
        currentTest,
        correctResults
      }, () => this.setState({
          areTestsVisible: false,
          isSingleTestVisible: true,
      }));
    }

    backToTests = () =>{
      this.setState({
        areTestsVisible: true,
        isSingleTestVisible: false,
        isMenuVisible: true,
        isResultVisible: false,
    		currentTest: [],
    		curIndexTest: 0,
    		curIndexCheckbox: 0,
    		correctResults: [],
    		correctAnswers: [],
    		incorrectAnswers: [],
      })
    }

    checkResults = () =>{
    	let resultsArray = this.state.currentTest.slice();
    	let correctResults = this.state.correctResults.slice();
    	let finalResults = [];
    	let correctAnswers = [];
    	let incorrectAnswers = [];
      let i;
    	for (i = 0; i < resultsArray.length; i++) {
    		let item = resultsArray[i];
    		for (var j = 0; j < item.length; j++) {
    			if (item[j]) {
    				finalResults.push(j);
    			}
    		}
    	}

      if(finalResults.length === this.state.activeTest.tasks.length) {
        for (i = 0; i < finalResults.length; i++) {
          if(correctResults[i] === finalResults[i]){
            correctAnswers.push(i)
          }
          else{
            incorrectAnswers.push(i)
          }
        }
        let test = {};
        test.score = correctAnswers.length;
        test.date = new Date();
        test.percentage = Math.round(test.score / this.state.activeTest.tasks.length * 1000) / 10;
        this.props.actions.updateTestsComplete();
        this.props.actions.updateTests(test);
        this.setState({
          isResultVisible: true,
          isSingleTestVisible: false,
          correctAnswers,
          incorrectAnswers,
          isMenuVisible: false,
          isTooltipVisible: false
        })                
      }
      else{
        this.setState({
          isTooltipVisible: true
        })
      }
 	
    }


  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper">
          {this.state.areTestsVisible ?
            <Menu className="texts-menu" vertical>
                <Menu.Item name='inbox'>
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
          {(this.state.tests.length && this.state.areTestsVisible) ? 
            <Card.Group className="texts-cards tests-cards" itemsPerRow={3} >
              {this.state.tests.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.difficulty) &&            
              <Card key={index} className="test-card test-item" style = {{boxShadow: `0 1px 3px 0 ${item.color}, 0 0 0 1px ${item.color}` }} >
                <Card.Content>
                  <Card.Header className="tests-card-title" style = {{backgroundColor: item.color}} >
                  	<h3>{item.difficulty}</h3>
                  	<span>{item.title}</span>
                  </Card.Header>
                  <Card.Description className="tests-card-description">
                     <p className="tests-card-description-line">Количество заданий - <span className="tests-card-description-txt">{item.number}</span></p>
                     <p className="tests-card-description-line">Максимальное кол-во баллов - <span className="tests-card-description-txt">{item.totalScore}</span></p>
                  </Card.Description>
                </Card.Content>
                <Button onClick={ () => {this.selectTest(item.id)} /*this.selectTest.bind(this, item.id) */} style = {{backgroundColor: item.color }} >Начать тест</Button>
              </Card>
             )}
            </Card.Group> : null
          }
         {this.state.isSingleTestVisible ? 
            <Card className="single-text-card tests-wrapper">
              <h1>
              	{this.state.activeTest.title}
              	<span onClick={this.backToTests} title="Назад к тестам" ><Icon name='window close outline'/></span>
              </h1>
              <Card.Content>
                {this.state.activeTest.tasks.slice().map((item, index) =>
                    <Card.Description key={item.id} id={index} className="single-text-card-description">
                    <h3 >{item.sentence}</h3>
                    <Form className="single-test-form" >
                      {item.variants.map((param, ind) => 
                        <label className="test-label" key={ind}>
                          <input type="checkbox" 
                            id={ind}
                            parentid={item.id}
                            label={param}
                            name='checkboxRadioGroup'
                            value={item}
                            checked={this.state.currentTest[item.id][ind]}
                            onChange={this.testChange}/>
                            {param}                          
                        </label>
                      )}                                             
                    </Form>                      
                  </Card.Description>
                )}
              </Card.Content>
              {this.state.isTooltipVisible ?
                <div className="tests-tooltip">
                    <h4>Заполните все поля!</h4>               
                </div> : null
              }
              <div className="tests-button-wrapper decks-button-wrapper">
              	<Button onClick={this.checkResults} >Принять</Button>                  	
              </div>
            </Card>:null
          }
          {this.state.isResultVisible ? 
            <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper test-final" >
             <Card className="card-training test-result-card" >
                <Card.Content>
                  <Card.Header>Результаты</Card.Header>
                  <Divider/>
    						  <div className="grades-results-wrapper">
    							  <h3>Количество правильных ответов - <span>{this.state.correctAnswers.length}</span> из <span>{this.state.activeTest.tasks.length}</span> </h3>
                    <h3>Ваша оценка - <span>{this.state.correctAnswers.length} </span> баллов </h3>
    						  </div>		                  
                  <Card.Description className="results-wrapper">
                    <div className="positive-results-wrapper"> 
                      <div className="positive-results">
                        {this.state.correctAnswers.length}
                      </div>
                      <Label>Верно</Label>                    
                    </div>
                    <div className="negative-results-wrapper"> 
                      <div className="negative-results">
                        {this.state.incorrectAnswers.length}
                      </div> 
                      <Label>Неверно</Label>                   
                    </div>
                  </Card.Description>
                  <Button.Group className="card-buttons-wrapper">
                    <Button primary onClick={this.backToTests}>Назад к тестам</Button>
                  </Button.Group>
                </Card.Content>
              </Card>          
            </Card.Group> : null 
          }       
          </div>
        </div>  
        <footer></footer>
      </Fragment>
   );
  }
}

function mapStateToProps(state) {
  return {store: state.testsReducer}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests);