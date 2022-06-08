
import {Navbar} from "./navbar"
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'

test('check SONY in Navigation bar', () => {
    render(<Navbar />);
    const linkElement = screen.getByText("SONY");
    expect(linkElement).toBeInTheDocument();
  });