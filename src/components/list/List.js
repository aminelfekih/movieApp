import React, { Component } from 'react';
import Card from '../card/Card';
import './List.css';

class List extends Component {
  filterByCategory(movies, filter) {
    if (filter === "All") {return movies}
    else {
        return movies.filter((movie) => {
            return movie.category === filter
        })
    }
  }
  render() {
    const {movies, filter, deleteHandle} = this.props
    const filtredMovies = this.filterByCategory(movies,filter)
    return (
      <div className="List">
        {filtredMovies.map((movie) => <Card movie={movie} key={movie.id} deleteHandle={deleteHandle}></Card>)}
      </div>
    );
  }
}

export default List;
