import React, { Component, Fragment } from 'react';
import { Card, Image} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";


class Materials extends Component {

	   

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu/>
          <Card.Group className="training-wrapper">
            <Card>
              <div className="training-wrapper-image">
              <Image src='training/video.png' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/videos">Видео</Link></Card.Header>
              </Card.Content>
            </Card> 
            <Card>
              <div className="training-wrapper-image">
              <Image src='training/proverbs.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/proverbs">Пословицы и поговорки</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='training/words.png' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/decks">Наборы слов</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='training/texts.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/texts">Обучающие тексты</Link></Card.Header>
              </Card.Content>
            </Card>             
            <Card>
              <div className="training-wrapper-image">
              <Image src='training/books.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/books">Книги</Link></Card.Header>
              </Card.Content>
            </Card>
                                                                                                                                                             
          </Card.Group>
          </div> 
        <footer></footer>
      </Fragment>
	);
  }
}

export default Materials;