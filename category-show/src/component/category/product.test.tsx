import React, { useState } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { Product } from "./product";
import { waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";


afterEach(() => {
  cleanup();
});

test("match snapshot", () => {
  const setStateMock = jest.fn();
  const useStateMock: any = (useState: any) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  const item = {
    index: 0,
    name: "iphone",
    description: "iphone is good",
    variantOptions: [
      {
        mainImage: [
          {
            url: "https://images.hktv-img.com/images/HKTV/18230/ST_Sony_Xperia1_64_JP_White_main_44326896_20200626131116_01_300.jpg",
          },
        ],
      },
    ],
  };
  const index = 0;

  const selectedItems = {};
  const setSelectedItems = jest.fn();
  const selecthook: any = [selectedItems, setSelectedItems];

  const tree = renderer
    .create(
      <Router>
        <Product item={item} index={index} selecthook={selecthook} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});




test("check render product component", () => {
  const item = {
    index: 0,
    name: "iphone",
    description: "iphone is good",
    variantOptions: [
      {
        mainImage: [
          {
            url: "https://images.hktv-img.com/images/HKTV/18230/ST_Sony_Xperia1_64_JP_White_main_44326896_20200626131116_01_300.jpg",
          },
        ],
      },
    ],
  };
  const index = 0;
  const selectedItems = {};
  const setSelectedItems = jest.fn();
  const selecthook: any = [selectedItems, setSelectedItems];
  render(
    <Router>
      <Product item={item} index={index} selecthook={selecthook} />
    </Router>
  );
  const ProductElement = screen.getAllByTestId("product-0");
  waitFor(() => expect(ProductElement).toBeInTheDocument());
});

describe("test product preview button", () => {
  test("useState setState is called", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);


    const item = {
      index: 0,
      name: "iphone",
      description: "iphone is good",
      variantOptions: [
        {
          mainImage: [
            {
              url: "https://images.hktv-img.com/images/HKTV/18230/ST_Sony_Xperia1_64_JP_White_main_44326896_20200626131116_01_300.jpg",
            },
          ],
        },
      ],
    };
    const index = 0;

    const selectedItems = {};
    const setSelectedItems = jest.fn();
    const selecthook: any = [selectedItems, setSelectedItems];

    render(
      <Router>
        <Product item={item} index={index} selecthook={selecthook} />
      </Router>
    );
    const previewButton = screen.getByText("Preview");
    fireEvent.click(previewButton);
    const SelectButton = screen.getByText("Select");
    fireEvent.click(SelectButton);
    waitFor(() => expect(setStateMock).toHaveBeenLastCalledWith(true));
  });
});

describe("test product Details button", () => {
  test("useState setState is called", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const item = {
      index: 0,
      name: "iphone",
      description: "iphone is good",
      variantOptions: [
        {
          mainImage: [
            {
              url: "https://images.hktv-img.com/images/HKTV/18230/ST_Sony_Xperia1_64_JP_White_main_44326896_20200626131116_01_300.jpg",
            },
          ],
        },
      ],
    };
    const index = 0;

    const selectedItems = {};
    const setSelectedItems = jest.fn();
    const selecthook: any = [selectedItems, setSelectedItems];

    render(
      <Router>
        <Product item={item} index={index} selecthook={selecthook} />
      </Router>
    );
    const detailsButton = screen.getByText("Details");
    fireEvent.click(detailsButton);
    waitFor(() => expect(setStateMock).toHaveBeenLastCalledWith(true));
  });
});



// describe("test product Setect button", () => {

//   test("useState setState is called", () => {


    
//     const item = {
//       index: 0,
//       name: "iphone",
//       description: "iphone is good",
//       variantOptions: [
//         {
//           mainImage: [
//             {
//               url: "https://images.hktv-img.com/images/HKTV/18230/ST_Sony_Xperia1_64_JP_White_main_44326896_20200626131116_01_300.jpg",
//             },
//           ],
//         },
//       ],
//     };
//     const index = 0;

//     const selectedItems = {};
//     const setSelectedItems = jest.fn();
//     const selecthook: any = [selectedItems, setSelectedItems];
//     let mockisPreviewShown = true
//     render(
//       <Router>
//         <Product item={item} index={index} selecthook={selecthook} />
//       </Router>
//     );
    
//     const SelectButton = screen.getByText("Select");
//     waitFor(() => expect(SelectButton).toBeInTheDocument());
//   });
// });