import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

test('call onClick function on click', () => {
  const fn = jest.fn();
  const { getByText } = render(<Button label="click" onClick={fn} />);
  const element = getByText('click');
  fireEvent.click(element);
  expect(fn).toBeCalled();
});
