import React, {FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading-shim.scss';
import useLoadingShimState, {LoadingShimState} from "./useLoadingShimState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      '& .MuiCircularProgress-root': {
        zIndex: 1001,
        position: 'fixed',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
      },
    },
  }),
);

/* eslint-disable-next-line */
export interface LoadingShimProps {
  hook?: () => LoadingShimState
}

export const LoadingShim: FC<LoadingShimProps> = ({hook = useLoadingShimState}: LoadingShimProps) => {
  const classes = useStyles();

  const {loading} = hook();

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress/>
      </div>
    );
  } else {
    return <React.Fragment/>;
  }

};

export default LoadingShim;

