import React from 'react';
import ReactDOM from 'react-dom';
import ForgetPassword from './ForgetPassword';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForgetPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});