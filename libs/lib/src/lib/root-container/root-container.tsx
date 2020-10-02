import React, {FC} from 'react';

import './root-container.scss';
import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LoadingShim from "../../lib/loading-shim/loading-shim";
import MovieDetails from "../../lib/movie-details/movie-details";
import MovieList from "../../lib/movie-list/movie-list";
import Search from "../../lib/search/search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      rootContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        '& .searchContainer': {
          zIndex: 2
        },
        '& .movieContainer': {
          zIndex: 1,
          flex: 1,
          overflow: "hidden",
          '& .MuiGrid-container': {
            height: '100%',
            '& .gridMovieList': {
              height: '100%',
              overflow: 'auto',
              borderRight: 'solid #ccc 1px'
            },
            '& .gridMovieDetails': {
              padding: '5px',
              overflow: 'auto'
            },
          }
        },
      },
    },
  )
);

/* eslint-disable-next-line */
interface RootContainerProps {
}

export const RootContainer: FC<RootContainerProps> = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <LoadingShim/>
      <Box className={classes.rootContainer}>
        <Box className='searchContainer'>
          <Search/>
        </Box>
        <Box className='movieContainer'>
          <Grid container spacing={0}>
            <Grid item xs={6} className='gridMovieList'>
              <MovieList/>
            </Grid>
            <Grid item xs={6} className='gridMovieDetails'>
              <MovieDetails/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};
