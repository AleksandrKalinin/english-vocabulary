import React, { Component } from 'react';
import {Menu, Image, Icon, Modal, Form, Button} from 'semantic-ui-react'
import {Link} from "react-router-dom";

class TopMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      inputLogin: '',
      inputPassword: '',
      doublePassword: '',
      inputMail: ''
    }
  }

  showModal = () =>{
      let state = this.state.isModalVisible;
      this.setState({
        isModalVisible: !state
      },() => console.log(this.state.isModalVisible) )
  }

    changeLogin = (event) =>{
      this.setState({
        inputLogin: event.target.value
      })
    }

    changePassword = (event) =>{
      this.setState({
        inputPassword: event.target.value
      })
    }

    changeMail = (event) =>{
      this.setState({
        inputMail: event.target.value
      })
    }

    changeDoublePassword = (event) =>{
      this.setState({
        doublePassword: event.target.value
      })
    }    

  render() {
    return (
        <Menu className="top-menu">
          <Menu.Item className="item-link item-menu__link">
            <Link to="/">Главная</Link>
          </Menu.Item>
          <Menu.Item className="item-link item-menu__link">
            <Link to="/vocabulary">Словарь</Link>
          </Menu.Item>          
          <Menu.Item className="item-link item-menu__link">
            <Link to="/grammar">Грамматика</Link>
          </Menu.Item>
          <Menu.Item className="item-link item-menu__link">
            <Link to="/training">Тренировки</Link>
          </Menu.Item>
          <Menu.Item className="item-link item-menu__link">
            <Link to="/tests">Тесты</Link>
          </Menu.Item>
          <Menu.Item className="item-link item-menu__link">
            <Link to="/materials">Материалы</Link>
          </Menu.Item>
          <Menu.Item className="item-link item-menu__link">
            <Link to="/books">Книги</Link>
          </Menu.Item>           
            <Menu.Item className="item-link item-menu__link">
              <Link to="/statistics">Статистика</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item className="login-item">
                <Modal className="modal-form login-modal" trigger={<Button className="login-button">Войти</Button>} closeIcon>
                  <Form className="input-form login-form">
                    <Form.Field>
                      <label>Введите логин</label>
                      <input value={this.state.inputLogin} onChange={this.changeLogin} type="text" />
                    </Form.Field>
                    <Form.Field>
                      <label>Введите пароль</label>
                      <input value={this.state.inputPassword} onChange={this.changePassword} type="text" />
                    </Form.Field>
                    <Button primary onClick={this.finishLogin}>Войти</Button>
                  </Form>         
                </Modal>              
              </Menu.Item>
              <Menu.Item className="login-item">
                <Modal className="modal-form login-modal" trigger={<Button className="login-button">Регистрация</Button>} closeIcon>
                  <Form className="input-form login-form">
                    <Form.Field>
                      <label>Введите логин</label>
                      <input value={this.state.inputLogin} onChange={this.changeLogin} type="text" />
                    </Form.Field>
                    <Form.Field>
                      <label>Введите e-mail</label>
                      <input value={this.state.inputMail} onChange={this.changeMail} type="text" />
                    </Form.Field>
                    <Form.Field>
                      <label>Введите пароль</label>
                      <input value={this.state.inputPassword} onChange={this.changePassword} type="text" />
                    </Form.Field>                   
                    <Form.Field>
                      <label>Повторите пароль</label>
                      <input value={this.state.doublePassword} onChange={this.changeDoublePassword} type="text" />
                    </Form.Field>
                    <Button primary onClick={this.finishRegistration}>Зарегистрироваться</Button>
                  </Form>         
                </Modal>              
              </Menu.Item> 
              <Menu.Item className="menu-image" >
                {this.state.isModalVisible ?
                  <div className="user-modal">
                    <div className="user-modal-pic">
                      <Image src="/icons/member.png" />              
                      <div className="user-modal-name">
                        <h5> User</h5>
                        <h6>blabla@mail.com</h6>
                      </div>                
                    </div>
                    <p><Link to="/statistics"> <Icon name='chart bar outline' size='' />Статистика</Link></p>
                    <p><Link to="/settings"> <Icon name='setting' size=''  />Настройки</Link></p>
                    <p><Link to="/statistics"> <Icon name='log out' size=''  />Выйти</Link></p>
                  </div> : null
                }
                <Image className="user-avatar" onClick={this.showModal} src="/icons/member.png" />
              </Menu.Item>                
            </Menu.Menu>                                                                     
        </Menu>
 	);
  }
}


export default TopMenu;