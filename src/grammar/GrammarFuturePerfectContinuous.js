import React, { Component, Fragment } from 'react';
import { Card, Button, List} from 'semantic-ui-react'
import TopMenu from '../TopMenu'
import axios from 'axios';
import speech from 'speech-synth';
import {Link} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class GrammarFuturePerfectContinuous extends Component {

	constructor(props){
		super(props);
		this.state = {
			fullData: [],
      examples: [],
      main_points: [],
      id: 0,
      stepId: 0,
      currentTitle: '',
      currentDescription: '',
      currentExamples: [],
      isCardVisible: true,
      showContinueButton: false,
      isFinalVisible: false,
      isButtonVisible: true,
      isBackButtonVisible: false,
      array: []

		}
	}


  componentDidMount() {
    var stepId = this.state.stepId;
      axios.get('/grammar2.json')
        .then(res => {
          let main_points = res.data[0].rules[11].main_points;
          const fullData = res.data[0].rules[11].steps;
          let currentTitle = fullData[stepId].title;
          let currentDescription = fullData[stepId].description;
          let currentExamples = fullData[stepId].examples;
          this.setState({ 
            fullData,
            currentTitle,
            currentDescription,
            currentExamples,
            main_points
          });
        })
    }

    startTraining = () =>{
      this.setState({
        isButtonVisible: false,
        isCardVisible: true
      })
    }

   goBack = () =>{
      let fullData = this.state.fullData.slice();
      let length = fullData.length;
      let newId = this.state.stepId;
      newId  = newId - 1;
      if( (newId < length) && (newId > 0) ){
          let currentTitle = fullData[newId].title;
          let currentDescription = fullData[newId].description;
          let currentExamples = fullData[newId].examples;
          this.setState({
            stepId: newId,
            currentTitle,
            currentDescription,
            currentExamples            
          })       
      }

      else if(newId == 0){
          let currentTitle = fullData[newId].title;
          let currentDescription = fullData[newId].description;
          let currentExamples = fullData[newId].examples;        
          this.setState({
            isBackButtonVisible: false,
            stepId: newId,
            currentTitle,
            currentDescription,
            currentExamples            
          })         
      }


      else if(newId < 0 ) {
        this.setState({
          isBackButtonVisible: false         
        })
      }

    }

    continueTraining = () =>{
      let fullData = this.state.fullData.slice();
      let length = fullData.length;
      let newId = this.state.stepId;
      newId  = newId + 1;
      if(newId < length){
          let currentTitle = fullData[newId].title;
          let currentDescription = fullData[newId].description;
          let currentExamples = fullData[newId].examples;
          this.setState({
            isBackButtonVisible: true,
            stepId: newId,
            currentTitle,
            currentDescription,
            currentExamples            
          })       
      }

      else{
        this.setState({
          isFinalVisible: true,
          isCardVisible: false          
        })
      }

    }

   voiceWord = () =>{
      var newfullData = this.state.currentName;
      speech.say(newfullData);
   }  


   consoleFunction = () =>{
    console.log(this.state);
   }

  render() {
    return (
      <Fragment>
        <TopMenu/>
         {this.state.isCardVisible ?
            <Card.Group itemsPerRow={1} className="grammar-item">
              <Card className="grammar-item-card" >
                <Card.Content>
                  <Card.Header>{this.state.currentTitle}</Card.Header>
                  <Card.Description className="grammar-item-main-description">{this.state.currentDescription}</Card.Description>
                </Card.Content>
                <Card.Content>
                    {this.state.currentExamples.map((item, index) =>
                      <Card.Description className="grammar-item-description" key ={index} >
                        <h3>{item.exampleName}</h3>
                        <p>{item.exampleTranslation} </p>
                      </Card.Description>
                    )}
                 </Card.Content>
                 <Card.Content className="grammar-button-container">
                 {this.state.isBackButtonVisible ?
                 <Button primary onClick={this.goBack}>??????????</Button> :null }
                   <Button primary onClick={this.continueTraining}>????????????</Button>
                 </Card.Content>   
              </Card>
            </Card.Group>:
             null
          }
          {this.state.isFinalVisible ?
         <Card.Group itemsPerRow={1} className="card-header-wrapper card-final-wrapper grammar-final-wrapper" >
             <Card className="card-training" >
                <Card.Content>
                  <Card.Header>??????????</Card.Header>
                  <List className="grammar-final-list ">
                    {this.state.main_points.map((item, index) =>
                       <List.Item key={index}>{item}</List.Item> 
                    )}
                  </List>
                  <div className="link-wrapper">
                    <Link to="/grammar">?????????????????? ?? ????????????</Link>                    
                  </div>
                </Card.Content>
              </Card>          
        </Card.Group>          
             : null
          }
          <Button onClick={this.consoleFunction}>console</Button>
      </Fragment>
	);
  }
}

export default GrammarFuturePerfectContinuous;