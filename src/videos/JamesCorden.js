import React, { Component, Fragment } from 'react';
import { Embed, Modal, Image} from 'semantic-ui-react'
import TopMenu from '../TopMenu';
import axios from 'axios';
//import speech from 'speech-synth';
//import classnames from 'classnames';
//import {Link} from "react-router-dom";
import {Button,Card} from 'semantic-ui-react';

class JamesCorden extends Component {

	constructor(props){
		super(props);
		this.state = {
			videos: [],
      loaded: false,
      items: []
		}
	}

  componentDidMount(){
    var API_key = "AIzaSyARd-RXpYp49rL4X4PPDJnv3bBBo-y-AOo";
    var channelID = "UCJ0uqCI0Vqr2Rrt1HseGirg";
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
                  <Embed  autoplay={true} id={item.id.videoId} placeholder={item.snippet.thumbnails.high.url} source='youtube' />                
              </Card> 
              )}
          </Card.Group>
            :null
       }
       </Fragment>
	);
  }

}

export default JamesCorden;