import React, { Component } from 'react';
import Card from '../card/Card';
import './List.css';

class List extends Component {
  render() {
    const {movies, deleteHandle} = this.props;
    return (
      <div className="List">
        {movies.map((movie) => <Card movie={movie} key={movie.id} deleteHandle={deleteHandle}></Card>)}
      </div>
    );
  }
}

export default List;
