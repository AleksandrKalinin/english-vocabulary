import React, { Component } from 'react';
import {Card, Image, Icon} from 'semantic-ui-react'

class Item extends Component {
  render() {
    return (
	  <Card>
		<Image src={this.props.image} />
		    <Card.Content>
		      <Card.Header>{this.props.name}</Card.Header>
		      <Card.Header>{this.props.translation}</Card.Header>
		      <Card.Description>{this.props.meaning}</Card.Description>
		    </Card.Content>
		    <Card.Content extra>
		      <a>
		        <Icon name='user' />
		       {this.props.price}
		      </a>
		    </Card.Content>	  
	  </Card>
	   );
  }
}

export default Item;