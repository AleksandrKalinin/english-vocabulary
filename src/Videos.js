import React, { Component, Fragment } from 'react';
import TopMenu from './TopMenu';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Button,Card,Image} from 'semantic-ui-react';

class Videos extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      videos: [],
      id: 0,
      name: '',
      description: '',
      channelId: null,
      image: '',
      link: '',
      visible: 8
    }
  }

  componentDidMount() {
    var id = this.state.id;
      axios.get('./videos.json')
        .then(res => {
          const videos = res.data;
          const name = videos[id].name;
          const description = videos[id].description;
          const channelId = videos[id].channelId;
          const image = videos[id].image;
          const link = videos[id].link;
           this.setState({ 
            videos, 
            name, 
            description, 
            channelId, 
            image,
            link });
        })
    }

    cons = () =>{
      console.log (this.state);
    }

    loadMore = () => {
      this.setState((prev) => {
        return {visible: prev.visible + 8};
      });
    }    

   render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <TopMenu/>
          <Button onClick={this.cons} >console</Button>
          <Card.Group itemsPerRow={4} className="videos-container">
            {this.state.videos.slice(0,this.state.visible).map((video,index) =>
              <Card key={index}>
                <Image src={video.image} />
                <Card.Content className="video-wrapper">
                  <Card.Header>{video.name}</Card.Header>
                  <Card.Description>{video.description}</Card.Description>
                </Card.Content>
                <Card.Content extra className="video-extra">
                  <Link to={{ pathname: `/videos/${video.id}`,  query: { video } }}>{video.name}</Link>
                </Card.Content>
              </Card> 
            )}                                                                           
          </Card.Group>
          {this.state.visible < this.state.videos.length &&
            <div className="videos-load">
              <Button primary onClick={this.loadMore}>Load more</Button>
            </div> 
          }         
        </div>
        <footer></footer>
      </Fragment>
    );
  } 


}

export default Videos;