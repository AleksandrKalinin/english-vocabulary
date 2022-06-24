import React, { Component, Fragment } from 'react';
import { Card, Button} from 'semantic-ui-react';
import TopMenu from './TopMenu';
import axios from 'axios';
import CoursesSimpleItem from './CoursesSimpleItem';

class CoursesSimple extends Component {

  constructor(props){
    super(props);
    this.state ={
      courses: [],
      words: [],
      exercises: []
    }
  }

  componentDidMount() {
      axios.get('/courses.json')
        .then(res => {
          const courses = res.data;
          this.setState({ courses: courses }, () => this.mapCourses() );
        })
    }

    mapCourses = () =>{
      var courses = this.state.courses.slice();
      var arrays = [];
      for (var i = 0; i < courses.length; i++) {
            var a = courses[i].exercises;
            for (var j = 0; j < a.length; j++) {
              arrays.push(a[j]);
            }
      }   
      console.log(arrays) 
      this.setState({
        exercises: arrays
      })   
      /*
          for (var i = 0; i < words.length; i++) {
            var a = words[i].variants;
            for (var j = 0; j < a.length; j++) {
              newWords.push(a[j]);
            }
          }   */    
    }

    con = () =>{
      let courses = this.state.courses.slice();

      console.log(courses[0].exercises[0].words[1].variants);
      console.log(courses[0].exercises[1].words);
      console.log(courses[1].exercises[0].words);
      console.log(courses[1].exercises[1].words);
    }

  render() {
    return (
      <Fragment>
        <TopMenu></TopMenu>
        <Card.Group itemsPerRow={4}>
          {this.state.courses.map((course, index) =>
            <CoursesSimpleItem
                      
              exerciseName={course.exercises[0].full_sentence}
              exercises = {this.state.exercises}
              exerciseTranslation={course.exercises[0].translation}
              key={index}
              name = {course.course}
              time={course.time}
              tasks={course.tasks}

            />
          )}
        </Card.Group>
        <Button onClick={this.con}>Console</Button>
        <Button onClick={this.mapCourses}>Courses</Button>
      </Fragment>
	);
  }
}

export default CoursesSimple;