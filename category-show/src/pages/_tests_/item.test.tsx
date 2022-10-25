import { Item } from "../item/item";
import { BrowserRouter as Router } from "react-router-dom";
import {
    Route,
  } from "react-router-dom";
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import renderer from "react-test-renderer";

// const mockHistoryPush = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
//   useLocation: () => ({
//     pathname: "/",
//   }),
// }));

test("check Navigation bar", () => {
    const history = createMemoryHistory();
    const state = { name: 'iphone',price:50 }
    history.push("/", state);
  render(
    <Router >
    <Route path="/item" element={<Item />} />
  </Router>
  );
  const BackButton = screen.getByText("Back");
  expect(BackButton).toBeInTheDocument();
});



test("match snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <Route path="/item" element={<Item />} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
