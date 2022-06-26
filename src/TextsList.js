import React, { Component, Fragment } from 'react';
import {Image, Button,Card, Menu, Input,Dropdown } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';

class TextsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      texts: [],
      textsLoaded: false,
      options: [],
      categoryValue: '',
      value: null,
      areTextsVisible: true,
      isSingleTextVisible: false,
      title: '',
      content: '',
      image: null,
      contentArray: []
    }
  }

  componentDidMount() {
      axios.get('/texts.json')
        .then(res => {
          let texts = res.data;
          let contentArray = [];
          texts.map((item, index) => contentArray.push(item.content))
          this.setState({ 
            texts: texts,
            contentArray: contentArray
          }, () => {
            this.setState({
              textsLoaded: true
            })
            this.createMenuItems()
          });
        })
    }

    createMenuItems = () =>{
      let newItems = [];
      this.state.texts.map((item, i) =>
                    newItems.push({ 
                        key: item.id, 
                        text: item.difficulty, 
                        value: item.difficulty 
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

    selectCategory = () =>{
      var options = this.state.options.slice();
      var categoryValue = this.state.value;
      this.setState({
        categoryValue: categoryValue
      })
    }

    handleChange = (e, { value }) => this.setState({ value }, () => this.selectCategory() )         

    readMore = (e) =>{
      let texts = this.state.texts.slice();
      let target = e.target.parentElement;
      var index = 0;
        while ( (target = target.previousElementSibling) ) {
          index++;
      }
      let activeTargetTitle = e.target.parentElement.children[0].children[1].textContent;
      let activeTargetContent = texts[index].content;
      let activeTargetImage = e.target.parentElement.children[0].children[0].children[0].src;
      this.setState({
        areTextsVisible: false,
        isSingleTextVisible: true,
        title: activeTargetTitle,
        content: activeTargetContent,
        image: activeTargetImage
      })
    }

    backToTexts = () =>{
      this.setState({
        areTextsVisible: true,
        isSingleTextVisible: false        
      })
    }

    consoleState = () =>{
      console.log(this.state)
    }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper">
          {!this.state.isSingleTextVisible ?
            <Menu className="texts-menu" vertical>
              <Menu.Item name='inbox' >
                <Dropdown 
                  placeholder='Выберите уровень'
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
            </Menu> : null
          }
              {(this.state.textsLoaded && this.state.areTextsVisible) ? 
              <Card.Group className="texts-cards" itemsPerRow={3} >
              {this.state.texts.map((item, index) => (this.state.categoryValue === 'all'|| this.state.categoryValue === '' || this.state.categoryValue === item.difficulty) &&
                <Card key={index}>
                  <Card.Content>
                    <div className="texts-image-wrapper">
                      <Image src={item.image} />
                    </div>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Description>
                      {item.content.substr(0,250) + ' ...'}
                    </Card.Description>
                  </Card.Content>
                  <Button onClick={this.readMore} >Читать далее</Button>
                </Card>
               )}
              </Card.Group> : null
             }
             {this.state.isSingleTextVisible ? 
                <Card className="single-text-card text-item">
                  <Card.Content>
                    <Image src={this.state.image} />
                    <Card.Header>{this.state.title}</Card.Header>
                    <Card.Description className="single-text-card-description p-wrap">
                      { /*this.state.content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase() */ this.state.content}
                    </Card.Description> 
                  </Card.Content>
                  <Button onClick={this.backToTexts} >Вернуться</Button>
                </Card>:null
              }          
          </div>
        </div>
        <footer></footer>
      </Fragment>

	);
  }
}

export default TextsList;