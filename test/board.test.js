import React from 'react';
import Game from '../client/src/components/user/tictactoeView/game.jsx';
import Board from '../client/src/components/user/tictactoeView/game.jsx';
import HotSquare from '../client/src/components/user/tictactoeView/game.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

/* TEST GAME COMPONENT */

describe('Component: Game', () => {
  it('should match its empty snapshot', () => {
    const component = shallow(<Game />);
    expect(component).toMatchSnapshot();
  });
});


describe('Component: Board', () => {
  const squares = Array(9).fill(null);

  const handleClick = function (i) {
    console.log('click handled: ', i);
  };

  const unlockForms = function (i) {
  	console.log('forms have been unlocked!');
  };

  it('should match its empty snapshot', () => {
    const component = shallow(<Board squares={squares} onClick={handleClick} unlockForms={unlockForms} />);
    expect(component).toMatchSnapshot();
  });
});

describe('Component: Hot Button', () => {
  const value = 'X';
  const handleClick = function (i) {
    console.log('click handled: ', i);
  };
  it('should match its empty snapshot', () => {
    const component = shallow(<HotSquare value={value} onClick={handleClick} />);
  });
});
