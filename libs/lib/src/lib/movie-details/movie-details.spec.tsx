import React from 'react';
import {fireEvent, getByTestId, render} from '@testing-library/react';

import MovieDetails from './movie-details';

import * as Stories from './movie-details.stories';
import {WithStableMuiClassnames} from "../storybook-test-utils";
import {MovieDetailsState} from "./useMovieDetailsState";

// @ts-ignore
import movie from './fixtures/movie.json';

describe('MovieDetails', () => {
  describe('On similar movies list click', () => {
    let container = null;
    let onListSimilarMoviesMock = null;

    beforeEach(() => {
      onListSimilarMoviesMock = jest.fn();
      const useMockState = (): MovieDetailsState => {
        return {
          onListSimilarMovies: onListSimilarMoviesMock,
          selectedMovie: movie,
          selectedMovieError: ''
        };
      };

      container = render(<MovieDetails hook={useMockState}/>).container;
    })

    it('Button should work', () => {
      const buttonEl = getByTestId(container, 'similar-movies-button');
      fireEvent.click(buttonEl);
      expect(onListSimilarMoviesMock).toHaveBeenCalled();
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
