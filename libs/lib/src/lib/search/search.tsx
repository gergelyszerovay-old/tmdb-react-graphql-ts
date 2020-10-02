import React, {FC} from 'react';

import './search.scss';
import {AppBar, createStyles, fade, InputBase, Theme, Toolbar} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import useSearchState, {SearchState} from "./useSearchState";

const useStyles = makeStyles((theme: Theme) =>
  // styles based on https://material-ui.com/components/app-bar/
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

/* eslint-disable-next-line */
export interface SearchProps {
  hook?: () => SearchState
}

export const Search: FC<SearchProps> = ({hook = useSearchState}: SearchProps) => {
  const classes = useStyles();

  const {inputTerm, setInputTerm, onQueryMovieList} = hook();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search', 'data-testid': 'search-input'}}
              value={inputTerm}
              onChange={e => setInputTerm(e.target.value)}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  onQueryMovieList();
                }
              }
              }
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onQueryMovieList()}
            data-testid="search-button"
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Search;
