import React, {Component} from 'react';
import Rating from 'react-rating';
import axios from 'axios';

class SingleBook extends Component {

	constructor(props){
		super(props);
		this.state={
			book: ''
		}
	}

	componentDidMount(){
		
	}

	consoleLength = (link) =>{
		console.log(link);
		axios.get('/books/'+ link)
	      .then(res => {
	        this.setState({ book: res.data }, () => console.log(this.state.book.length) );
	      })		
	}

	openBook = (id, link, title, author) =>{
		this.props.openBook(id, link, title, author);
	}
	
	render(){

	  return (
		<div className="single-book">
			<div className="single-book-image">
			{this.props.image ? <img src={this.props.image}  alt=""/> : 
				<div className="single-book-image__not-found">
					<i className="fal fa-image"></i>
					<span>Image not found</span>
				</div>
			}

			</div>
			<div className="single-book-description">
				<div className="single-book-header">
					<h5>{this.props.title}</h5>
					<h6>By: {this.props.author}</h6>					
				</div>
				<div className="rating-wrapper">
			        <Rating className="single-book-rating"
			          stop={5} 
			          readonly 
			          initialRating={this.props.rating}
			          emptySymbol="far fa-star fa-1x"
			          fullSymbol="fas fa-star fa-1x" />
			        <span className="rating-number">{this.props.rating.toFixed(1)}</span>			
				</div>
				<p>
					{this.props.summary.substr(0,200)}
				</p>
				<div className="single-book-inner-wrapper">
					<button onClick={this.props.openBook.bind(this, this.props.id, this.props.link, this.props.title, this.props.author)}>Читать</button>
				</div>
			</div>
		</div>
	  );

	}

}

export default SingleBook;
