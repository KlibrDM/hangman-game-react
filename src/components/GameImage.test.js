import { render, screen } from '@testing-library/react';
import GameImage from './GameImage';

test('GameImage renders the correct image', () => {
  render(<GameImage livesLeft={4}/>);
  const linkElement = screen.getByAltText(/Hangman: 4 lives left/i);
  expect(linkElement).toBeInTheDocument();
});