import {makeVar, useReactiveVar} from "@apollo/client";
import {useEffect} from "react";
import _ from 'lodash';

export interface FetchState {
  errorMessage: string,
  loading: boolean
}

interface FetchStates {
  [key: string]: FetchState;
}

export const fetchStateVar = makeVar<FetchStates>({});
export const movieListTermVar = makeVar('');
export const selectedMovieIdVar = makeVar(0);
export const similarMoviesListVar = makeVar(false);

export const cacheConfigLib = {
  typePolicies: {
    Query: {
      fields: {
        selectedMovieId() {
          return selectedMovieIdVar();
        },
        movieListTerm() {
          return movieListTermVar();
        },
        fetchState(): FetchStates {
          return fetchStateVar();
        }
      }
    },
    DetailedMovie: {
      fields: {
        wikipediaExtract: {read: (x = '') => (x)},
        wikipediaPageId: {read: (x = '') => (x)},
      }
    }
  }
};

export const useUpdateFetchState = (key: string, newFetchState: FetchState = undefined) => {
  // We can't update a reactive variable during the component render, so we use useEffect to update after the render
  // We only update the fetch state, if it changed
  // console.log('useUpdateFetchState');
  const fetchState = useReactiveVar(fetchStateVar);

  useEffect(() => {
    if (newFetchState) {
      if (!_.isEqual(key in fetchState ? fetchState[key] : undefined, newFetchState)) {
        fetchStateVar({...fetchState, [key]: newFetchState});
      }
    }
  });

  return fetchState;
};

export const useUpdateReactiveVar = (fn, prev, curr) => {
  // We can't update a reactive variable during the component render, so we use useEffect to update after the render
  // We only update the fetch state, if it changed
  // console.log('useUpdateReactiveVarEffect');
  useEffect(() => {
    if (!_.isEqual(prev, curr)) {
      fn(curr);
    }
  });
};
