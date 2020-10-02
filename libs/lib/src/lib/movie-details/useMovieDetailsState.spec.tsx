import {act, renderHook} from "@testing-library/react-hooks";
import {fetchStateVar, selectedMovieIdVar, similarMoviesListVar} from "@tmdb-react-graphql/lib";
import useMovieDetailsState from "./useMovieDetailsState";
import {MockedProvider} from "@apollo/client/testing";
import React from "react";
import {QUERY_SELECTED_MOVIE} from "../state-gql/gql";

// @ts-ignore
import movie from './fixtures/movie.json';

describe('useMovieDetailsState hook tests', () => {

  const renderHookWithMockedApollo = (mocks) => {
    const wrapper = ({children}) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    return renderHook(() => useMovieDetailsState(true), {wrapper});
  };

  const QUERY_SELECTED_MOVIE_Mock = {
    request: {
      query: QUERY_SELECTED_MOVIE,
      variables: {id: 126889}
    },
    result: {
      data: {
        movies: {
          movie
        }
      }
    }
    // error: new Error("Error1")
  };

  const QUERY_SELECTED_MOVIE_MockError = {
    request: {
      query: QUERY_SELECTED_MOVIE,
      variables: {id: 126889}
    },
    error: new Error("Error1")
  };

  it('Query selected movie list success', async () => {

    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_Mock]);

    act(() => {
      selectedMovieIdVar(126889);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.selectedMovie.id).toBe(126889);

  });

  it('onListSimilarMovies', async () => {
    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_Mock]);

    act(() => {
      selectedMovieIdVar(126889);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    act(() => {
      result.current.onListSimilarMovies();
    });

    const similarMoviesList = similarMoviesListVar();
    expect(similarMoviesList[0].node.title).toBe('Interstellar');

  });

  it('Query selected movie list error', async () => {
    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_MockError]);

    act(() => {
      fetchStateVar({useLazyQueryMovieDetails: {loading: false, errorMessage: 'Error1'}});
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.selectedMovieError).toBe('Error1');
  });

  it('Before fetch started, there is no fetch error', async () => {
    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_MockError]);

    act(() => {
      fetchStateVar({});
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.selectedMovieError).toBe('');
  });

});
