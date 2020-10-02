import React from 'react';
import {fireEvent, getByTestId, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './search';
import * as Stories from "./search.stories";
import useSearchState, {SearchState} from "./useSearchState";
import {WithStableMuiClassnames} from "../storybook-test-utils";

describe('Search', () => {

  describe('Search field submit tests', () => {
    let container = null;
    let onQueryMovieListMock = null;
    let state: SearchState = null;

    beforeEach(() => {
      onQueryMovieListMock = jest.fn();
      const useMockState = (): SearchState => {
        state = useSearchState();
        return {
          ...state,
          onQueryMovieList: onQueryMovieListMock
        };
      };

      container = render(<Search hook={useMockState}/>).container;
    })

    it('Submit on enter should work', () => {
      const searchInputEl = getByTestId(container, 'search-input') as HTMLInputElement;
      userEvent.type(searchInputEl, 'Test123');
      fireEvent.keyPress(searchInputEl, {key: 'Enter', code: 'Enter', charCode: 13});
      expect(onQueryMovieListMock).toHaveBeenCalled();
      expect(state.inputTerm).toBe('Test123');
    });

    it('Click on search button should work', () => {
      const searchInputEl = getByTestId(container, 'search-input') as HTMLInputElement;
      const searchButtonEl = getByTestId(container, 'search-button') as HTMLInputElement;
      userEvent.type(searchInputEl, 'Test123');
      fireEvent.click(searchButtonEl);
      expect(onQueryMovieListMock).toHaveBeenCalled();
      expect(state.inputTerm).toBe('Test123');
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
