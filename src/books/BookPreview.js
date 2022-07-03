import React, {Component, Fragment} from 'react';
import Header from './Header'

class BookPreview extends Component {
	
	render(){

	  return (
	  	<Fragment>
	  		<Header />
			<div class="book-preview-container">
				<div class="book-preview-overlay">
					<div class="container">
						<div class="row">
							<div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
								<div class="book-preview-wrapper">
									<div class="book-preview-image">
										<img src="books/Baskervilles.jpg" />
									</div>							
								</div>
							</div>
							<div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
								<div class="book-preview-description-wrapper">
									<div class="book-preview-description">
										<h4>The hound of baskervilles</h4>
										<div class="book-preview-text">
								 		<p>By: Arthur Conan-Doyle</p>
								 		<p>Pages: 123</p>
								 		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								 		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								 		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								 		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								 		cillum dolore eu fugiat nulla pariatur. </p>
										</div>
										<div class="book-preview-buttons">
											<a href="" class="danger-button" >Назад</a>
											<a href="" class="normal-button" >Читать</a>
										</div>
									</div>							
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<Header />	  		
	  	</Fragment>
	  );

	}

}

export default BookPreview;
