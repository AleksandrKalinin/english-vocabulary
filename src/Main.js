import React, { Component, Fragment } from 'react';
import {Image } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
}
 
  render() {

    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper recommended-wrapper">
          	<div className="main-section section-1">
          	  <div className="section-overlay">
          	  	<div className="section-header">
          	  		<h2>Лучший способ выучить язык</h2>
          	  		<Link to="/training" className="outline-link">Начать учиться</Link>
          	  	</div>
          	  </div>              
            </div>
          	<div className="advantage-section">
          	  <div className="advantage-overlay">
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/settings.png" />
          	  			</span>
          	  			<p>Простой интерфейс</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/notebook.png" />
          	  			</span>
          	  			<p>Удобный словарь</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/user.png" />
          	  			</span>
          	  			<p>Разнообразные тренировки</p>
          	  		</div>          	  		          	  		
          	  </div>
          	  <div className="advantage-overlay">
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/notepad.png" />
          	  			</span>
          	  			<p>Большое количество обучающих материалов</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/house.png" />
          	  			</span>
          	  			<p>Грамматика и тесты</p>
          	  		</div>
          	  		<div className="advantage-icon">
          	  			<span>
          	  				<Image  src="icons/pen.png" />
          	  			</span>
          	  			<p>Полностью бесплатно</p>
          	  		</div>          	  		          	  		
          	  </div>          	                
            </div>            
            <div className="half-section">
            	<div className="half-section-image words-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Изучайте слова</h3>
	            		<ul>
	            			<li>20 тематических наборов</li>
	            			<li>Более 2000 слов</li>
	            			<li>Словарь с расширенным функционалом</li>            			            			
	            			<li>Возможность изучать добавленные слова</li>            			
	            		</ul>
	            		<Link to="/vocabulary" className="outline-link">Перейти</Link>
            		</div>
            	</div>
            </div>
            <div className="half-section">
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Тренируйтесь</h3>
	            		<ul>
	            			<li>11 видов тренировок</li>
	            			<li>Тренировка чтения, говорения и понимания на слух</li>
	            			<li>Возможность добавлять на тренировку изучаемые слова</li>
	            		</ul>
	            		<Link to="/training" className="outline-link">Перейти</Link>
            		</div>
            	</div>
            	<div className="half-section-image training-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>            	
            </div>
            <div className="half-section">
            	<div className="half-section-image grammar-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Учите грамматику</h3>
	            		<ul>
	            			<li>Изучение грамматики английского языка</li>
	            			<li>Наглядные примеры</li>
	            			<li>Тесты на любую тематику</li>
	            		</ul>
	            		<Link to="/grammar" className="outline-link">Перейти</Link>
            		</div>
            	</div>
            </div>
            <div className="half-section">
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Улучшайте навыки чтения</h3>
	            		<ul>
	            			<li>Множество текстов и аудиотекстов различной тематики</li>
	            			<li>Тексты разного уровня сложности</li>
	            		</ul>
	            		<Link to="/texts" className="outline-link">Перейти</Link>
            		</div>
            	</div>
            	<div className="half-section-image texts-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>            	
            </div>
          {/*
            <div className="half-section">
            	<div className="half-section-image books-section">
            		<div className="half-section-image-overlay">
            			
            		</div>
            	</div>
            	<div className="half-section-text">
            		<div className="half-section-text-wrapper">	
	            		<h3>Читайте книги</h3>
	            		<ul>
	            			<li>Книги на любой вкус</li>
	            			<li>Возможность слушать аудиокниги</li>
	            			<li>Книги различного уровня сложности</li>
	            		</ul>
	            		<Link to="/books" className="outline-link">Перейти</Link>
            		</div>
            	</div>
            </div> 
          */}  
          </div>
        </div>
        <footer></footer>
      </Fragment>

	);
  }
}

export default Main;