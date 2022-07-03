import React, {Component, Fragment} from 'react';
import SidebarMenu from './SidebarMenu';
import SingleBook from './SingleBook';
import ActiveBook from './ActiveBook';
import axios from 'axios'; 

class Books extends Component {
	
	constructor(props){
		super(props);
		this.state={
			books: [],
			filteredBooks: [],
			activeBookVisible: false,
			settingsVisible: false,
			activeId: null,
			activeLink: '',
			isTitleAscending: true,
			isRatingAscending: true,
			isYearAscending: true,
			isAuthorAscending: true,
			isDateAscending: true,
			filters: []
		}
	}

	componentDidMount(){
	    axios.get('/books.json')
	      .then(res => {
	        this.setState({ books: res.data, 
	        				allBooks: res.data, 
	        				filteredBooks: res.data });
	      }) 		
	}

	consoleParams = () =>{
		console.log(this.state);
	}

  sortByYear = () =>{
  	let books = this.state.books.slice(); 
  		if (this.state.isYearAscending) {
  			this.setState(prevState => { books.sort((a,b) => (a.year - b.year)) })
  		}
  		else{
  			this.setState(prevState => { books.sort((a,b) => (b.year - a.year)) })
  		}

  		this.setState({
  			books,
  			isYearAscending: !this.state.isYearAscending
  		})
  }

  sortByRating = () =>{
  	let books = this.state.books.slice(); 
  		if (this.state.isRatingAscending) {
  			this.setState(prevState => { books.sort((a,b) => (a.rating - b.rating)) })
  		}
  		else{
  			this.setState(prevState => { books.sort((a,b) => (b.rating - a.rating)) })
  		}

  		this.setState({
  			books,
  			isRatingAscending: !this.state.isRatingAscending
  		})
  }  

  sortByPopularity = () =>{
  	let books = this.state.books.slice(); 
  		if (this.state.isPopularityAscending) {
  			this.setState(prevState => { books.sort((a,b) => (a.views - b.views)) })
  		}
  		else{
  			this.setState(prevState => { books.sort((a,b) => (b.views - a.views)) })
  		}

  		this.setState({
  			books,
  			isPopularityAscending: !this.state.isPopularityAscending
  		})
  } 

  sortByAuthor = () =>{
  	console.log("fired");
  	let books = this.state.books.slice(); 
  		if (this.state.isAuthorAscending) {
  			this.setState(prevState => { books.sort((a,b) => a.author.localeCompare(b.author)) })
  		}
  		else{
  			this.setState(prevState => { books.sort((a,b) => b.author.localeCompare(a.author)) })
  		}

  		this.setState({
  			books,
  			isAuthorAscending: !this.state.isAuthorAscending
  		})
  }  

	sortByTitle= () =>{
		let books = this.state.books.slice();
		if(this.state.isTitleAscending){
			this.setState(prevState => {books.sort((a,b) => a.title.localeCompare(b.title)) });
		} else {
			this.setState(prevState => {books.sort((a,b) => b.title.localeCompare(a.title)) });
		}
		this.setState({
			isTitleAscending: !this.state.isTitleAscending,
			books,
		})		
	}

	sortByDate = () => {
	    const books = this.state.books.slice();
	    if(this.state.isDateAscending){
	    	this.setState(prevState => { books.sort((a,b) => new Date(a.date) - new Date(b.date) ) })
	    }
	    else{
	        this.setState(prevState => { books.sort((a,b) => new Date(b.date) - new Date(a.date) ) })      
	    }
	    this.setState({
	      isDateAscending: !this.state.isDateAscending,
	      books
	    })
	} 		

	filterSize = (value) =>{
		let books = this.state.books.slice();
		books = books.filter(e => e.length > 50000);
		this.setState({ books })
	}

	callbackSortMenu = (value) =>{
		if (value === 'year') {
			this.sortByYear();
		}
		else if(value === 'rating'){
			this.sortByRating();
		}
		else if(value === 'title'){
			this.sortByTitle();
		}
		else if(value === 'date'){
			this.sortByDate()
		}		
		else if(value === 'views'){
			this.sortByPopularity();
		}
		else if(value === 'author'){
			this.sortByAuthor();
		}
	}

	callbackRatingMenu = (value) =>{
		let books = this.state.allBooks.slice();
		if (value === 'G') {
			books = books.filter(e => e.age_restriction === 'General audiences');
		}
		else if(value ==='T'){
			books = books.filter(e => e.age_restriction === 'Teen');
		}
		else if(value ==='E'){
			books = books.filter(e => e.age_restriction === 'Explicit');
		}
		else if(value ==='M'){
			books = books.filter(e => e.age_restriction === 'Mature');
		}		
		this.setState({books})		
	}

	callbackSizeMenu = (value) =>{
		let books = this.state.allBooks.slice();
		if (value === 'short') {
			books = books.filter(e => e.length < 10000);
		}
		else if (value === 'medium') {
			books = books.filter(e => e.length >= 10000 && e.length <= 50000);
		}
		else if(value === 'long') {
			books = books.filter(e => e.length > 50000);
		}
		else{

		}
		this.setState( {books })
	}

	callbackCheckboxMenu = (value, state) =>{
		let filters = this.state.filters;
		let books = this.state.allBooks.slice();
		if (state) {
			filters.push(value);
		}
		else {
			filters = filters.filter(e => e !== value)
		}
		for (var i = 0; i < filters.length; i++) {
			books = books.filter(e => e.genre.includes(filters[i]) === true )
		}
		this.setState({filters, books})
	}	

	callbackOpenBook = (id, link, title, author) =>{
		this.setState({
			activeBookVisible: !this.state.activeBookVisible,
			activeId: id,
			activeLink: link,
			activeTitle: title,
			activeAuthor: author
		})
	}

	callbackCloseBook = () =>{
		this.setState({ activeBookVisible: !this.state.activeBookVisible })
	}	

	render(){
	  return (
	  	<Fragment>
		  	{this.state.activeBookVisible ? 
		  		<ActiveBook id = {this.state.activeId} 
		  					link = {this.state.activeLink}
		  					title = {this.state.activeTitle}
		  					author = {this.state.activeAuthor}
		  					closeBook = {this.callbackCloseBook} />
		  	 : null}
		  	 {this.state.activeBookVisible ? null : 
				<div className="container container-wrap">
					<div className="row">
						<div className="col-lg-3 col-sm-12 col-xl-3 col-xs-12">
							<SidebarMenu  callbackSort = {this.callbackSortMenu}
							callbackRating = {this.callbackRatingMenu}
							callbackSize = {this.callbackSizeMenu}
							callbackCheckbox = {this.callbackCheckboxMenu} />
						</div>
						<div className="col-lg-9 col-sm-12 col-xl-9 col-xs-12">
						{this.state.books.length ? 
							<div className="container books-container">
								<div className="row">
									{this.state.books.map((book,index) => 
										<div key={index} className="single-book-wrapper col-md-6 col-lg-6 col-xl-4 col-sm-12">
											<SingleBook pages={book.page_number} 
														id={book.id}
														link={book.link} 
														author={book.author} 
														title={book.title} 
														image={book.image}
														summary={book.content}
														genre={book.genre}
														views={book.views}
														rating={book.rating}
														openBook= {this.callbackOpenBook}
														/>
										</div>
									)}										
								</div>
							</div>
						: <div className="books-preloader">Wait a second</div> }

						</div>			
					</div>
				</div>
		  	}
		</Fragment>
	  );

	}

}

export default Books;
