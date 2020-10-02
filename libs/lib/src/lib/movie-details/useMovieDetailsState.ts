import {useQuery, useReactiveVar} from "@apollo/client";
import {QUERY_SELECTED_MOVIE} from "../state-gql/gql";
import {fetchStateVar, selectedMovieIdVar, similarMoviesListVar} from "../state-gql/cache";

export interface MovieDetailsState {
  onListSimilarMovies: () => void;
  selectedMovie: any;
  selectedMovieError: string;
}

const useMovieDetailsState = (testing = false): MovieDetailsState => {
  const fetchState = useReactiveVar(fetchStateVar);
  const selectedMovieId = useReactiveVar(selectedMovieIdVar);

  const {data: selectedMovie} = useQuery(QUERY_SELECTED_MOVIE, {
    skip: selectedMovieId === 0,
    variables: {id: selectedMovieId},
    fetchPolicy: testing ? "cache-first" : "cache-only" // https://github.com/apollographql/react-apollo/issues/779
    // fetchPolicy: "cache-only"
  });

  return {
    onListSimilarMovies: () => {
      similarMoviesListVar(selectedMovie.movies.movie.similar.edges);
    },
    selectedMovie: selectedMovie?.movies.movie,
    selectedMovieError: fetchState.useLazyQueryMovieDetails?.errorMessage || ''
  }
}

export default useMovieDetailsState;
