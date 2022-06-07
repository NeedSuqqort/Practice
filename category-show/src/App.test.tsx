import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('check pre', () => {
  render(<App />);
  const linkElement = screen.getByText(/SONY/i);
  expect(linkElement).toBeInTheDocument();
});
