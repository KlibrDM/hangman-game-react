import { fireEvent, render, screen } from '@testing-library/react';
import GameButtons from './GameButtons';

test('GameButtons render', () => {
  render(<GameButtons/>);
  const linkElement = screen.getAllByText(/[A-Z]/i);
  linkElement.forEach((element) => {
    expect(element).toBeInTheDocument();
  })
});

test('GameButtons can be individually disabled', () => {
  const checkLetter = jest.fn()
  render(<GameButtons passedFunction={checkLetter} allDisabled={false}/>);
  const button = screen.getByText(/A/i);
  fireEvent.click(button);
  expect(button).toBeDisabled();
});

test('GameButtons can be all disabled', () => {
  const checkLetter = jest.fn()
  render(<GameButtons passedFunction={checkLetter} allDisabled={true}/>);
  const button = screen.getAllByText(/[A-Z]/i);
  button.forEach((element) => {
    expect(element).toBeDisabled();
  })
});