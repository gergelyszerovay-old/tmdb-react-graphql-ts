import React from 'react';
import {Search} from './search';
import {action} from "@storybook/addon-actions";
import useSearchState, {SearchState} from "./useSearchState";

export default {
  component: Search,
  title: 'Search',
};

export const primary = () => {
  const useMockState = (): SearchState => {
    return {
      ...useSearchState(),
      onQueryMovieList: action('onQueryMovieList')
    };
  };

  return <Search hook={useMockState}/>;
};
