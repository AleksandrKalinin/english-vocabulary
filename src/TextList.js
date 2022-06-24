import React, { Component, Fragment } from 'react';
import {Table,  Image, Button } from 'semantic-ui-react'
import TopMenu from './TopMenu'
import {Link} from "react-router-dom";

class GrammarList extends Component {
  render() {
    return (
      <Fragment>
        <TopMenu></TopMenu>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
              <Card.Header>Steve Sanders</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>                
      </Fragment>

	);
  }
}

export default GrammarList;