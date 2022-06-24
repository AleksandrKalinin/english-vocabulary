import React, { Component, Fragment } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import TopMenu from './TopMenu'

class VocabSingleWord extends Component {
  render() {
    return (
      <Card>
        <Image src='/data/alacrity.jpg' />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card> 
	);
  }
}

export default VocabSingleWord;