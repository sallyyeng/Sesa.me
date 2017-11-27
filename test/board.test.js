import React from 'react';
import Game from '../client/src/components/user/tictactoeView/game.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

/*TEST GAME COMPONENT*/

describe('Component: Game', () => {
  it('should match its empty snapshot', () => {
    const component = shallow(<Game/>)
    expect(component).toMatchSnapShot();
  });
});