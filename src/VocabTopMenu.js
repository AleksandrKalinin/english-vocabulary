import React, { Component } from 'react';
import { Button, Menu, Modal, Form } from 'semantic-ui-react'
import { Input} from 'semantic-ui-react'
import './style.css'

class VocabTopMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      words: [],
      search: '',
      inputName: '',
      inputTranslation: '',
      inputMeaning: '',
      inputDate: '',
      inputCategory: '',
      inputImage: '',
      categories: [],
      categoryValue: 'all'  
    };
    this.delete = this.delete;
    this.voiceWord = this.voiceWord;
    this.voiceWordFromModal = this.voiceWordFromModal;
    this.sortByName = this.sortByName;
    this.sortByTranslation = this.sortByTranslation;
    this.sortByDate = this.sortByDate;
    this.newFunction = this.newFunction;  
    
  }

  consoleProps = () =>{
    console.log(this.props)
  }

    updateSearch = (event) => {
      this.setState({search: event.target.value.substr(0,20)}, ()=> this.searchFunction() );
    } 

//загрузка слова
    changeNameValue = (event) =>{
      this.setState({
        inputName: event.target.value
      })
    }

    changeTranslationValue = (event) =>{
      this.setState({
        inputTranslation: event.target.value
      })
    }

    changeMeaningValue = (event) =>{
      this.setState({
        inputMeaning: event.target.value
      })
    }    

    changeCategoryValue = (event) =>{
      this.setState({
        inputCategory: event.target.value
      })
    } 

    changeImageValue = (event) =>{
      this.setState({
        inputImage: event.target.value
      })
    }

    submitForm = (e) =>{
    var newWords = this.props.words.slice();
    const inputName = this.state.inputName;
    const inputTranslation = this.state.inputTranslation;
    const inputMeaning = this.state.inputMeaning;
    const inputCategory = this.state.inputCategory;
    const inputStringDate = new Date().toUTCString();
    console.log(inputStringDate);
    const inputDate = new Date(inputStringDate);
    const inputImage = this.state.inputImage;
    const inputId = 30;
    const obj ={'id': inputId,
          'name': inputName, 
          'translation': inputTranslation, 
          'meaning': inputMeaning,
          'image': inputImage, 
          'date': inputDate,
          'category': inputCategory
          } 

    newWords.unshift(obj); 
  
      this.setState({ words: newWords}, () => console.log(this.state.words) );
      this.setState({
      inputName: '',
      inputTranslation: '',
      inputMeaning: '',
      inputDate: '',
      inputCategory: '',
      inputImage: ''
      }, () => this.newFunc() )
    }    

    newFunc = () =>{
      var words = this.state.words;
      this.props.callbackFromApp(words);
    }

    searchFunction = () =>{
      var search = this.state.search;
      this.props.searchFromApp(search);
    }    

  render() {

   return (
      <Menu text className="vocab-top-menu-wrapper vocab-top-menu-wrapper-color">
        <Menu.Item>
          <Modal className="modal-form" trigger={<Button primary>Добавить</Button>} closeIcon>
            <Form className="input-form">
              <Form.Field>
                <label>Введите слово</label>
                <input value={this.state.inputName} onChange={this.changeNameValue} type="text" />
              </Form.Field>
              <Form.Field>
                <label>Введите перевод</label>
                <input value={this.state.inputTranslation} onChange={this.changeTranslationValue} type="text" />
              </Form.Field>
              <Form.Field>
                <label>Введите категорию</label>
                <input value={this.state.inputCategory} onChange={this.changeCategoryValue} type="text" />
              </Form.Field>
              <Form.Field>
                <label>Выберите изображение</label>
                <input value={this.state.inputImage} onChange={this.changeImageValue} type="file" accept="image/png, image/jpeg" />
              </Form.Field>                   
              <Button primary onClick={this.submitForm}>Добавить</Button>
            </Form>         
          </Modal>
        </Menu.Item>
        <Menu.Item name='removeWords'> 
          <Button primary >
            Удалить
          </Button>
        </Menu.Item>        
        <Menu.Item name='byName'> 
          <Button primary onClick = {this.props.sortByName}>
            по имени
          </Button>
        </Menu.Item>
        <Menu.Item name='byTranslation'> 
          <Button primary onClick = {this.props.sortByTranslation}>
            по переводу
          </Button>
        </Menu.Item>
        <Menu.Item name='byMeaning'> 
          <Button primary onClick = {this.props.sortByDate}>
            по дате
          </Button>
        </Menu.Item>
        <Menu.Item>
         <Input icon='search' placeholder='Search...' onChange={this.updateSearch}/>
        </Menu.Item> 
   
      </Menu>
  );
  }
}

export default VocabTopMenu;