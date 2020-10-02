import axios from 'axios';
import {MockedProvider} from "@apollo/client/testing";
import {act, renderHook} from "@testing-library/react-hooks";
import React from "react";
// import {QUERY_SELECTED_MOVIE} from "./gql";
import useLazyQueryMovieDetails from "./useLazyQueryMovieDetails";
import {defaultDataIdFromObject, gql, InMemoryCache, useApolloClient} from "@apollo/client";

// @ts-ignore
import tmdbMovieDetails from './fixtures/tmdbMovieDetails.json';
// @ts-ignore
import wikipediaMovieDetails from './fixtures/wikipediaMovieDetails.json';
import {cacheConfigLib, fetchStateVar} from "./cache";
import {QUERY_SELECTED_MOVIE} from "./gql";
// import Mock = jest.Mock;

jest.mock('axios');

describe('useLazyQueryMovieDetails hook tests', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  const logApolloCacheContents = (client) => {
    console.log(JSON.stringify(client.extract(), null, 2));
  }

  const renderHookWithMockedApollo = (mocks) => {
    const cache: InMemoryCache = new InMemoryCache({...cacheConfigLib, addTypename: false});

    const wrapper = ({children}) => (
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    return renderHook(() => {
      const client = useApolloClient();
      return {
        setMovieID: useLazyQueryMovieDetails(client, 'http://example.com/wikipedia/')[0],
        client
      }
    }, {wrapper});
  };

  const QUERY_SELECTED_MOVIE_Mock = {
    request: {
      query: QUERY_SELECTED_MOVIE,
      variables: {id: 126889}
    },
    result: {
      data: tmdbMovieDetails.data
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

  it('Query movie details success', async () => {

    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_Mock]);

    axios.get.mockImplementationOnce(() => Promise.resolve({data: wikipediaMovieDetails}));

    act(() => {
      result.current.setMovieID(126889);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    const f = result.current.client.readFragment({
      id: defaultDataIdFromObject({
        id: 126889,
        __typename: 'DetailedMovie'
      }),
      fragment: gql`
        fragment DetailedMovie_f1 on DetailedMovie {
          id
          wikipediaExtract
          wikipediaPageId
        }
      `,
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(f.id).toBe(126889);
    expect(f.wikipediaPageId).toBe(43219389);
    expect(f.wikipediaExtract).not.toBe('');

  });

  it('Query movie details fails - Apollo error', async () => {

    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_MockError]);

    axios.get.mockImplementationOnce(() => Promise.resolve({data: wikipediaMovieDetails}));

    act(() => {
      result.current.setMovieID(126889);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(fetchStateVar().useLazyQueryMovieDetails.errorMessage).toBe('Error1')

  });

  it('Query movie details fails - Wikipedia error', async () => {

    const {result} = renderHookWithMockedApollo([QUERY_SELECTED_MOVIE_Mock]);

    axios.get.mockImplementationOnce(() => Promise.reject(new Error('Error2')));

    act(() => {
      result.current.setMovieID(126889);
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    const f = result.current.client.readFragment({
      id: defaultDataIdFromObject({
        id: 126889,
        __typename: 'DetailedMovie'
      }),
      fragment: gql`
        fragment DetailedMovie_f2 on DetailedMovie {
          id
          wikipediaExtract
          wikipediaPageId
        }
      `,
    });

    await act(() => new Promise((resolve) => setTimeout(resolve, 0))); // https://github.com/apollographql/apollo-client/issues/5920

    expect(f.id).toBe(126889);
    expect(f.wikipediaPageId).toBe('');
    expect(f.wikipediaExtract).toBe('');
  });
});
