import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findWithClass} from 'react-shallow-testutils';
import {SearchButton} from './index.js';

const render = (jsx) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(jsx);
  return renderer.getRenderOutput();
};

describe('SearchButton spec', () => {
  let output;
  beforeEach(() => {
    output = render(<SearchButton text="test text" />);
  });

  it('should have a correct class', () => {
    expect(output.props.className).toEqual('ui-search-button');
  });

  it('should have a correct type', () => {
    const element = findWithClass(output, 'ui-search-button');
    expect(element.props.type).toEqual('submit');
  });

  it('should have a correct text in child node', () => {
    const element = findWithClass(output, 'search-button-content');
    expect(element.props.children).toEqual('test text');
  });
});
