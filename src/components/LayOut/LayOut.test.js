import React from 'react';
import ReactDOM from 'react-dom';
import LayOut from './LayOut';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LayOut />, div);
  ReactDOM.unmountComponentAtNode(div);
});