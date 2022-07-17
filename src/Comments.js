import React, { Component, Fragment } from 'react';
import {Table,  Image, Button, Menu, TextArea, Form, Checkbox, Input } from 'semantic-ui-react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {bindActionCreators} from 'redux';
import actions from './actions/index';
import {connect} from 'react-redux';

class Comments extends Component {

  constructor(props){
    super(props);
    this.state = {
      errors: {},
      loaded: false
    }
  }

  componentDidMount() {
    let allComments = this.props.store.booksComments;
    let selectedComments = allComments.find(x => x.id == this.props.id);
    for (var i = 0; i < selectedComments.comments.length; i++) {
      let date = new Date(selectedComments.comments[i].date);
      let datestring = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
        date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      //selectedComments.comments[i].date = datestring;
    }

    this.setState({
      comments: selectedComments.comments,
      loaded: true
    })
  } 

    addComment = () =>{
      let comments = this.state.comments.slice();
      let errors = this.state.errors;
      let currentComment = this.state.currentComment;
      let currentName = this.state.currentName;
      let currentEmail = this.state.currentEmail;
      let temp = {};

      if( (currentName !== '') && (currentComment !== '') && (currentEmail !== '')){
        let date = new Date();
        let datestring = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
        date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);        
        temp['commentId'] = uuidv4();
        temp['author'] = currentName;
        temp['text'] = currentComment;        
        temp['date'] = datestring;
        let id = this.props.id;
        this.props.actions.addCommentToBook(id, temp);        
        this.setState({
          currentName: '',
          currentComment: '',
          currentEmail: ''
        })
      }

      else if (currentName == ''){
        errors['name'] = "Заполните поле имени!";
        this.setState({
          errors
        })
      }

      else if(currentComment == ''){
        errors['comment'] = "Комментария должен быть не короче 30 символов";
        this.setState({
          errors
        })        
      }

      else if(currentEmail == ''){
        errors['email'] = "Заполните поле почты";
        this.setState({
          errors
        })        
      }

    }

    updateComment = (event) =>{
      this.setState({currentComment: event.target.value.substr(0,500)});
    }

    updateName = (event) =>{
      this.setState({currentName: event.target.value.substr(0,500)});
    }

    updateEmail = (event) =>{
      this.setState({currentEmail: event.target.value.substr(0,500)});
    }


  render() {
    return (     
      <>
        <div className="single-text-card-form">
          <Form>
            <Form.Field>
              <Input value={this.state.currentName || ''} onChange={this.updateName} focus placeholder='Имя'/>
              <span>{this.state.errors['name']}</span>
            </Form.Field>
            <Form.Field>
              <Input value={this.state.currentEmail || ''} onChange={this.updateEmail} focus placeholder='Email'/>
              <span>{this.state.errors['email']}</span>
            </Form.Field>
            <Form.Field>
              <TextArea value={this.state.currentComment || ''} onChange={this.updateComment} maxLength="50" placeholder='Ваш комментарий' />
              <span>{this.state.errors['comment']}</span>
            </Form.Field>                           
            <Button onClick={this.addComment} type='submit'>Отправить</Button>
          </Form>         
        </div>
        {this.state.loaded ?
          <div className="single-text-card-comments">
            {this.state.comments.map((item, index) =>
              <div className="single-text-card-comment" key={index}>
                <h3>{item.author}<span className="single-text-card-date">{item.date}</span></h3>
                <p>{item.text}</p>                              
              </div>
             )}                       
          </div>
        : null}
      </> 
    );
  }
}

function mapStateToProps(state) {
  return { store: state.reducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);