import { render, screen } from '@testing-library/react';
import GameWord from './GameWord';

test('GameWord renders word given', () => {
  const wordShown = ["A","B","C"];
  render(<GameWord word={wordShown} />);
  const linkElement = screen.getAllByText(/A|B|C/i);
  const linkElement2 = screen.queryAllByText(/[D-Z]/i);
  linkElement.forEach((element) => {
    expect(element).toBeInTheDocument();
  })
  linkElement2.forEach((element) => {
    expect(element).not.toBeInTheDocument();
  })
});