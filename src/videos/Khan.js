import React, { Component, Fragment } from 'react';
import { Embed, Modal, Image, Input, Icon} from 'semantic-ui-react'
import TopMenu from '../TopMenu';
import axios from 'axios';
import {Button,Card} from 'semantic-ui-react';

class Khan extends Component {

	constructor(props){
		super(props);
		this.state = {
			videos: [],
      loaded: false,
      items: [],
      currentComment: '',
      likes: 0,
      dislikes: 0,
      comments: [
        {
          author: 'new2341',
          comment: 'Just a typicall comment'
        },
        {
          author: 'cauthor',
          comment: 'nice! liked it'
        }
      ]
		}
	}

  componentDidMount(){
    var API_key = "AIzaSyANIs2WwcSlrkJhfkw2z-q0Zumsu80CR28";
    var channelID = "UC4a-Gbdw7vOaccHmFo40b9g";
    var maxResults = 48;
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

    updateSearch = (event) =>{
      this.setState({currentComment: event.target.value.substr(0,200)});
    } 
  
  consoleState = () =>{
    console.log(this.state.videos);
    this.setState({
      loaded: true,
    })
  }

  addComment = () =>{
    let comments = this.state.comments.slice();
    let currentComment = this.state.currentComment;
    let temp = {};
    temp['author'] = 'blabla';
    temp['comment'] = currentComment;
    comments.unshift(temp);
    console.log(comments);
    this.setState({
      comments: comments,
      currentComment: ''
    })
  }

  thumbsUp = () => {
    let count = this.state.likes;
    count++;
    this.setState({
      likes: count
    })
  }

  thumbsDown = () => {
    let count = this.state.dislikes;
    count++;
    this.setState({
      dislikes: count
    })
  }

  consoleState = ()=>{
    console.log(this.state)
  }

   render() {
    return (
      <Fragment>
        <TopMenu/>
        {(this.state.items.length)?
          <Card.Group itemsPerRow = {3} className="single-video-wrapper">
            {this.state.items.map((item, index) => 
              <Card key={index}>
                <Modal className="video-modal" closeIcon trigger={<Button>Открыть</Button>}>
                  <Embed  autoplay={true} id={item.id.videoId} placeholder={item.snippet.thumbnails.high.url} source='youtube' />                
                  <Modal.Header className="video-header-wrapper">
                    <div className="video-header">{item.snippet.title}</div> 
                    <div className="video-likes">
                      <div className="video-likes-item first">
                        <span className="video-likes-icon" onClick={this.thumbsUp}>
                          <Icon name='thumbs up' size='large' />
                        </span>
                        <span>{this.state.likes}</span>
                      </div>
                      <div className="video-likes-item second">
                        <span className="video-likes-icon" onClick={this.thumbsDown}>
                          <Icon name='thumbs down' size='large' />
                        </span>
                        <span>{this.state.dislikes}</span>
                      </div>
                    </div> 
                  </Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>{item.snippet.description}</p>
                    </Modal.Description>
                    <div className="comment-section">
                      <div className="comment-section-input">
                        <Input placeholder='type...' value={this.state.currentComment} onChange={this.updateSearch} /><Button onClick={this.addComment}>Отправить</Button>
                      </div>
                      <div className="comment-section-comments">
                          {this.state.comments.map((item, index) =>
                            <div className="single-comment" key={index}>
                              <h4>{item.author}</h4>
                              <p>{item.comment}</p>                              
                            </div>
                           )}
                      </div>
                    </div>
                  </Modal.Content>
                </Modal>              
                <div className="single-video-wrapper-image">
                  <h4>{item.snippet.title}</h4>                 
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

export default Khan;