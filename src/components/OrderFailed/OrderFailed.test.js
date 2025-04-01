import React from 'react';
import ReactDOM from 'react-dom';
import OrderFailed from './OrderFailed';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderFailed />, div);
  ReactDOM.unmountComponentAtNode(div);
});