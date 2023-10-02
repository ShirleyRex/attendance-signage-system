/**
 * @format
 */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });


/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../src/navigation';
import { NavigationContainer } from '@react-navigation/native';

it('renders correctly', () => {
  const tree = renderer.create(
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
