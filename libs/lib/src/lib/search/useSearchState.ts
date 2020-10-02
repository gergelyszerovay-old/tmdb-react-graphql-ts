import React from "react";
import {movieListTermVar, similarMoviesListVar} from "../state-gql/cache";

export interface SearchState {
  onQueryMovieList: () => void,
  inputTerm: string,
  setInputTerm: (string) => void
}

const useSearchState = (): SearchState => {
  const [inputTerm, setInputTerm] = React.useState("");

  return {
    onQueryMovieList: () => {
      movieListTermVar(inputTerm);
      similarMoviesListVar(false);
    },
    inputTerm, setInputTerm
  }
};

export default useSearchState;
