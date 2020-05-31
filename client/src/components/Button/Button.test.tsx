import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

test('render label', () => {
  const { getByText } = render(<Button label="click" onClick={() => null} />);
  const element = getByText('click');
  expect(element).toBeInTheDocument();
});

test('call onClick function on click', () => {
  const fn = jest.fn();
  const { getByText } = render(<Button label="click" onClick={fn} />);
  const element = getByText('click');
  fireEvent.click(element);
  expect(fn).toBeCalled();
});

test('render disabled class', () => {
  const { getByText } = render(<Button label="click" onClick={() => null} disabled={true} />);
  const element = getByText('click');
  expect(element).toHaveClass('opacity-75 cursor-not-allowed');
});

test('do not call onClick function when disabled', () => {
  const fn = jest.fn();
  const { getByText } = render(<Button label="click" onClick={fn} disabled={true} />);
  const element = getByText('click');
  fireEvent.click(element);
  expect(fn).toBeCalledTimes(0);
});
