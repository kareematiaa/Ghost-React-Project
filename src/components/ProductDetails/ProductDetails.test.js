import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from './ProductDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});