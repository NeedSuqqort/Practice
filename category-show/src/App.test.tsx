import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Category } from "./features/category/category";
import {Navbar} from "./components/navbar/navbar"

test('check Navigation bar', () => {
  render(<Navbar />);
  const linkElement = screen.getByText("SONY");
  expect(linkElement).toBeInTheDocument();
});
