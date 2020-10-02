import React from 'react';
import {StylesProvider} from '@material-ui/styles';

// https://github.com/mui-org/material-ui/issues/9492
export const WithStableMuiClassnames = (c) => {
  const generateClassName = () => {
    let counter = 0
    return (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}-${counter++}`
  }

  return (
    <StylesProvider generateClassName={generateClassName()}>
      {c}
    </StylesProvider>
  )
}
