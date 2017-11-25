import React from 'react';
import Login from '../client/src/components/user/formView/login.jsx';
import Signup from '../client/src/components/user/formView/signup.jsx';
import Response from '../client/src/components/user/formView/response.jsx';
import Submission from '../client/src/components/user/formView/submission.jsx';
import UserResponses from '../client/src/components/user/formView/userResponses.jsx';
import renderer from 'react-test-renderer';

/*TEST USER COMPONENTS*/

test('Login component renders correctly', () => {
  const tree = renderer
  .create(<Login></Login>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Signup component renders correctly', () => {
  const tree = renderer
  .create(<Signup></Signup>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//TODO: response.jsx

//TODO: submission.jsx

//TODO: userResponse.jsx

