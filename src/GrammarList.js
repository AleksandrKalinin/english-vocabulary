import React, { Component, Fragment } from 'react';
import {Table} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";
import axios from 'axios';

class GrammarList extends Component {

  constructor(props){
    super(props);
    this.state = {
      grammar: []
    }
  }

  componentDidMount(){
    axios.get('/grammar2.json')
      .then(res => {
        const grammar = res.data;
        console.log(grammar);
        this.setState({ grammar });
      })
  } 

  render() {

    return (     
      <Fragment>
        <div className="content-wrapper">
          <TopMenu></TopMenu>
          <div className="texts-wrapper">
          {(this.state.grammar.length) ?
          <Table celled fixed className="grammar-list">
            <Table.Header>
              <Table.Row columns={1} >
                <Table.HeaderCell>Грамматические правила</Table.HeaderCell>
              </Table.Row>
            </Table.Header>        
            {this.state.grammar[0].rules.map((item,index) =>
              <Table.Body key={index}>
                <Table.Row columns={3}>
                  <Table.Cell className="grammar-title">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell className="grammar-description">
                    {item.description}
                  </Table.Cell>
                  <Table.Cell className="grammar-button">
                    <div className="link-wrapper">
                      <Link to={{ pathname: `/grammar/${item.id}`,  query: { item } }}>Начать</Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
          </Table>: null }        
          </div>
        </div>
        <footer></footer>        
      </Fragment>
    );
  }
}

export default GrammarList;