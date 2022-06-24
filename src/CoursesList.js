import React, { Component, Fragment } from 'react';
import { Card, Image, Button} from 'semantic-ui-react'
import TopMenu from './TopMenu'
import CoursesSimple from './CoursesSimple'
import CoursesMedium from './CoursesMedium'
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

class CoursesList extends Component {
  render() {
    return (
      <Fragment>
        <TopMenu></TopMenu>
        <Card.Group itemsPerRow={4}>
          <Card>
            <Image src='/data/alacrity.jpg' />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
              <div className="link-wrapper">
                  <Link to={"/coursessimple"}>Simple courses</Link>
              </div>              
            </Card.Content>
          </Card> 
          <Card>
            <Image src='/data/alacrity.jpg' />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
              <div className="link-wrapper">
                <Link to={"/coursesintermediate"}>Intermediate courses</Link>
              </div>              
            </Card.Content>
          </Card> 
          <Card>
            <Image src='/data/alacrity.jpg' />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
              <div className="link-wrapper">
                <Link to={"/coursesadvanced"}>Advanced courses</Link>
              </div>              
            </Card.Content>
          </Card>       
        </Card.Group>
        <Router>
          <div>
            <Route path="/courses/simple" component={CoursesSimple} />
            <Route path="/courses/medium" component={CoursesMedium} />     
          </div>
        </Router>                  
      </Fragment>
	);
  }
}

export default CoursesList;