import {useEffect, useReducer, useState} from "react";
import axios from 'axios';
import {QUERY_SELECTED_MOVIE} from "./gql";
import {ApolloError, defaultDataIdFromObject, gql} from "@apollo/client";
import {FetchState, useUpdateFetchState} from "./cache";

const reducer = (state, action): FetchState => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMessage: ''
      };

    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      throw new Error();
  }
};

const useLazyQueryMovieDetails = (client, baseURLWikipediaAPI) => {
  const [movieID, setMovieID] = useState<number>(0);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    errorMessage: '',
  });

  useUpdateFetchState('useLazyQueryMovieDetails', state);

  useEffect(() => {
    // let didAxiosCancel = false;

    const fetchWikipediaExtract = async (tmdbMovieDetailsResult) => {

      try {
        // https://www.mediawiki.org/wiki/Extension:TextExtracts
        const wikipediaExtractResult = await axios.get(baseURLWikipediaAPI + 'api.php?action=query&prop=extracts&exchars=1000&explaintext&format=json&titles=' + encodeURIComponent(tmdbMovieDetailsResult.data.movies.movie.title));
        // if (!didAxiosCancel) {
        const pages = wikipediaExtractResult.data?.query?.pages;
        if (pages) {
          if (Object.values(pages).length > 0) {
            // we have the extract from Wikipedia
            const pages0 = Object.values(pages)[0] as any;
            client.writeFragment({
              id: defaultDataIdFromObject({
                id: tmdbMovieDetailsResult.data.movies.movie.id,
                __typename: 'DetailedMovie'
              }),
              fragment: gql`
                  fragment DetailedMovieWikipediaFields on DetailedMovie {
                    wikipediaExtract
                    wikipediaPageId
                  }
                `,
              data: {
                wikipediaExtract: pages0.extract,
                wikipediaPageId: pages0.pageid
              },
            });
          }
        }

        dispatch({type: 'FETCH_SUCCESS'});
        // } else {
        //   dispatch({type: 'FETCH_SUCCESS'});
        // }
      } catch (error) {
        // we don't care Wikipedia errors
        dispatch({type: 'FETCH_SUCCESS'});
      }
    };

    if (!movieID) {
      dispatch({type: 'FETCH_SUCCESS'});
      return
    }

    dispatch({type: 'FETCH'});

    // const source = axios.CancelToken.source();

    client.query({
      query: QUERY_SELECTED_MOVIE,
      variables: {id: movieID}
    }).then(tmdbMovieDetailsResult => {
      fetchWikipediaExtract(tmdbMovieDetailsResult);
    }).catch((e: ApolloError) => {
      dispatch({type: 'FETCH_FAILURE', payload: e.message});
    });

    // return () => {
    //   didAxiosCancel = true;
    //   source.cancel("didCancel");
    // };
  }, [movieID]);

  return [setMovieID];
};

export default useLazyQueryMovieDetails;
