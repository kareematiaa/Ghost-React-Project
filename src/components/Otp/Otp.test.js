import React from 'react';
import ReactDOM from 'react-dom';
import Otp from './Otp';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Otp />, div);
  ReactDOM.unmountComponentAtNode(div);
});