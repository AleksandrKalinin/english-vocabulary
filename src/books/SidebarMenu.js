import React, {Component} from 'react';

class SidebarMenu extends Component {

	constructor(props){
		super(props);
		this.state = {
			sort: 'date',
			rating: 'all',
			size: 'all'
		}
	}

	changeSort = (e) =>{
		this.props.callbackSort(e.target.value);
		this.setState({ sort: e.target.value })
		console.log(e.target.value);
	}

	changeRating = (e) =>{
		this.props.callbackRating(e.target.value);
		this.setState({ rating: e.target.value })
	}

	changeSize = (e) =>{
		this.props.callbackSize(e.target.value);
		this.setState({ size: e.target.value })
	}

	setCheckbox = (e) =>{
		this.props.callbackCheckbox(e.target.name, e.target.checked)
		console.log(e.target.checked);
	}
	
	render(){

	  return (
		<div className="sidebar-menu">
          <div className="form-group">
            <h4>Сортировать</h4> 
            <select ref="userInput"		            	
                required
                className="form-control"
                value={this.state.sort} onChange = {this.changeSort} >
                <option value="date">Дата добавления</option> 
                <option value="author">Автор</option> 
				<option value="year">Год</option> 
				<option value="title">Название</option>  
				<option value="length">Размер</option>
				<option value="views">Популярность</option> 
            </select>
          </div>			
          <div className="form-group">
            <h4>Размер</h4> 
            <select ref="userInput"
            	value = {this.state.size}
                required
                className="form-control"
                onChange = {this.changeSize} >
                <option value="all">все</option> 
				<option value="short">меньше 10000 слов </option> 
				<option value="medium"> от 10000 до 50000 слов </option>  
				<option value="long"> более 50000 слов </option>                 
            </select>
          </div>
          <div className="form-group">
            <h4>Рейтинг</h4> 
            <select ref="userInput"
            	value = {this.state.rating}
            	onChange = {this.changeRating}
                required
                className="form-control"
                >
                <option value="all">Все</option> 
				<option value="G">General audiences</option> 
				<option value="T">Teen</option>
				<option value="E">Explicit</option>    
				<option value="M">Mature</option>                 
            </select>
          </div>          
          <div className="checkbox-container">
          	<h4>Категории</h4>
          	<label className="checkbox-wrapper">
			  <input type="checkbox" name="fantasy" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  Fantasy
			</label>

			<label className="checkbox-wrapper">
			  <input type="checkbox" name="drama" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  Drama
			</label>

			<label className="checkbox-wrapper">
			  <input type="checkbox" name="comedy" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  Comedy
			</label>

			<label className="checkbox-wrapper">
			  <input type="checkbox" name="nonfiction" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  Nonfiction
			</label>

			<label className="checkbox-wrapper">
			  <input type="checkbox" name="detective" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  Detective
			</label> 

			<label className="checkbox-wrapper">
			  <input type="checkbox" name="history" onChange={ this.setCheckbox}/>
			  <span className="checkmark"></span>
			  History
			</label> 		

          </div>
          <div className="sidebar-button-wrapper">
          	<button className="sidebar-button">Искать</button>
          </div>
		</div> 
	  );

	}

}

export default SidebarMenu;
