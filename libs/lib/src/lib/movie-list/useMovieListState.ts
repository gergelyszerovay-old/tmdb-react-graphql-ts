import {useApolloClient, useQuery, useReactiveVar} from "@apollo/client";
import {movieListTermVar, selectedMovieIdVar, similarMoviesListVar, useUpdateFetchState} from "../state-gql/cache";
import {QUERY_MOVIE_LIST} from "../state-gql/gql";
import useLazyQueryMovieDetails from "../state-gql/useLazyQueryMovieDetails";

export interface MovieListState {
  onMovieSelected: (any) => void;
  movieList: any;
  movieListError: string;
}

const useMovieListState = (): MovieListState => {
  const client = useApolloClient();

  const similarMoviesList = useReactiveVar(similarMoviesListVar);
  const movieListTerm = useReactiveVar(movieListTermVar);

  const {data: tmdbLoadMoviesData, error: tmdbLoadMoviesError, loading: tmdbLoadMoviesLoading} = useQuery(QUERY_MOVIE_LIST, {
    skip: movieListTerm === '',
    variables: {
      term: movieListTerm
    },

    // https://github.com/apollographql/apollo-client/issues/6759 or https://github.com/apollographql/react-apollo/issues/3717
    fetchPolicy: "network-only"
  });

  useUpdateFetchState('QUERY_MOVIE_LIST', {
    errorMessage: tmdbLoadMoviesError?.message ? tmdbLoadMoviesError.message : '',
    loading: tmdbLoadMoviesLoading
  });

  const [loadMovieDetails] = useLazyQueryMovieDetails(client, 'http://' + window.location.hostname + ':4200/wikipedia/');

  return {
    onMovieSelected: (node) => {
      selectedMovieIdVar(node.id);
      loadMovieDetails(node.id);
    },
    movieList: similarMoviesList ? similarMoviesList : tmdbLoadMoviesData?.search?.edges,
    movieListError: tmdbLoadMoviesError ? tmdbLoadMoviesError.message : '',
  };
};

export default useMovieListState;
