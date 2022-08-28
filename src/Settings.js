import React, { Component, Fragment } from 'react';
import { Dropdown} from 'semantic-ui-react'
import TopMenu from './TopMenu'



class Settings extends Component {

	constructor(props){
		super(props);
		this.state = {
      email: "user1233",
      password: 69691231,
      colorValue: "#3281F0",
      colorOptions: [{ key: 1, value: "#3281F0", text: "#3281F0"}, { key: 2, value: "red", text: "red"}]
		}
	}

  componentDidMount() {
      
  }   

  changeColor = (e, { value }) => {
    console.log(e);
    this.setState({ colorValue: value })
  }


  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="settings-wrapper">
            <div className="settings-container">
              <div className="settings-block">
                <span className="settings-block__name">Цветовая схема</span>
                  <Dropdown 
                    placeholder='Выберите уровень'
                    fluid
                    value={this.state.colorValue} 
                    key
                    clearable
                    search
                    selection
                    onChange = {this.changeColor}
                    options={this.state.colorOptions} 
                  />                
              </div>
              <div className="settings-block">
                <span className="settings-block__name">Громкость звука</span>
                  <Dropdown 
                    placeholder='Выберите уровень'
                    fluid
                    value={this.state.colorValue} 
                    key
                    clearable
                    search
                    selection
                    onChange = {this.changeColor}
                    options={this.state.colorOptions} 
                  />                
              </div>              
            </div>
          </div>
        </div>
        <footer></footer>
      </Fragment>
	);
  }
}

export default Settings;