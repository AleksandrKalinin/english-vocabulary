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
      allBoooks: [],
      options: [],
      currentGenre: '',
      currentLength: '',
      value: null,
      rating: '',
      size: '',      
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
            books, allBooks: res.data
          }, () => this.createMenu() );
        })
    }

    createMenu = () =>{

      let options = [], age = [], genres = {}, sizes = [], ageTemp = [], sizesTemp = {};

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
        if (ageTemp.indexOf(this.state.books[i].age_restriction) === -1) {
          ageTemp.push(this.state.books[i].age_restriction);
        }
      }

      for (var i = 0; i < ageTemp.length; i++) {
        age.push({
          key: ageTemp[i],
          text: ageTemp[i],
          value: ageTemp[i]
        })
      }

      sizesTemp["Менее 10000"] = [];
      sizesTemp["От 10000 до 50000"] = [];
      sizesTemp["Более 50000"] = [];

      for (var i = 0; i < this.state.books.length; i++) {
        let item = this.state.books[i].length;
        if (item <= 10000) {
          sizesTemp["Менее 10000"].push(this.state.books[i].id);
        } else if(item > 10000 && item < 50000) {
          sizesTemp["От 10000 до 50000"].push(this.state.books[i].id);
        } else {
          sizesTemp["Более 50000"].push(this.state.books[i].id);
        }
      }

      for (const item in sizesTemp) {
        sizes.push({
          key: item,
          text: item,
          value: sizesTemp[item]
        })
      }

      console.log(sizes);

      this.setState({
        options, age, sizes
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
                options={this.state.sizes} 
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
            {this.state.books.map((item, index) => ( 
              (this.state.currentGenre === 'all'|| this.state.currentGenre === '' || this.state.currentGenre.indexOf(item.id) !== -1) && 
              (this.state.rating === 'all'|| this.state.rating === '' || this.state.rating === item.age_restriction) &&
              (this.state.currentLength === 'all' || this.state.currentLength === '' || this.state.currentLength.indexOf(item.id) !== -1)) &&
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
        </div>
      </div>
    <footer></footer>
    </Fragment>
	 );
  }
}

function mapStateToProps(state){
  return {store: state.booksReducer};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(BookList);