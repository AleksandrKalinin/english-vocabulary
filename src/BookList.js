import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input, Dropdown, TextArea, Form, Checkbox ,Icon, Rating, List } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';
import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class BookList extends Component {

  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      books: [],
      options: [],
      currentGenre: '',
      value: null,
      rating: null,
      size: null,      
      areBooksVisible: true,
      isMenuVisible: true,
      isPreviewVisible: false,
      isSingleBookVisible: false,
      isBookNavPanelVisible: false,
      title: '',
      author: '',
      content: '',
      description: null,
      image: null,
      currentBook: '',
      currentPage: '',
      currentPageIndex: 0,
      currentArrayBooks: [],
      currentIndexArray: [],
      bookHTML: '',
      parsedBook: null,
      bookPages: [],
      bookValue: null,
      bookVal: '',
      currentComment: '',
      currentName: '',
      currentEmail: '',
      likes: 0,
      errors: {},
      checkedItems: new Map(),
      checked: false,
      audiobooks: [],
      currentAudio: null,
      newAudio: null,
      playState: false,
      currentAudioId: 0,
      scrollForwardState: true,
      scrollBackwardState: false,
      currentVolume: 50,
      currentRange: 0,
      currentDuration: null,
      minutes: 0,
      hours: 0,
      seconds: 0
    }
  }

  componentDidMount() {
      axios.get('/books.json')
        .then(res => {
          let books = res.data;
          this.setState({ 
            books
          }, () => this.createMenu() );
        })
    }

    createMenu = () =>{

      let options = [], age = [], genres = {}, sizes = {}, ageRestriction = [];

      for (var i = 0; i < this.state.books.length; i++) {
        let item = this.state.books[i].genre;
        for (var j = 0; j < item.length; j++) {
          if (!genres.hasOwnProperty(item[j])) {
            genres[item[j]] = [];
            genres[item[j]].push(this.state.books[i].id);
          } else {
            genres[item[j]].push(this.state.books[i].id);
          }
        }
      }

      for (const item in genres) {
        options.push({
          key: item,
          text: item,
          value: genres[item]
        })
      }

      for (var i = 0; i < this.state.books.length; i++) {
        if (ageRestriction.indexOf(this.state.books[i].age_restriction) === -1) {
          ageRestriction.push(this.state.books[i].age_restriction);
        }
      }

      for (var i = 0; i < ageRestriction.length; i++) {
        age.push({
          key: ageRestriction[i],
          text: ageRestriction[i],
          value: ageRestriction[i]
        })
      }

      for (var i = 0; i < this.state.books.length; i++) {
        let item = this.state.books[i].length;
        if (item <= 10000) {
          sizes["Менее 10000"].push(this.state.books[i].id);
        } else if(item > 10000 && item < 50000) {
          sizes["От 10000 до 50000"].push(this.state.books[i].id);
        } else {
          sizes["Более 50000"].push(this.state.books[i].id);
        }
      }

      console.log(sizes);

      this.setState({
        options, age
      })
    } 
/*
    getUnique = () => {
      var arr = this.state.options;
      console.log(arr);
      var comp = 'text';
      const options = arr
          .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => arr[e]).map(e => arr[e]);
      console.log(options);    
      this.setState({
        options
      })    
    }  
*/
    selectValue = () =>{
      var bookVal = this.state.bookValue;
      this.setState({
        bookVal
      })  
    }


    handleGenreChange = (e, { value }) => {
      this.setState({ currentGenre: value })
    }        

    handleRatingChange = (e, { value }) => {
      this.setState({ rating: value })
    }  

    handleLengthChange = (e, { value }) => {
      this.setState({ currentLength: value })
    } 

    scrollToTop = () =>{
      window.scrollTo(0, this.myRef.offsetTop)
    } 


	  addComment = () =>{
	    let comments = this.state.comments.slice();
	    let errors = this.state.errors;
	    let currentComment = this.state.currentComment;
	    let currentName = this.state.currentName;
	    let currentEmail = this.state.currentEmail;
	    let temp = {};
	    if( (currentName !== '') && (currentComment !== '') && (currentEmail !== '')){
		    temp['author'] = currentName;
		    temp['comment'] = currentComment;
		    comments.unshift(temp);
		    this.setState({
		      comments,
		      currentName: '',
		      currentComment: '',
		      currentEmail: ''
		    })
	    }
	    else if (currentName == ''){
	    	errors['name'] = "Заполните поле имени!";
	    	this.setState({
	    		errors
	    	})
	    }
	    else if(currentComment == ''){
	    	errors['comment'] = "Комментария должен быть не короче 30 символов";
	    	this.setState({
	    		errors
	    	})	    	
	    }
	    else if(currentEmail == ''){
	    	errors['email'] = "Заполните поле почты";
	    	this.setState({
	    		errors
	    	})	    	
	    }

	  }

    updateComment = (event) =>{
      this.setState({currentComment: event.target.value.substr(0,500)});
    }


    updateName = (event) =>{
      this.setState({currentName: event.target.value.substr(0,500)});
    }

    updateEmail = (event) =>{
      this.setState({currentEmail: event.target.value.substr(0,500)});
    }      

    checkChange = (e) =>{
      this.setState({
      	checked: !this.state.checked
      })
    } 

  render() {
    return (
      <Fragment>
      <div className="content-wrapper">
        <TopMenu></TopMenu>
        <div className="texts-wrapper">
        {this.state.isMenuVisible ?
          <Menu className="texts-menu" vertical>
            <Menu.Item name='inbox' >
              <Dropdown 
                placeholder='Выберите жанр'
                fluid
                value={this.state.currentGenre} 
                key={this.state.options.id}
                clearable
                search
                selection
                onChange = {this.handleGenreChange}
                options={this.state.options} 
              />
            </Menu.Item>
            <Menu.Item name='inbox' >
              <Dropdown 
                placeholder='Выберите размер'
                fluid
                value={this.state.currentLength} 
                //key={this.state.length.id}
                clearable
                search
                selection
                onChange = {this.handleLengthChange}
                options={this.state.length} 
              />
            </Menu.Item>
            <Menu.Item name='inbox' >
              <Dropdown 
                placeholder='Выберите рейтинг'
                fluid
                value={this.state.rating} 
                //key={this.state.age.key}
                clearable
                search
                selection
                onChange = {this.handleRatingChange}
                options={this.state.age} 
              />
            </Menu.Item>                        
          </Menu>:null
        }
            {(this.state.books.length && this.state.areBooksVisible) ? 
            <Card.Group className="texts-cards" itemsPerRow={3} >
            {this.state.books.map((item, index) => (this.state.currentGenre === 'all'|| this.state.currentGenre === '' || this.state.currentGenre.indexOf(item.id) !== -1 ||  this.state.rating === '' || this.state.rating === item.age_restriction) &&
              <Card key={index} className="single-book">
                <Card.Content>
                  <div className="texts-image-wrapper books-image-wrapper">
                    <Image src={item.image} />
                  </div>
                  <Card.Header className="books-header"><span className="books-author">{item.author}</span></Card.Header>
                  <Card.Header className="books-header"><span className="books-title">{item.title}</span> {/*<span className="books-genre">{item.genre.map((genre, ind) => <span>{`#${genre}`}</span>)}</span>*/}</Card.Header>
                  <div className="books-information">
                    <div className="books-views">
                      <span><Icon name='eye' size='large' /> </span>
                      <span>{item.views}</span>
                    </div>
                    <div className="books-favourites">
                      <span><Icon name='heart' size='' /></span> 
                      <span>{item.likes}</span>
                    </div>
                    <Rating icon='star' defaultRating={item.rating} className = "books-rating" maxRating={5} disabled/>
                  </div>
                  <Card.Description>
                    {item.content.substr(0,250) + ' ...'}
                  </Card.Description>
                </Card.Content>
                <Button primary><Link className="training-link books-link"  to={{ pathname: `/books/${item.id}`,  query: { item } }}>Читать</Link></Button>
              </Card>
             )}
            </Card.Group> : null
           }
           {this.state.isSingleBookVisible ?
           	<Fragment>
              <Menu className="texts-menu audio-menu" vertical>
                <Menu.Item name='inbox' >
                  <List className="audiobooks-list">
                  {this.state.audiobooks.map((item,index) =>
                    <List.Item key={index}>
                      <div className="audiobooks-image-wrapper">
                        <Image src={this.state.image} />
                      </div>
                      <div className="audiobooks-content-wrapper">
                         <div className="audio-name-wrapper">
                           <h4>Chapter {index + 1} </h4>
                           <p>{this.state.title}</p>
                         </div>
                         <div className="audio-range-control">
                            <input id="range-control" type="range" value={this.state.currentRange} min="0" max={this.state.currentDuration} step="1" onInput={this.setRange} onChange={this.setRange}></input>                           
                         </div>
                         <div className="audiobooks-controls-wrapper">
                            <span className="audiobooks-icon" onClick={this.startPlayer}>
                              {this.state.playState ?
                                <Icon name='pause circle outline' size='' /> : <Icon name='play circle outline' size='' />  
                              } 
                           </span>
                            <span className="audiobooks-icon" onClick={this.scrollBackward}>
                                <Icon name='backward' size='' /> 
                           </span>                            
                            <span className="audiobooks-icon" onClick={this.scrollForward}>
                                <Icon name='forward' size='' />
                           </span>
                           <div className="audiobooks-icon audiobooks-input">
                             <Icon name='volume up' size='' />
                             <input id="vol-control" type="range" value={this.state.currentVolume} min="0" max="100" step="1" onInput={this.setVolume} onChange={this.setVolume}></input>
                             <span className="audiobooks-time">{this.state.hours}.{this.state.minutes}.{this.state.seconds}</span>
                           </div>
                         </div>
                       </div>
                    </List.Item>
                  )}
                  </List>
                </Menu.Item>
              </Menu>            
      				<Card className="single-text-card">
      					<Card.Content>
      					<div className="book-index">
                  <span className="nav-icon-close" onClick={this.backToBooks} >
                    <Icon name='window close outline' size="big"/>
                  </span>
      						<ul className="pagination-container">
      						  <li className="pagination-nav-button" onClick={this.prevButton}><Icon name='arrow left' size='small'  className="nav-icon-right"/> Previous page</li>
      						  <li className="pagination-nav-button" onClick={this.nextButton}>Next page <Icon name='arrow right' size='small' className="nav-icon-left" /> </li>
      						  <li className="pagination-nav-button" onClick={this.chapterIndex}>Pages index 
                      {this.state.isBookNavPanelVisible ?
                      <Icon name='arrow up' size='small' className="nav-icon-left" /> : <Icon name='arrow down' size='small' className="nav-icon-left" />  } 
                    </li>
      						  <li className="pagination-nav-button" onClick={this.downloadBook}>Download  <Icon name='download' size='small' className="nav-icon-left" /></li>
      						</ul>           		
      					</div>
      					  <Card.Header className="single-book-title">{this.state.title}</Card.Header>
      					  <Card.Description className="single-text-card-description">
      					    <div className="p-wrap">
      					      {this.state.currentPage}
      					    </div>
      					  </Card.Description>
      					</Card.Content>
      					<ul className="pagination-container">
      						{this.renderFirstButton()}
      					  <li className="pagination-nav-button" onClick={this.scrollToTop}>Top <Icon name='arrow up' size='small' className="nav-icon-left" /></li>
      					  <li className="pagination-nav-button" onClick={this.prevButton}><Icon name='arrow left' size='small'  className="nav-icon-right"/> Previous page </li>
      					  <li className="pagination-nav-button" onClick={this.nextButton}>Next page <Icon name='arrow right' size='small' className="nav-icon-left" /></li>
      					    {this.renderLastButton()}                	
      					</ul>
      				</Card>
      			</Fragment> : null
            }          
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


export default connect(mapStateToProps, mapDispatchToProps)(BookList);