import React from 'react';
import ReactDOM from 'react-dom';
import Products from './Products';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Products />, div);
  ReactDOM.unmountComponentAtNode(div);
});