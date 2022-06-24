import React, { Component, Fragment } from 'react';
import { List, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TopMenu from './TopMenu'
import Pagination from "react-js-pagination";
import axios from 'axios';

class PaginationExample extends Component {
/*	
	constructor(props){
		super(props);
		this.state = {
			words: [],
			activePage: 15	
		};
		
	}

 
	componentDidMount() {
	    axios.get('/vocabulary.json')
	      .then(res => {
	        const words = res.data;
	        this.setState({ words });
	      })
	  }

   consoleState = ()=>{
   	console.log(this.state)
   }

  render() {
 	
    return (
    	<Fragment>
	    	<div className="content-wrapper">
	    		<TopMenu></TopMenu>
				<div>
					<Pagination
					activePage={this.state.activePage}
					itemsCountPerPage={10}
					totalItemsCount={450}
					pageRangeDisplayed={5}
					//onChange={::this.handlePageChange}
					/>
				</div>	    		
	    	</div>
	    	<footer></footer>
	    </Fragment>	
	);
  }
 */
constructor() {
    super();
    this.state = {
      todos: ['a','b','c','d','e','f','g','h','i','j','k'],
      currentPage: 1,
      todosPerPage: 3,
      words: [],
      wordsArray: []
    };
    
  }

	componentDidMount() {
	    axios.get('/vocabulary.json')
	      .then(res => {
	        const words = res.data;
	        const wordsArray = [];
	        for (var i = 0; i < words.length; i++) {
	        	wordsArray.push(words[i].name);
	        }
	        this.setState({ words: words, wordsArray: wordsArray });

	      })
	  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

   consoleState = ()=>{
   	console.log(this.state)
   }

  render() {
    const { todos, currentPage, todosPerPage, wordsArray } = this.state;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = wordsArray.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(wordsArray.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>
          {renderTodos}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
        <Button onClick={this.consoleState} >Console </Button>
      </div>
    );
  } 
}

export default PaginationExample;
