import React from 'react';
import {MovieDetails} from './movie-details';

// @ts-ignore
import movie from './fixtures/movie.json';

import {MovieDetailsState} from "./useMovieDetailsState";
import {action} from "@storybook/addon-actions";

export default {
  component: MovieDetails,
  title: 'MovieDetails',
};

export const primary = () => {
  const state = (): MovieDetailsState => {
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: movie
    }
  };
  return <MovieDetails hook={state}/>;
};

export const error = () => {
  const state = (): MovieDetailsState => {
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: 'Error',
      selectedMovie: undefined
    }
  };
  return <MovieDetails hook={state}/>;
};

export const empty = () => {
  const state = (): MovieDetailsState => {
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: undefined
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noWikipediaPageId = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie};
    delete m.wikipediaPageId;
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noIMDBId = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie};
    delete m.externalIds.imdb;
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noExternalIds = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie};
    delete m.externalIds;
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noSimilarMovies = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie};
    delete m.similar;
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noWikipediaExtract = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie, wikipediaExtract: ''};
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};

export const noWikipediaExtractThreeDots = () => {
  const state = (): MovieDetailsState => {
    let m = {...movie, wikipediaExtract: '...'};
    return {
      onListSimilarMovies: action('onListSimilarMovies'),
      selectedMovieError: '',
      selectedMovie: m
    }
  };
  return <MovieDetails hook={state}/>;
};
