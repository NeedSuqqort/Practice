# Practice
React Basic Practice

Create a new branch under your name on the newest release tag.
Feel free to commit to your own branch(local/origin), but DO NOT merge your branch to main.



Layout and styles are free of requirements, this practice focuses on react only.
You may use CRA (Create React App) for this tutorial
Please use React hooks
A demo video file is provided for reference only, NOT required to be the same.



Requirement:

This is a SPA (Single page application)

Main page - show products with image and title, implement pagination (3 - 4 products per page)
- A Preview button: toggle show more details, example: production ID (H6588001_S_Sony_Xperia_1_Black) and price
- A Details button: go to details page
- A Select function:  Clicking the product will marked it as selected, may use any kind of indicators as you like.
- A simple selected list : showing which products are selected in real time, include a deselect button to clear all selected items.

Details page - Show more indepth details, example :  product price, image, description and status
- Back button: back to main page

Others
- Use ajax to fetch data  (fetch local data.json)
- handle empty data, fail responses. App should not crash with any missing data.
- Do not reload the page
- pagination logic should not reset selected products
