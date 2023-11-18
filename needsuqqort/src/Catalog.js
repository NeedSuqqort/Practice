import React, { Component } from 'react';
import data from './data.json';
import './Catalog.css'

class Catalog extends Component {
  state = {
    selected: [],
    items: [],
    inDetails: false,
    detail_index: "",
    detail_description: "",
    detail_price: "",
    detail_stock: "",
    detail_image: "",
  }

  componentDidMount() {
    this.buildAllItems();
  }

  buildAllItems() {
    const items = data.products.map((product, index) => ({
      id: index,
      img: product.images,
      code: product.code,
      price: product.price,
    }));

    this.setState({items});
  }

  createItem = (info) => {
    const name = info.code;
    const markedPrice = info.price;
    const imgsource = info.img ? info.img : null;

    if(!name||!markedPrice||!imgsource)
        return;

    return (
      <div className="displayitem" key={info.id+1}>
        <img className="img" src={imgsource['0']['url']} alt="No source" />
        <h2 className="name">{name?name:"Unknown"}</h2>
        <p className="price">{markedPrice.formattedValue?markedPrice.formattedValue:"Unknown"}</p>
        <button className="select">Select</button>
        <button className="cancel">Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.items.map((item) => this.createItem(item))}
      </div>
    );
  }
}

export default Catalog;