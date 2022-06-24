import React, { Component, Fragment } from 'react';
import { Embed, Modal, Image} from 'semantic-ui-react'
import TopMenu from '../TopMenu';
import axios from 'axios';
//import speech from 'speech-synth';
//import classnames from 'classnames';
//import {Link} from "react-router-dom";
import {Button,Card} from 'semantic-ui-react';

class Ellen extends Component {

	constructor(props){
		super(props);
		this.state = {
			videos: [],
      loaded: false,
      items: []
		}
	}

  componentDidMount(){
    var API_key = "AIzaSyANIs2WwcSlrkJhfkw2z-q0Zumsu80CR28";
    var channelID = "UCp0hYYBW6IMayGgR-WeoCvQ";
    var maxResults = 36;
    var url =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&channelId=" +
      channelID +
      "&part=snippet,id&order=date&maxResults=" +
      maxResults;
    axios.get(url)
        .then(res => {
          const videos = res.data;
          this.setState({
            videos: videos,
            items: videos.items
        })
      })
  }

  
  consoleState = () =>{
    console.log(this.state.videos);
    this.setState({
      loaded: true,
    })
  }

   render() {
    return (
      <Fragment>
        <TopMenu/>
        {(this.state.items.length) ?
          <Card.Group itemsPerRow = {3} className="single-video-wrapper">
            {this.state.items.map((item, index) => 
              <Card key={index}>
                <Modal className="video-modal" closeIcon trigger={<Button>Show Modal</Button>}>
                  <Embed  autoplay={true} id={item.id.videoId} placeholder={item.snippet.thumbnails.high.url} source='youtube' />                
                  <Modal.Header>{item.snippet.title} </Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>{item.snippet.description}</p>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>              
                <div className="single-video-wrapper-image">
                  <Image src={item.snippet.thumbnails.high.url} />                  
                </div>
              </Card> 
              )}
          </Card.Group>
            :null
       }
       </Fragment>
	);
  }

}

export default Ellen;