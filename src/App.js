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
        filter: 'All',
        currentPage: 1,
        cardsPerPage: 12
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
        <div className="category">
        categories 
        <select name="selectCategory" style={{marginLeft: '5px'}} onChange={(e) => {this.setState({filter: e.target.value})}}>
          <option value="All">All</option>
          {categories.map((category) => <option value={category} key={category}>{category}</option>)}
        </select>
       </div>
     )
    }
  }
  elementsPerPage() {
    return(
      <div className="perPage" style={{marginTop: '10px'}}>
        Size per page 
        <select name="selectPerPage" style={{marginLeft: '10px'}} onChange={(e) => {this.setState({cardsPerPage: Number(e.target.value)})}}>
          <option value="12" key="12">12</option>
          <option value="8" key="8">8</option>
          <option value="4" key="4">4</option>
        </select>
       </div>
    )
  }
  pagination() {
    const { listMovies, cardsPerPage, filter } = this.state;
    const filtredMovies = this.filterByCategory(listMovies,filter)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filtredMovies.length / cardsPerPage); i++) {
      pageNumbers.push(i);
    }
    return(
      <div className="pagination">
          {pageNumbers.map(
            number => {
              return (
                <button
                  key={number}
                  id={number}
                  onClick={(e) => {this.setState({currentPage: Number(e.target.id)})}}
                >
                  {number}
                </button>
            )}
          )}
      </div>
    )
  }
  filterByCategory(movies, filter) {
    if (filter === "All") {return movies}
    else {
        return movies.filter((movie) => {
            return movie.category === filter
        })
    }
  }
  
  render() {
    debugger
    const { filter, listMovies, currentPage, cardsPerPage } = this.state;
    const filtredMovies = this.filterByCategory(listMovies,filter)
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const paginetedMovies = filtredMovies.slice(indexOfFirstCard, indexOfLastCard);
    return (
      <div className="App">
        {this.multiselect()}
        {this.elementsPerPage()}
        <List movies={paginetedMovies}
          deleteHandle={this.deleteMovie}
          filter={filter}></List>
        {this.pagination()}
      </div>
    );
  }
}

export default App;
