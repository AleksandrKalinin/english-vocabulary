import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import {  Dropdown} from 'semantic-ui-react'
import './style.css'
import axios from 'axios'

class VocabSideMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
       items: [],
       options: [],
       value: null
    }
  }

  	UNSAFE_componentWillMount() {   
	    axios.get('./working.json')
	      .then(res => {
	        const items = res.data;
	        this.setState({ items }, () => this.consoleParams() );
	      }) 
	  }

	  consoleParams = () =>{
	  	let newItems = [];
	  	this.state.items.map((item, i) =>
                    newItems.push({ 
                        key: item.id, 
                        text: item.category, 
                        value: item.category 
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
      var options = this.state.options.slice();
      var value = this.state.value;
      var newObj = {};
      newObj['value'] = value;
      newObj['options'] = options;
      this.props.callbackFromParent(newObj);
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.newFunc() )

    consoleProps = () =>{
      console.log(this.props);
      console.log(this.state);
    }

  render() {
    return (
      <Menu vertical className="side-menu">
        <Menu.Item name='inbox' active >
          <Dropdown placeholder='Выберите категорию'
                    fluid
                    clearable
                    value={this.state.value} 
                    search
                    key={this.state.options.id}
                    selection
                    onChange = {this.handleChange}
                    options={this.state.options} />
        </Menu.Item>
      </Menu>
  );
  }
}

export default VocabSideMenu;