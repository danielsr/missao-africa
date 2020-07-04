import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Button from '.';

const fn = jest.fn();
const label = 'click';

afterEach(cleanup);

test('render label', () => {
  const { getByText } = render(<Button label={label} onClick={fn} />);
  const button = getByText(label);
  expect(button).toBeInTheDocument();
});

test('call onClick function on click', () => {
  const { getByText } = render(<Button label={label} onClick={fn} />);
  const button = getByText(label);
  fireEvent.click(button);
  expect(fn).toBeCalled();
});

test('render disabled class', () => {
  const { getByText } = render(<Button label={label} onClick={fn} disabled={true} />);
  const button = getByText(label);
  expect(button).toHaveClass('opacity-75 cursor-not-allowed');
});

test('do not call onClick function when disabled', () => {
  const functionToNotBeCalled = jest.fn();
  const { getByText } = render(
    <Button label={label} onClick={functionToNotBeCalled} disabled={true} />
  );
  const button = getByText(label);
  fireEvent.click(button);
  expect(functionToNotBeCalled).toBeCalledTimes(0);
});
