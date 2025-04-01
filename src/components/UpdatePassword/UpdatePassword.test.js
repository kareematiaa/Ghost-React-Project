import React from 'react';
import ReactDOM from 'react-dom';
import UpdatePassword from './UpdatePassword';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpdatePassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});