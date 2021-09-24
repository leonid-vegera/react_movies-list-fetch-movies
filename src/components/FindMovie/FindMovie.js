import React, { useState } from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

import './FindMovie.scss';

import { MovieCard } from '../MovieCard';
import { request } from '../../api/api';

export const FindMovie = ({ addMovie }) => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [isError, setError] = useState(false);

  const getMovie = () => {
    request(query)
      .then((result, error) => {
        if (result.Response === 'False') {
          setError(true);

          return;
        }

        setMovie({
          title: result.Title,
          description: result.Plot,
          imgUrl: result.Poster,
          imdbId: result.imdbID,
          imdbUrl: `https://www.imdb.com/title/${result.imdbID}`,
        });
      });
  };

  const setDefault = () => {
    setMovie(null);
    setQuery('');
  };

  return (
    <>
      <form className="find-movie">
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className={
                classNames('input', { 'is-danger': isError })
              }
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setError(false);
              }}
            />
          </div>

          {isError && (
            <p className="help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-light"
              onClick={() => getMovie(query)}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            <button
              type="button"
              className="button is-primary"
              onClick={() => {
                addMovie(movie);
                setDefault();
              }}
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      {movie && (
        <div className="container">
          <h2 className="title">Preview</h2>
          <MovieCard {...movie} />
        </div>
      )}
    </>
  );
};

// ! by Class Component
/* export class FindMovie extends React.PureComponent {
  state = {
    query: '',
    movie: null,
    isError: false,
  }

  getMovie(query) {
    request(query)
      .then((result) => {
        // todo Если ничего не пришло по запросу, но ничего не делаем
        if (result.Response === 'False') {
          this.setState({
            isError: true,
          });

          return;
        }

        // todo в объект муви присваиваем новые свойста из загруженного фильма
        // todo - названия свойств отличались
        this.setState({
          movie: {
            title: result.Title,
            description: result.Plot,
            imgUrl: result.Poster,
            imdbId: result.imdbID,
            imdbUrl: `https://www.imdb.com/title/${result.imdbID}`,
          },
        });
      });
  }

  setDefault = () => {
    this.setState({
      movie: null,
      query: '',
    });
  }

  render() {
    const { addMovie } = this.props;

    return (
      <>
        <form className="find-movie">
          <div className="field">
            <label className="label" htmlFor="movie-title">
              Movie title
            </label>

            <div className="control">
              <input
                type="text"
                id="movie-title"
                placeholder="Enter a title to search"
                className={
                  classNames('input', { 'is-danger': this.state.isError })
                }
                value={this.state.query}
                onChange={(event) => {
                  this.setState({
                    query: event.target.value,
                    isError: false,
                  });
                }}
              />
            </div>

            {this.state.isError && (
              <p className="help is-danger">
                Can&apos;t find a movie with such a title
              </p>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => {
                  this.getMovie(this.state.query);
                }}
              >
                Find a movie
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="button is-primary"
                onClick={() => {
                  addMovie(this.state.movie);
                  this.setDefault();
                }}
              >
                Add to the list
              </button>
            </div>
          </div>
        </form>

        {this.state.movie && (
          <div className="container">
            <h2 className="title">Preview</h2>
            <MovieCard {...this.state.movie} />
          </div>
        )}
      </>
    );
  }
} */

FindMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};
