import React from 'react';
import {LoadingShim} from './loading-shim';
import {LoadingShimState} from "./useLoadingShimState";

export default {
  component: LoadingShim,
  title: 'LoadingShim',
};

export const Visible = () => {
  const state = (): LoadingShimState => {
    return {
      loading: true
    }
  };
  return <LoadingShim hook={state}/>;
};

export const Hidden = () => {
  const state = (): LoadingShimState => {
    return {
      loading: false
    }
  };
  return <LoadingShim hook={state}/>;
};
