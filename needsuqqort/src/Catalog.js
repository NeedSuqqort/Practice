import React, { Component } from "react";
import PreviewItem from "./PreviewItem";
import data from './data.json'
import './Catalog.css'

class Catalog extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: [],
            items: [],
        }
    }
  
    componentDidMount() {
      this.buildAllItems();
    }
  
    buildAllItems() {
      const items = data.products.map((product, index) => ({
        name: product.name,
        id: index,
        img: product.images,
        code: product.code,
        price: product.price ? product.price : product.priceList['0'],
        previewing: false,
        selected: false,
        backgroundColor: this.handleSelected,
      }));
      this.setState({ items });

    }
  
    handlePreviewClick = (id) => {
      const updatedItems = this.state.items.map((item) => {
        if (item.id === id) {
          return { ...item, previewing: !item.previewing };
        }
        return item;
      });
      this.setState({ items: updatedItems });
    };

    handleSelected = (id) => {
        const {items }= this.state;
        const updated = [...items];
        updated[id] = {...updated[id],selected: !updated[id].selected};
        this.setState({items: updated});
    }
  
    createItem = (info) => {
      const { id, name, img, code, price, backgroundColor} = info;
      const markedPrice = price;
      const imgsource = img ? img : null;

      if (!name || !markedPrice || !imgsource){
            return null;
      }

  
      return (
        <div className="displayitem" key={id} style={{backgroundColor: this.state.items[id].selected ? 'red' : 'grey'}}>
          <img className="img" src={imgsource[0].url} alt="No source" />
          <p className="name">{name ? name : "Unknown"}</p>
          <button className="preview" onClick={() => this.handlePreviewClick(id)}>Preview</button>
          <button className="Details">Details</button>
          {info.previewing && (
            <PreviewItem code={code ? code : null} price={markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
            markedPrice.value} handleSelected={backgroundColor} id={id}/>
          )}
        </div>
      );
    };

    render() {
      return <div>{this.state.items.map((item) => this.createItem(item))}</div>;
    }
  }
  
  export default Catalog;