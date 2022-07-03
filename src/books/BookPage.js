import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'

const BookPage = ({ match, location }) => {

  const { params: { bookId } } = match;
  return (
    <Fragment>
      <p>
        <strong>User ID: </strong>
        {bookId}
      </p>
      <p>
        <strong>User Name: </strong>
        {books[booksId - 1].title}
      </p>
    </Fragment>
  );
}
	

export default BookPage;
