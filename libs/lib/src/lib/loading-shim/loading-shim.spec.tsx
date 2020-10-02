import React from 'react';
import {render} from '@testing-library/react';

import LoadingShim from './loading-shim';
import * as Stories from "./loading-shim.stories";
import {WithStableMuiClassnames} from "../storybook-test-utils";

describe('LoadingShim', () => {
  // it('should render successfully', () => {
  //   const { baseElement } = render(<LoadingShim />);
  //   expect(baseElement).toBeTruthy();
  // });

  describe('Storybook stories snapshot tests', () => {
    for (const [key, value] of Object.entries(Stories)) {
      if (value instanceof Function) {
        it(`Story ${key}`, () => {
          const {container} = render(WithStableMuiClassnames(Stories[key]()));
          expect(container.firstChild).toMatchSnapshot()
        });
      }
    }
  });
});
