import React, {Component} from 'react';
import Rating from 'react-rating';

class SingleBookMini extends Component {

	constructor(props){
		super(props);
		this.state={
			book: ''
		}
	}

	componentDidMount(){
		
	}

	
	render(){

	  return (
		<div className="col-md-3 col-lg-3 col-xl-3 col-sm-6 col-xs-12">
			<div className="book-mini">
				<div className="book-mini__image">
					<img src={this.props.img} alt="Not found" />
				</div>
				<div className="book-mini__description">
		        	<Rating className="book-mini__rating"
				          stop={5} 
				          readonly 
				          initialRating={this.props.rating}
				          emptySymbol="far fa-star fa-1x"
				          fullSymbol="fas fa-star fa-1x" />										
					<h6>{this.props.title}</h6>
					<span className="subtitle">{this.props.author}</span>
				</div>
			</div>					  						
		</div>
	  );

	}

}

export default SingleBookMini;
