import React from 'react';
import {fireEvent, getByTestId, render} from '@testing-library/react';

import MovieList from './movie-list';
import * as Stories from "./movie-list.stories";
import {WithStableMuiClassnames} from "../storybook-test-utils";
// @ts-ignore
import movieList from "./fixtures/movieList.json";
import {MovieListState} from "./useMovieListState";

describe('MovieList', () => {
  describe('On movie list item selectiom', () => {
    let container = null;
    let onMovieSelected = null;

    beforeEach(() => {
      onMovieSelected = jest.fn();
      const useMockState = (): MovieListState => {
        return {
          onMovieSelected: onMovieSelected,
          movieListError: '',
          movieList
        };
      };

      container = render(<MovieList hook={useMockState}/>).container;
    })

    it('Click on list item should trigger an event', () => {
      const buttonEl = getByTestId(container, 'movie-126889');
      fireEvent.click(buttonEl);
      expect(onMovieSelected).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 126889
        })
      );
    });
  });


  describe('Storybook stories snapshot tests', () => {
    for (const [key, value] of Object.entries(Stories)) {
      if (value instanceof Function) {
        it(`Story ${key}`, () => {
          const {container} = render(WithStableMuiClassnames(Stories[key]()));
          expect(container.firstChild).toMatchSnapshot()
        });
      }
    }
  });
});
