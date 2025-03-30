import React from 'react';
import ReactDOM from 'react-dom';
import CheckOut from './CheckOut';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckOut />, div);
  ReactDOM.unmountComponentAtNode(div);
});