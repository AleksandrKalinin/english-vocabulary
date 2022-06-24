import React, { Component, Fragment } from 'react';
import { Card, Image, Button} from 'semantic-ui-react'
import TopMenu from './TopMenu'

class CoursesList extends Component {
  render() {
    return (
      <Fragment>
        <TopMenu></TopMenu>
        <Card.Group itemsPerRow={4}>
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
              <Button primary>Primary</Button>
            </Card.Content>
          </Card> 
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
              <Button primary>Primary</Button>
            </Card.Content>
          </Card> 
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
              <Button primary>Primary</Button>
            </Card.Content>
          </Card> 
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
              <Button primary>Primary</Button>
            </Card.Content>
          </Card>                           
        </Card.Group>        
      </Fragment>
	);
  }
}

export default CoursesList;