import React, {FC} from 'react';

import './movie-details.scss';
import Button from "@material-ui/core/Button";
import useMovieDetailsState, {MovieDetailsState} from "./useMovieDetailsState";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    margin: '10px'
  }
}));

/* eslint-disable-next-line */
export interface MovieDetailsProps {
  hook?: () => MovieDetailsState;
}

export const MovieDetails: FC<MovieDetailsProps> = ({hook = useMovieDetailsState}: MovieDetailsProps) => { // {movie, onListSimilarMovies}: MovieDetailsProps
  const classes = useStyles();
  const {selectedMovie, onListSimilarMovies, selectedMovieError} = hook();

  if (selectedMovieError) {
    return <MuiAlert elevation={6} variant="filled" severity="error" className={classes.error}>Can't load the movie
      details from the server!</MuiAlert>
  }

  if (!selectedMovie?.id) {
    return <React.Fragment/>
  }

  return (
    <div>
      <h1>{selectedMovie.title}</h1>
      {selectedMovie.wikipediaPageId ?
        <p><a href={"http://en.wikipedia.org/?curid=" + selectedMovie.wikipediaPageId} target="_blank"
              rel="noreferrer">Wikipedia</a></p> : <React.Fragment/>
      }
      {selectedMovie.externalIds?.imdb ?
        <p><a href={`https://www.imdb.com/title/${selectedMovie.externalIds.imdb}/`} target="_blank"
              rel="noreferrer">IMDB</a></p> : <React.Fragment/>
      }
      <div>
        {selectedMovie.similar?.edges ?
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onListSimilarMovies()}
            data-testid="similar-movies-button"
          >
            List similar movies
          </Button> : <React.Fragment/>
        }
      </div>
      {selectedMovie.wikipediaExtract !== '' && selectedMovie.wikipediaExtract !== '...' ?
        <p>{selectedMovie.wikipediaExtract}</p> : <React.Fragment/>
      }
    </div>
  );
};

export default MovieDetails;
