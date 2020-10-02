import React from 'react';
import {render} from '@testing-library/react';

import App from './app';
import {MockedProvider} from "@apollo/client/testing";

describe('App', () => {
  it('should render successfully', () => {
    const {baseElement} = render((
      <React.StrictMode>
        <MockedProvider mocks={[]} addTypename={false}>
          <App/>
        </MockedProvider>
      </React.StrictMode>
    ));

    expect(baseElement).toBeTruthy();
  });

});
