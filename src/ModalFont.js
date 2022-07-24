import React, { Component, Fragment } from 'react';
import {Button} from 'semantic-ui-react';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class ModalFont extends Component {

  constructor(props){
    super(props);
    this.state = {
      fontSizeTemp: 16,
      lineHeightTemp: 32,
      fontFamilyTemp: "'Times New Roman', sans-serif",
      fontWeightTemp: 400,      
    }
  }

  componentDidMount(){

  } 

 changeValue = (e) =>{
    this.setState({fontSizeTemp: e.target.value})
  }

  changeFontFamily = (e) =>{
    this.setState({fontFamilyTemp: e.target.value})
  }

  changeFontWeight = (e) =>{
    this.setState({fontWeightTemp: e.target.value})
  }

  changeLineHeight = (e) =>{
    this.setState({lineHeightTemp: e.target.value})
  } 

  applyFontSettings = () => {
    this.props.actions.selectFontSize(this.state.fontSizeTemp);
    this.props.actions.selectFontFamily(this.state.fontFamilyTemp);
    this.props.actions.selectFontWeight(this.state.fontWeightTemp);
    this.props.actions.selectFontSpacing(this.state.lineHeightTemp);
  }

  closeModal = () => {
    this.props.actions.toggleFontModal(false);
  }

  render() {

    return (     
      <div className="settings-overlay">
        <div className="select-palette-wrapper select-font-wrapper">
          <span className="close-button" onClick={this.closeModal}>
            <i className="fas fa-times"></i>
          </span>
          <div className="select-font">
            <div className="select-font-block">
              <span>Размер</span>
              <div className="select-font-input">
                <input onChange={this.changeValue} type="range" min="8" max="24" value={this.state.fontSizeTemp} name=""/>               
                <span className="select-font-value">{this.state.fontSizeTemp}</span>
              </div>
            </div>
            <div className="select-font-block">
              <span>Интервал</span>         
              <div className="select-font-input">
                <input onChange={this.changeLineHeight} type="range" min="16" max="72" value={this.state.lineHeightTemp} name=""/>                
                <span className="select-font-value">{this.state.lineHeightTemp}</span>
              </div>
            </div>
            <div className="select-font-block">
              <span>Жирность</span>
              <div className="select-font-input">
                <input onChange={this.changeFontWeight} type="range" min="200" max="900" step="100" value={this.state.fontWeightTemp} name=""/>               
                <span className="select-font-value">{this.state.fontWeightTemp}</span>
              </div>  
            </div>
          </div>
          <select className="select-font-family" onChange={this.changeFontFamily} value={this.state.fontFamily}>
            <option value ="'Times New Roman', sans-serif">Times New Roman</option>
            <option value ="'Arial', sans-serif">Arial</option>
            <option value ="'Verdana', sans-serif">Verdana</option>
            <option value ="'Lucida Console', sans-serif">Lucida Console</option>
            <option value ="'Georgia', serif">Georgia</option>
            <option value ="'Courier New', monospace">Gourier New</option>
          </select>
          <p className="select-font-example" style={{ 
                                fontSize: this.state.fontSizeTemp + "px", 
                                fontFamily: this.state.fontFamilyTemp,
                                lineHeight: this.state.lineHeightTemp + "px",
                                fontWeight: this.state.fontWeightTemp }} >Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>                  
          <button className="normal-button" onClick={this.applyFontSettings} >Применить</button>
        </div>    
      </div>
    );
  }
}


function mapStateToProps(state){
  return { store: state.booksReducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalFont);