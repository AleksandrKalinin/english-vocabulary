import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input, Dropdown, TextArea, Form, Checkbox ,Icon, Rating, List } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import parse from 'html-react-parser';
import HTMLReactParser from 'html-react-parser';


class BookList extends Component {

  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      books: [],
      options: [],
      categoryValue: '',
      value: null,
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
      contentArray: [],
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
      comments: [{
        "author": "Author 1",
        "comment": "simple comment"
      }],
      audiobooks: [],
      currentAudio: null,
      newAudio: null,
      playState: false,
      currentAudioId: 0,
      thumbArray: [],
      scrollForwardState: true,
      scrollBackwardState: false,
      currentVolume: 50,
      currentRange: 0,
      currentDuration: null,
      minutes: 0,
      hours: 0,
      seconds: 0,
      rating: 0,
      maxRating: 5

    }
  }

  handleCheckChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  componentDidMount() {
      axios.get('/books.json')
        .then(res => {
          let books = res.data;
          let contentArray = [];
          let thumbArray = [];
          books.map((item, index) =>{ 
            contentArray.push(item.content); 
            thumbArray.push(item.image); 
          })
          let currentAudio = new Audio(`audio/Baskervilles${this.state.currentAudioId}.mp3`);
          let newAudio = new Audio('audio/Baskervilles1.mp3');
          newAudio.volume = 0.5;
          newAudio.controls = true;
          this.setState({ 
            books,
            contentArray,
            currentAudio,
            newAudio,
            thumbArray
          }, () => this.consoleParams() );
        })
    }

    callFunctions = () =>{
    	this.consoleParams();
    	this.populateDropdown();
    }

    consoleParams = () =>{
      let newItems = [];
      this.state.books.map((item, i) =>
                    newItems.push({ 
                        key: item.id, 
                        text: item.genre, 
                        value: item.genre 
                     }))
      this.setState({
        options: newItems
      }, () => this.getUnique())
    } 

    getUnique = () => {
      var arr = this.state.options;
      var comp = 'text';
      const unique = arr
          .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => arr[e]).map(e => arr[e]);
      this.setState({
        options: unique
      })    
    }  

    newFunc = () =>{
      var categoryValue = this.state.value;
      this.setState({
        categoryValue
      })
    }

    newPage = () =>{
      var bookVal = this.state.bookValue;
      this.setState({
        bookVal
      })
  
    }


    handleChange = (e, { value }) => this.setState({ value }, () => this.newFunc())         

    handlePageChange= (e, { value }) => this.setState({ value }, () => this.newPage())

  	getElementIndex = (node) => {
  	    var index = 0;
  	    while ( (node = node.previousElementSibling) ) {
  	        index++;
  	    }
  	}

    readMore = (e) =>{
      var currentElement = e.target.parentElement.children[0].children[1];
      let books = this.state.books.slice();
      let target = e.target.parentElement;
      setInterval(this.checkInterval, 1000);
      var index = 0;
        while ( (target = target.previousElementSibling) ) {
          index++;
      }
      let audiobooks = books[index].audio;
      let image = books[index].image;
      var link = books[index].link;
      axios.all([axios.get('/books/'+ link)])
                   .then(axios.spread((firstResponse) => {           
                    let currentBook = firstResponse.data;
                    var parsedBook = HTMLReactParser(currentBook);
                    this.setState({ 
                      currentBook,
                      parsedBook,
                      audiobooks
                    }, () => this.splitBook(this.state.currentBook));
              }))
      let activeTargetTitle = e.target.parentElement.children[0].children[2].children[0].textContent;
      let activeTargetDescription = e.target.parentElement.children[0].children[4].textContent;
      let activeTargetAuthor = e.target.parentElement.children[0].children[1].children[0].textContent;
      let activeTargetContent = this.state.currentBook;
      let activeTargetImage = e.target.parentElement.children[0].children[0].children[0].src;
      this.setState({
        areBooksVisible: false,
        isMenuVisible: false,
        isPreviewVisible: true,
        title: activeTargetTitle,
        content: activeTargetContent,
        author: activeTargetAuthor,
        description: activeTargetDescription,
        image
      }, () => this.populateDropdown())
    }

    parseHtml = () =>{
      const html = `
        <h1 style="font-family: Arial;">
          html-react-parser
        </h1>
      `;
      return HTMLReactParser(html);      
    }

    splitBook = (book) =>{
    	let currentArrayBooks = [];
    	let indexArray = [];
    	let length = book.length;
    	let pages = Math.ceil(length/4500);
    	let currentMin = 0;
    	let currentMax = 4500;
    	for (var i = 0; i < pages; i++) {
    		currentArrayBooks.push(book.substr(currentMin,currentMax));
    		currentMin = currentMin + 4500;
    	}
    	for (var i = 0; i < pages; i++) {
    		indexArray.push(i);
    	}
    	this.setState({
    		currentArrayBooks,
    		currentPage: currentArrayBooks[0],
    		currentIndexArray: indexArray
    	})
    }

    renderPagination = (book) =>{
    	let currentArrayBooks = [];
    	let indexArray = [];
    	let length = book.length;
    	let currentMin = 0;
    	let currentMax = 4500;    	
    	for (var i = 0; i < 8; i++) {
    		currentArrayBooks.push(book.substr(currentMin,currentMax));
    		currentMin = currentMin + 4500;
    	}
    	for (var i = 0; i < 8; i++) {
    		indexArray.push(i);
    	}
    	this.setState({
    		currentArrayBooks,
    		currentPage: currentArrayBooks[0],
    		currentIndexArray: indexArray
    	})    	
    }

    backToBooks = () =>{
      this.setState({
        areBooksVisible: true,
        isMenuVisible: true,
        isSingleBookVisible: false,
        isBookNavPanelVisible: false,
        bookPages: [],
        content: '',
		    currentArrayBooks: [],
		    currentIndexArray: []                
      })
    }

    handleClick = (e) =>{
    	let pages = this.state.currentArrayBooks.slice();
    	this.setState({
    		currentPageIndex: e.target.id,
    		currentPage: pages[e.target.id]
    	})
    }

    consoleState = () =>{
      console.log(this.state);

    }



    renderFirstButton = () =>{
    	return(
    		<li className="pagination-nav-button" id="0" onClick={this.handleClick}>First</li>
    	)
    }

    renderLastButton = () =>{
    	return(
    		<li className="pagination-nav-button" id={this.state.currentArrayBooks.length-1} onClick={this.handleClick}>Last</li>
    	)
    }

    prevButton = () =>{
      let currentId = this.state.currentPageIndex;
      let pages = this.state.currentArrayBooks;
      if(currentId>0){
      	currentId--;
      }
      let currentPage = pages[currentId];
      this.setState({
          currentPageIndex: currentId,
          currentPage
      }, this.scrollToTop())
    }

   goToPage = () =>{
      let currentId = this.state.value;
      let pages = this.state.currentArrayBooks;
      let currentPage = pages[currentId];
      this.setState({
          currentPageIndex: currentId,
          currentPage: currentPage
      }, this.scrollToTop())
    }    

    nextButton = () =>{
      let currentId = this.state.currentPageIndex;
      let pages = this.state.currentArrayBooks.slice();
      console.log(pages.length);
      if(currentId < pages.length-1){
      	currentId++;
      }
      let currentPage = pages[currentId];
      this.setState({
          currentPageIndex: currentId,
          currentPage
      },this.scrollToTop())
    }   

    scrollToTop = () =>{
      window.scrollTo(0, this.myRef.offsetTop)
    } 

    chapterIndex = () =>{
    	if(this.state.bookPages.length == 0){
    		this.populateDropdown();
    	}
    	let currentState = this.state.isBookNavPanelVisible;
    	this.setState({
    		isBookNavPanelVisible: !currentState
    	})
    }

    populateDropdown = () =>{
    	let pages = this.state.currentArrayBooks.slice();
    	let bookPages = this.state.bookPages.slice();
    	for (var i = 0; i < pages.length; i++) {
    		let page = '';
    		let bookObject = {};
    		page = 'Page ' + (i+1);
    		bookObject["key"] = i;
    		bookObject["text"] = page;
    		bookObject["value"] = i;
    		bookPages.push(bookObject);
    	}
    	this.setState({
    		bookPages
    	})
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
	    		errors: errors
	    	})
	    }
	    else if(currentComment == ''){
	    	errors['comment'] = "Комментария должен быть не короче 30 символов";
	    	this.setState({
	    		errors: errors
	    	})	    	
	    }
	    else if(currentEmail == ''){
	    	errors['email'] = "Заполните поле почты";
	    	this.setState({
	    		errors: errors
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
      let checked = this.state.checked;
      this.setState({
      	checked: !checked
      })
    } 

    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })


    startPlayer = () =>{
      let currentState = this.state.playState;
      this.setState({
        playState: !currentState
      }, () => this.playAudio() )
    }

    playAudio = () =>{
      let audio = this.state.newAudio;
      let audiobooks = this.state.audiobooks;
      let duration = audio.duration;
      let minutes = Math.floor(Math.floor(duration) / 60);
      let hours = Math.floor(Math.floor(minutes) / 60 );
      let seconds = Math.floor(duration - minutes * 60);
      minutes = Math.floor(minutes - hours * 60);
      if(this.state.playState){
        audio.play();
      }
      else{
        audio.pause();
      }
      this.setState({
        currentAudio: audio,
        currentDuration: duration,
        minutes,
        seconds,
        hours
      })
    }


    scrollForward = () =>{
      let audio = this.state.currentAudio; 
      audio.pause();
      audio.currentTime += 10;
      if(this.state.playState){
        audio.play(); 
      }
      this.setState({
        newAudio: audio
      })          
    }

    scrollBackward = () =>{
      let audio = this.state.currentAudio; 
      audio.pause();
      if (audio.currentTime >= 10) {
         audio.currentTime -= 10;
      }
      else{
        audio.currentTime = 0;
      }
      if(this.state.playState){
        audio.play(); 
      }
      this.setState({
        newAudio: audio
      })  
    }

    

    checkInterval = () =>{
      let player = this.state.newAudio;
      this.setState({
        currentRange: player.currentTime
      })
    }

    setVolume = (e) =>{
      let volValue = this.state.currentValue;
      var player = this.state.newAudio;
      player.volume = e.target.value / 100;
      this.setState({
        newAudio: player,
        currentVolume: e.target.value
      })
    }

    setRange = (e) =>{      
      let rangeValue = this.state.currentRange;
      var newAudio = this.state.newAudio;
      newAudio.currentTime = e.target.value;
      this.setState({
        newAudio,
        currentRange: e.target.value
      })

    }

    consoleState = () =>{
      console.log(this.state);
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
                value={this.state.value} 
                key={this.state.options.id}
                clearable
                search
                selection
                onChange = {this.handleChange}
                options={this.state.options} 
              />
            </Menu.Item>
          </Menu>:null
        }
            {(this.state.books.length && this.state.areBooksVisible) ? 
            <Card.Group className="texts-cards" itemsPerRow={3} >
            {this.state.books.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.genre) &&
              <Card key={index} className="single-book">
                <Card.Content>
                  <div className="texts-image-wrapper books-image-wrapper">
                    <Image src={item.image} />
                  </div>
                  <Card.Header className="books-header"><span className="books-author">{item.author}</span></Card.Header>
                  <Card.Header className="books-header"><span className="books-title">{item.title}</span> <span className="books-genre">{item.genre}</span></Card.Header>
                  <div className="books-information">
                    <div className="books-views">
                      <span><Icon name='eye' size='' /> </span>
                      <span>1234</span>
                    </div>
                    <div className="books-favourites">
                      <span><Icon name='heart' size='' /></span> 
                      <span>39</span>
                    </div>
                    <Rating className = "books-rating" maxRating={5} onRate={this.handleRate} />
                  </div>
                  <Card.Description>
                    {item.content.substr(0,250) + ' ...'}
                  </Card.Description>
                </Card.Content>
                <Button onClick={this.readMore} >Читать</Button>
              </Card>
             )}
            </Card.Group> : null
           }
           {this.state.isPreviewVisible ?
              <div className="book-preview-wrapper">
                <div className="book-preview-image">
                  <Image src={this.state.image} />
                </div>
                <div className="book-preview-description">
                    <h3>{this.state.title}</h3>
                    <h6>By: {this.state.author}</h6>
                    <h6>Pages: {this.state.currentArrayBooks.length} </h6>
                    <h6 className="book-preview-text">{this.state.description} </h6>
                    <div className="book-preview-rating">
                       <Rating icon="star" className = "books-rating" maxRating={5} onRate={this.handleRate} />
                       <span >{this.state.rating}/{this.state.maxRating}</span>
                    </div>
                    <Button primary onClick={this.consoleState}>
                      Начать
                    </Button>
                </div>
              </div>
           :null}
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
                           <h4>Chapter {index+1} </h4>
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
      					{this.state.isBookNavPanelVisible ?
      						<div className="book-index-panel">
      							<Dropdown 
      								placeholder='Выберите страницу'
      								fluid
			                value={this.state.value} 
			                key={this.state.options.id}
			                clearable
			                search
			                selection
			                onChange = {this.handlePageChange}
			                options={this.state.bookPages} 
      							 />
      							<Button onClick={this.goToPage}>Go</Button>
      						</div> : null
      					}
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
      					<div className="single-text-card-form">
      						<Form>
      							<Form.Field>
      								<Input value={this.state.currentName} onChange={this.updateName} focus placeholder='Имя'/>
      								<span>{this.state.errors['name']}</span>
      							</Form.Field>
      							<Form.Field>
      								<Input value={this.state.currentEmail} onChange={this.updateEmail} focus placeholder='Email'/>
      								<span>{this.state.errors['email']}</span>
      							</Form.Field>
      							<Form.Field>
      								<TextArea value={this.state.currentComment} onChange={this.updateComment} maxLength="50" placeholder='Ваш комментарий' />
      								<span>{this.state.errors['comment']}</span>
      							</Form.Field>														
      							<Button onClick={this.addComment} type='submit'>Отправить</Button>
      						</Form>					
      					</div>
      					<div className="single-text-card-comments">
                  {this.state.comments.map((item, index) =>
                    <div className="single-text-card-comment" key={index}>
                      <h3>{item.author}</h3>
                      <p>{item.comment}</p>                              
                    </div>
                   )}												
      					</div>
      				</Card>
      			</Fragment>:null
            }          
        </div>
        </div>
        <footer></footer>
      </Fragment>

	);
  }
}

export default BookList;