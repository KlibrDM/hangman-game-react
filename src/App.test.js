import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders Hangman', () => {
  render(<App />);
  const linkElement = screen.getByText(/HANGMAN/i);
  expect(linkElement).toBeInTheDocument();
});