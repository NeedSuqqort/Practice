import React from 'react';
import { render, screen } from '@testing-library/react';
import {Category } from './category'
import { waitFor } from "@testing-library/react";

test('check render Catergory component', () => {
  render(<Category/>);
  const CategoryElement = screen.getAllByTestId('category-1')
  waitFor(() => expect(CategoryElement).toBeInTheDocument());
});
