import {act, renderHook} from "@testing-library/react-hooks";
import useSearchState from "./useSearchState";
import {movieListTermVar, similarMoviesListVar} from "@tmdb-react-graphql/lib";

describe('useSearchState hook tests', () => {
  it('onQueryMovieList', () => {
    const {result} = renderHook(() => useSearchState());

    act(() => {
      result.current.setInputTerm('Test884');
    })
    act(() => {
      result.current.onQueryMovieList();
    })

    expect(similarMoviesListVar()).toBe(false);
    expect(movieListTermVar()).toBe('Test884');

  });


});
