import React from 'react';
import {render} from '@testing-library/react';
import {RootContainer} from "./root-container";
import {MockedProvider} from "@apollo/client/testing";

describe('RootContainer', () => {
  it('should render successfully', () => {
    const {baseElement} = render((
      <React.StrictMode>
        <MockedProvider mocks={[]} addTypename={false}>
          <RootContainer/>
        </MockedProvider>
      </React.StrictMode>
    ));
    expect(baseElement).toBeTruthy();
  });
});
