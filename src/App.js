import React, { Component } from 'react';
import List from './components/list/List';
import movies from './movies';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        listMovies: Object.values(movies),
        categories: [],
        filter: 'All'
    };
    this.deleteMovie = this.deleteMovie.bind(this);
  }
  deleteMovie(movieId) {
    const movies = this.state.listMovies
    const updatemovies = [];
    movies.filter((movie) => {
      if (movie.id !== movieId) {
        updatemovies.push(movie)
      }
    });
    this.setState({listMovies: updatemovies},() => {
      this.getCategories()
    }
    )
  }
  getCategories() {
    const movies = this.state.listMovies;
    const categories = [];
    movies.map((movie) => {
      if (!categories.includes(movie.category)) {
        categories.push(movie.category)
      }
    })
    this.setState({categories})
  }
  componentDidMount() {
    this.getCategories()
  }
  multiselect() {
    const categories = this.state.categories
    if (categories.length > 0) {
      return(
        <div className="multiselect">
        <select name="select" onChange={(e) => {this.setState({filter: e.target.value})}}>
          <option value="All">All</option>
          {categories.map((category) => <option value={category}>{category}</option>)}
        </select>
       </div>
     )
    }
  }
  
  render() {
    return (
      <div className="App">
        {this.multiselect()}
        <List movies={this.state.listMovies}
          deleteHandle={this.deleteMovie}
          filter={this.state.filter}></List>
      </div>
    );
  }
}

export default App;
