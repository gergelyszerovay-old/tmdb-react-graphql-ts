import React, {FC} from 'react';

import './movie-list.scss';
import {makeStyles} from "@material-ui/core/styles";
import {Chip, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import useMovieListState, {MovieListState} from "./useMovieListState";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& .MuiListItemText-primary': {},
    '& .MuiListItem-root': {
      cursor: 'pointer',
      display: 'block'
    },
    '& .MuiChip-root': {
      cursor: 'pointer',
    }
  },
  genreContainer: {
    '& > div': {
      marginRight: '5px',
      marginBottom: '5px'
    }
  },
  error: {
    margin: '10px'
  }
}));


/* eslint-disable-next-line */
export interface MovieListProps {
  hook?: () => MovieListState;
}

export const MovieList: FC<MovieListProps> = ({hook = useMovieListState}: MovieListProps) => {
  const classes = useStyles();

  const {movieList, onMovieSelected, movieListError} = hook();

  if (movieListError !== '') {
    return <MuiAlert elevation={6} variant="filled" severity="error" className={classes.error}>Can't load the movie list
      from the server!</MuiAlert>
  }

  if (movieList) {
    const items = movieList.map((edge: any, i: number) => {
      if (edge.node.__typename !== 'MovieResult' && edge.node.__typename !== '__Movie') {
        return (<React.Fragment key={'empty' + i}/>)
      }
      const genres = edge.node.details.genres.map((genre: any) => {
        return (
          <Chip size="small" label={genre.name} key={edge.node.id + '-' + genre.id}/>
        );
      });
      return (
        <React.Fragment key={edge.node.id}>
          <ListItem
            button
            onClick={() => {
              onMovieSelected(edge.node)
            }}
            data-testid={'movie-' + edge.node.id}
          >
            <ListItemText
              primary={edge.node.title + ` (${edge.node.rating})`}
            />
            <div className={classes.genreContainer}>{genres}</div>
          </ListItem>
          <Divider component="li"/>
        </React.Fragment>
      )
    });
    return (
      <List className={classes.root}>
        {items}
      </List>
    );

  }
  return <p/>
};

export default MovieList;
