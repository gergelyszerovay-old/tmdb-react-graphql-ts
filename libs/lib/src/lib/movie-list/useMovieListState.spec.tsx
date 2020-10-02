import {MockedProvider} from "@apollo/client/testing";
import {act, renderHook} from "@testing-library/react-hooks";
import useMovieListState from "./useMovieListState";
import React from "react";
import {movieListTermVar, selectedMovieIdVar, similarMoviesListVar} from "@tmdb-react-graphql/lib";
import {QUERY_MOVIE_LIST} from "../state-gql/gql";

// @ts-ignore
import movieList from "./fixtures/movieList.json";

// @ts-ignore
import similarMovieList from "./fixtures/similarMovieList.json";

const mockLoadMovieDetails = jest.fn();
jest.mock('../state-gql/useLazyQueryMovieDetails', () => () => [mockLoadMovieDetails]);

describe('useMovieListState hook tests', () => {

  const renderHookWithMockedApollo = (mocks) => {
    const wrapper = ({children}) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    return renderHook(() => useMovieListState(), {wrapper});
  };

  const QUERY_MOVIE_LIST_Mock = {
    request: {
      query: QUERY_MOVIE_LIST,
      variables: {
        term: 'alien'
      }
    },
    result: {
      data: {
        search: {
          edges: movieList
        },
      }
    },
    // error: new Error("Error1")
  };

  const QUERY_MOVIE_LIST_MockError = {
    request: {
      query: QUERY_MOVIE_LIST,
      variables: {
        term: 'alien'
      }
    },
    error: new Error("Error1")
  };

  it('If we set movieListTermVar, the movie list loads', async () => {

    act(() => {
      movieListTermVar('alien');
    });

    const {result} = renderHookWithMockedApollo([QUERY_MOVIE_LIST_Mock]);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.movieList[0].node.id).toBe(348);
  });

  it('If we set movieListTermVar, the movie list tries to load, but we have an error', async () => {

    act(() => {
      movieListTermVar('alien');
    });

    const {result} = renderHookWithMockedApollo([QUERY_MOVIE_LIST_MockError]);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.movieListError).toBe('Error1');
  });

  it('If we set the similar movie list, it loads', async () => {

    act(() => {
      similarMoviesListVar(similarMovieList);
    });

    const {result} = renderHookWithMockedApollo([QUERY_MOVIE_LIST_Mock]);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(result.current.movieList[0].node.id).toBe(8077);

    act(() => {
      similarMoviesListVar(false);
    });

    expect(result.current.movieList[0].node.id).toBe(348);
  });

  it('When we call onMovieSelected, it sets selectedMovieIdVar and loads the details', async () => {
    const {result} = renderHookWithMockedApollo([QUERY_MOVIE_LIST_Mock]);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    act(() => {
      result.current.onMovieSelected({id: 12});
    });

    expect(selectedMovieIdVar()).toBe(12);
    expect(mockLoadMovieDetails).toHaveBeenCalledWith(12);

  });


});
