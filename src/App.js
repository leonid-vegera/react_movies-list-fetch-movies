import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';
import data from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(data);

  const addMovie = (movie) => {
    if (!movie) {
      return;
    }

    if (movies.some(item => item.imdbId === movie.imdbId)) {
      return;
    }

    setMovies([...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <FindMovie addMovie={addMovie} />
      </div>
    </div>
  );
};

// ! by Class Component
/* export class App extends React.Component {
  state = {
    movies: data,
  };

  setMovies = (movie) => {
    if (!movie) {
      return;
    }

    if (this.state.movies
      .some(item => item.imdbId === movie.imdbId)) {
      return;
    }

    this.setState(state => ({
      movies: [
        ...state.movies,
        movie,
      ],
    }));
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <FindMovie addMovie={this.setMovies} />
        </div>
      </div>
    );
  }
} */
