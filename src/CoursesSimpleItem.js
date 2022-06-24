import React, { Component } from 'react';
import { Card, Image, Button, Modal} from 'semantic-ui-react'
//import TopMenu from './TopMenu'
import axios from 'axios';

class CoursesSimple extends Component {

	constructor(props){
		super(props);
		this.state = {
      data: [],
			sentence: '',
      visibleSentence: '',
			courses: [],
			correct_answer: '',
			words: [],
      isWordGroupVisible: true,
      isFinalVisible: false,
      doubleWords: [],
      currentArray: [],
      currentId: 0,
      correctAnswer: false,
      incorrectAnswer: false,
      currentExerciseId: 0,
      exercises: [],
      headerVisible: false,
      sentenceVisible: true,
      positiveAnswers: [],
      negativeAnswers: [],
      isResultVisible: false


		}
	}

  con = () =>{
    this.setState({
      headerVisible: true
    })
    console.log(this.state);
  }

  updateSentence =(e)=>{
    var targ = e.target.textContent + ' ';
  	var newSentence = this.state.sentence.concat([e.target.textContent]);
    var visibleSentence = this.state.visibleSentence.concat([targ]);
  	this.setState({
  		sentence: newSentence,
      visibleSentence: visibleSentence
  		//sentence: [this.state.sentence, ...e.target.textContent]
  	}, () => this.continueTraining() )
  	console.log(visibleSentence);
  }

    componentDidMount() {
      var exerciseId = this.state.currentExerciseId;
      axios.get('/courses.json')
        .then(res => {
          const courses = res.data;
          const correct_answer = res.data[0].exercises[exerciseId].full_sentence;
          const words = res.data[0].exercises[exerciseId].words;
          var newWords = []
          for (var i = 0; i < words.length; i++) {
            var a = words[i].variants;
            for (var j = 0; j < a.length; j++) {
              newWords.push(a[j]);
            }
          }          
          var result = []; 
          for(var i=0;i < newWords.length;i = i+4){
            result.push(newWords.slice(i,i+4));
          }
          console.log(this.props);
          this.setState({ 
            courses: courses, 
            correct_answer: correct_answer, 
            words: words, 
            doubleWords: result,
            exercises: this.props.exercises,
            headerVisible: true 
          }, () => this.renderArray() );
        })
    }

    propsToState = () =>{
      this.setState({
        exercises: this.props.exercises
      })
    }

    submitAnswer = () =>{
    	var sentence = this.state.sentence;
      var positiveAnswers = this.state.positiveAnswers;
      var negativeAnswers = this.state.negativeAnswers;
    	var correct_answer = this.state.correct_answer.replace(/\s/g, '');

    	if(sentence===correct_answer){
        positiveAnswers.push(sentence);
    		this.setState({
          correctAnswer: true,
          positiveAnswers: positiveAnswers

        })

    	}
    	else{
        negativeAnswers.push(sentence);        
    		this.setState({
          incorrectAnswer: true,
          negativeAnswers: negativeAnswers

        })
    	};

    }

    renderArray = () =>{
      var array = this.state.doubleWords.slice();
      var id  = this.state.currentExerciseId;
      var currentArray = array[id];
      this.setState({
        currentArray: currentArray
      })

    }

    continueTraining = () =>{
      var id  = this.state.currentId;
      var words = this.state.doubleWords.slice();
      id = id+1;
      var currentArray = words[id];
      if(id<words.length){
        this.setState({
          currentId: id,
          currentArray: currentArray
        })
      }
      else {
        this.setState({
          isFinalVisible: true,
          isWordGroupVisible: false,
          currentId: 0
        }, ()=>this.submitAnswer() )
      }
    }


    nextSentence = () =>{
      let courses = this.state.courses.slice();
      let currentId = this.state.currentId;
      let exerciseId = this.state.currentExerciseId;
      exerciseId  = exerciseId + 1;
      if(exerciseId<courses[0].exercises.length){

        const correct_answer = courses[0].exercises[exerciseId].full_sentence;
        const words = courses[0].exercises[exerciseId].words;
        console.log(correct_answer);
        console.log(words);
            var newWords = []
            for (var i = 0; i < words.length; i++) {
              var a = words[i].variants;
              for (var j = 0; j < a.length; j++) {
                newWords.push(a[j]);
              }
            }          
            var result = []; 
            for(var i=0;i < newWords.length;i = i+4){
              result.push(newWords.slice(i,i+4));
            }
        console.log(result);
        console.log(newWords);
        var currentArray = result[currentId]; 
        console.log(currentArray);

        this.setState({
          currentExerciseId: exerciseId,
          isWordGroupVisible: true,
          isFinalVisible: false,
          correct_answer: correct_answer,
          words: words,
          doubleWords: result,
          currentArray: currentArray,
          visibleSentence: '',
          sentence: '',
          incorrectAnswer: false,
          correctAnswer: false

        })
      }
      else{
        this.setState({
          isResultVisible: true,
          incorrectAnswer: false,
          correctAnswer: false,
          isWordGroupVisible: false,
          isFinalVisible: false,
          sentenceVisible: false,
          headerVisible: false                      
        })

      } 
    }

    consoleState = () =>{
      console.log(this.state)
    }

  render() {
    var id = this.state.currentExerciseId;
    return (
          <Card>
            <Image src='/courses.png' />
            <Card.Content>
              <Card.Header>{this.props.course}</Card.Header>
              <Card.Meta>
                <span className='date'>Requires {this.props.time} minutes of your time</span>
              </Card.Meta>
              <Card.Description>This course consists of {this.props.tasks} exercises</Card.Description>
              <Card.Description>
                <Modal className="modal" trigger={<Button primary>Start</Button>} closeIcon>
                    <Card className="wrapper-variant">
                        <Card.Content>
                        {this.state.isResultVisible ? <h1>Congratulations</h1>: null }
                        {this.state.headerVisible ? 
                          <Card.Header className="header-variant course-simple-item-header">{this.state.exercises[id].translation}</Card.Header>: null  
                        }
                        {this.state.sentenceVisible ?
                            <Card.Header className="header-variant course-simple-item-sentence">{this.state.visibleSentence}</Card.Header>: null
                         }
                          
    
                          <Card.Description className="button-wrap">
                            <Button.Group className="button-group button-variants">
                            { /*this.state.isWordGroupVisible ? this.state.words.map((word, index) =>
                                <Button className="button-variant" key={index} primary onClick={this.updateSentence}>{word}</Button>
                                ) : null */
                                /*
                                this.state.doubleWords.map((item,index) => {
                                    return item.map((word,index) => 
                                      <Button className="button-variant" key={index} primary onClick={this.updateSentence}>{word}</Button>
                                    )
                                } */
                                this.state.isWordGroupVisible ?
                                this.state.currentArray.map((item,index) => 
                                  <Button className="button-variant" key={index} primary onClick={this.updateSentence}>{item}</Button>
                                ): null
                              }                            	
                            </Button.Group>
                            { (this.state.isFinalVisible && this.state.correctAnswer) ? <h1 className="course-simple-item right">Right!</h1>: null }
                            { (this.state.isFinalVisible && this.state.incorrectAnswer) ? <h1 className="course-simple-item wrong">Wrong!</h1>: null }
                            <Button.Group className="button-group">
                              <Button className="button-variant" primary onClick={this.con}>Console</Button>
                            </Button.Group>
                            <Button.Group className="button-group">
                              <Button className="button-variant" primary onClick={this.nextSentence}>Continue</Button>
                            </Button.Group>                                                                                                                                                                                                        
                          </Card.Description>                          
                        </Card.Content>
                    </Card>
                </Modal>                
              </Card.Description>
             </Card.Content>
          </Card> 
	);
  }
}

export default CoursesSimple;