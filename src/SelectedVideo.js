import React, { Component, Fragment } from 'react';
import { Embed, Modal, Image, Icon, Input} from 'semantic-ui-react'
import TopMenu from './TopMenu';
import axios from 'axios';
import {Button,Card} from 'semantic-ui-react';

class SelectedVideo extends Component {

	constructor(props){
		super(props);
    this.state = {
      videos: [],
      loaded: false,
      items: [],
      currentComment: '',
      likes: 0,
      dislikes: 0,
      maxResults: 120,
      visible: 20,
      comments: [
        {
          author: 'new2341',
          comment: 'Just a typical comment'
        },
        {
          author: 'cauthor',
          comment: 'nice! liked it'
        }
      ]
    }
	}

  componentDidMount(){
    let selectedVideo;
    axios.get('/videos.json')
      .then(res => {
        let channels = res.data;
        selectedVideo = channels.find(x => x.id == this.props.match.params.id);
        this.setState({ selectedVideo }, () => this.getItems())
    })
  }
  
  getItems = () => {
    let API_key = "AIzaSyARd-RXpYp49rL4X4PPDJnv3bBBo-y-AOo";
    let url =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&channelId=" +
      this.state.selectedVideo.channelID +
      "&part=snippet,id&order=date&maxResults=" +
      this.state.maxResults; 
      axios.get(url)
        .then(res => {
          const videos = res.data;
          this.setState({
            videos,
            items: videos.items
        })
      })                 
    }

  updateSearch = (event) =>{
    this.setState({currentComment: event.target.value.substr(0,200)});
  }   

  addComment = () =>{
    let comments = this.state.comments.slice();
    let currentComment = this.state.currentComment;
    let temp = {};
    temp['author'] = 'blabla';
    temp['comment'] = currentComment;
    comments.unshift(temp);
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

  loadMore = () => {
    this.setState((prev) => {
      return {visible: prev.visible + 20};
    });
  }      

   render() {
    return (
      <Fragment>
        <TopMenu/>
        {(this.state.items.length)  ?
          <>
            <Card.Group itemsPerRow = {4} className="single-video-wrapper">
              {this.state.items.slice(0, this.state.visible).map((item, index) => 
                <Card key={index} className="video-item">
                  <Modal className="video-modal" closeIcon trigger={<div className="video-modal__overlay"></div>}>
                    <Embed autoplay={true} id={item.id.videoId} placeholder={item.snippet.thumbnails.high.url} source='youtube' />                
                    <Modal.Header className="video-header-wrapper">
                      <div className="video-header">{item.snippet.title}</div> 
                      <div className="video-likes">
                        <div className="video-likes-item first">
                          <span className="video-likes-icon" onClick={this.thumbsUp}>
                            <Icon name='thumbs up outline' size='large' />
                          </span>
                          <span>{this.state.likes}</span>
                        </div>
                        <div className="video-likes-item second">
                          <span className="video-likes-icon" onClick={this.thumbsDown}>
                            <Icon name='thumbs down outline' size='large' />
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
            <div className="videos-load">
              <Button primary onClick = {this.loadMore}>Load more</Button>
            </div>
          </>
          : null
        }
       </Fragment>
    );
  }

}

export default SelectedVideo;