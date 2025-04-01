import React from 'react';
import ReactDOM from 'react-dom';
import OrderSuccess from './OrderSuccess';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderSuccess />, div);
  ReactDOM.unmountComponentAtNode(div);
});