import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Category } from "./component/category/category";
import {Navbar} from "./component/navbar/navbar"

test('check Navigation bar', () => {
  render(<Navbar />);
  const linkElement = screen.getByText("SONY");
  expect(linkElement).toBeInTheDocument();
});
