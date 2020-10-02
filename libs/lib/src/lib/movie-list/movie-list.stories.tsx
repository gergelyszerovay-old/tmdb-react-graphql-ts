import React from 'react';
import {MovieList} from './movie-list';
// @ts-ignore
import movieList from "./fixtures/movieList.json";
import {action} from "@storybook/addon-actions";
import {MovieListState} from "./useMovieListState";

export default {
  component: MovieList,
  title: 'MovieList',
};

export const primary = () => {
  const state = (): MovieListState => {
    return {
      onMovieSelected: action('onMovieSelected'),
      movieListError: '',
      movieList
    }
  };
  return <MovieList hook={state}/>;
};

export const error = () => {
  const state = (): MovieListState => {
    return {
      onMovieSelected: action('onMovieSelected'),
      movieListError: 'Error',
      movieList: undefined
    }
  };
  return <MovieList hook={state}/>;
};
