import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class ModalColor extends Component {

  constructor(props){
    super(props);
    this.state = {
      isColorModalOpen: false,
      activeFontColor: '#222222',
      activeBgColor: '#f6f6f6',
      fontState: [false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
      bgState: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
      colorScheme: [  
              '#000000','#111111','#222222','#333333',
              '#444444','#555555','#666666','#777777',
              '#888888','#999999','#a7a7a7','#b8b8b8',
              '#d0d0d0','#dcdcdc','#f6f6f6','#ffffff'   ]      
    }
  }

  componentDidMount(){

  } 

  setFontColor = (e) =>{
    let fontState = this.state.fontState.slice();
    let index = e.currentTarget.getAttribute("data-index");
    for (var i = 0; i < fontState.length; i++) {
      fontState[i] = false;
    }
    fontState[index] = true;
    this.setState({
      activeFontColor: e.currentTarget.getAttribute("colorvalue"),
      fontState
    })

  }

  setBgColor = (e) =>{
    let bgState = this.state.bgState.slice();
    let index = e.currentTarget.getAttribute("data-index");
    for (var i = 0; i < bgState.length; i++) {
      bgState[i] = false
    }
    bgState[index] = true;
    this.setState({
      activeBgColor: e.currentTarget.getAttribute("colorvalue"),
      bgState
    })
  }

  applyColorSettings = () =>{
    this.props.actions.selectBgColor(this.state.activeBgColor);
    this.props.actions.selectFontColor(this.state.activeFontColor);
  }

  closeModal = () => {
    this.props.actions.toggleColorModal(false);
  }

  render() {

    return (     
      <div className="settings-overlay">
        <div className="select-palette-wrapper">
          <span className="close-button" onClick={this.closeModal} >
            <i className="fas fa-times"></i>
          </span>
          <div className="select-palette-container">
            <div className="palette-container-item">
              <p>Шрифт</p>
              <div className="select-palette">
                {this.state.colorScheme.map((item,index) =>
                  <div key={index} className="palette-item" data-index={index} onClick={this.setFontColor} style={{ backgroundColor: item }} colorvalue={item}>
                    {this.state.fontState[index] ? 
                      <span><i className="fas fa-check"></i></span>  : null
                    }
                  </div>
                )}
              </div>
            </div>
            <div className="palette-container-item">
              <p>Фон</p>
              <div className="select-palette">
                {this.state.colorScheme.map((item,index) =>
                  <div key={index} className="palette-item" data-index={index} onClick={this.setBgColor} style={{ backgroundColor: item }} colorvalue={item}>
                    {this.state.bgState[index] ?
                      <span><i className="fas fa-check"></i></span> 
                       : null
                    }
                  </div>
                )}          
              </div>
            </div>
          </div>
          <div className="palette-item-selected" style={{ backgroundColor: this.state.activeBgColor }} >
            <span style={{ color: this.state.activeFontColor  }} >Lorem ipsum </span>
          </div> 
          <Button primary onClick={this.applyColorSettings}>Применить</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(ModalColor);