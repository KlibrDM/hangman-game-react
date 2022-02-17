import { render, screen } from '@testing-library/react';
import GameResults from './GameResults';

test('GameResults renders when needed', () => {
  render(<GameResults display={true} word={"Test"}/>);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});

test('GameResults does not render when not needed', () => {
  render(<GameResults display={false} word={"Test"}/>);
  const linkElement = screen.queryByText(/Test/i);
  expect(linkElement).not.toBeInTheDocument();
});

test('GameResults renders correctly', () => {
  render(<GameResults display={true} results={"win"} word={"Test"} />);
  const linkElement = screen.getByText(/Congratulations/i);
  const linkElement2 = screen.getByText(/The word was: Test/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});