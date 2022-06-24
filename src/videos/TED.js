import React, { Component, Fragment } from 'react';
import TopMenu from '../TopMenu';
import axios from 'axios';
//import speech from 'speech-synth';
//import classnames from 'classnames';
//import {Link} from "react-router-dom";
import {Button,Card, Embed, Modal,Image, Rating} from 'semantic-ui-react';
//import LazyLoad from 'react-lazy-load';

class TED extends Component {

	constructor(props){
		super(props);
		this.state = {
			videos: [],
      loaded: false,
      items: [],
      isModalVisible: false
		}
	}

  componentDidMount(){
    var API_key = "AIzaSyANIs2WwcSlrkJhfkw2z-q0Zumsu80CR28";
    var channelID = "UCAuUUnT6oDeKwE6v1NGQxug";
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

      handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
  
  consoleState = () =>{
    console.log(this.state.videos.items);
    this.setState({
      loaded: true,
    })
  }

  showModal = () =>{
    this.setState({
      isModalVisible: true
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

export default TED;