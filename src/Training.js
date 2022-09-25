import React, { Component, Fragment } from 'react';
import { Card, Image} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";

class Training extends Component {

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu/>
          <Card.Group className="training-wrapper training-cards">
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/englishtorussian.jpg' />              
              </div>
              <Card.Content>
                <Card.Header><Link to="/englishtorussian">С английского на русский </Link></Card.Header>

              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/russiantoenglish.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/russiantoenglish">С русского на английский</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/memory.png' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/cards">Словарные карточки</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/audio.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/audio">Аудиотренировка</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/construct.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/constructword">Конструктор слов</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/fillthegaps.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/fillthegaps">Заполни пробелы</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/recreatetext.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/recreatetext">Воспроизведи текст</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/recreateaudiotext.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/recreateaudiotext">Воспроизведи аудиоисторию</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/insertspaces.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/insertspaces">Расставьте пробелы</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/truefalse.png' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/trueorfalse">Верно-неверно</Link></Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="training-wrapper-image">
              <Image src='./training/proverbs.jpg' />              
              </div>          
              <Card.Content>
                <Card.Header><Link to="/proverbs">Пословицы и поговорки</Link></Card.Header>
              </Card.Content>
            </Card>                                                                                                               
          </Card.Group>
          </div> 
        <footer></footer>
      </Fragment>
	);
  }
}

export default Training;