import React, { Component } from "react";
import PreviewItem from "./PreviewItem";
import data from './data.json'
import './Catalog.css'

class Catalog extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
            viewingDetail: false,
            ViewingID: null,
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
        description: product.description,
        inStock: product.stock.stockLevel ? product.stock.stockLevel : product.stock.stockLevelStatus.hasOwnProperty("code"),
        backgroundColor: this.handleSelected,
      }));
      this.setState({items});

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
        const updatedItems = this.state.items.map((item) => {
            if (item.id === id) {
              return { ...item, selected: !item.selected };
            }
            return item;
          });
          this.setState({ items: updatedItems });
    }

    handleViewDetail = (id) => {
        this.setState({viewingDetail: true,ViewingID: id});

        console.log(this.state);
    }

    goBackToCatalog = () => {
        this.setState({viewingDetail: false, ViewingID: null});

    }

    createItem = (info) => {
      const { id, name, img, code, price, backgroundColor, selected} = info;
      const markedPrice = price;
      const imgsource = img ? img : null;

      if (!markedPrice || !imgsource){
            return null;
      }

      if(!this.state.viewingDetail){
        return (
            <div className="displayitem" key={id} style={{backgroundColor: this.state.items[id].selected ? '#BBBBBB' : '#F2F2F2'}}>
              <img className="img" src={imgsource[0].url} alt="No source" />
              <p className="name">{name ? name : "Unknown"}</p>
              <button className="preview" onClick={() => this.handlePreviewClick(id)}>Preview</button>
              <button className="Details" onClick={() => this.handleViewDetail(id)}>Details</button>
              {info.previewing && (
                <PreviewItem code={code ? code : null} price={markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
                markedPrice.value} handleSelected={backgroundColor} id={id} selected={selected}/>
              )}
            </div>
          );
      }else{
            if(id===this.state.ViewingID){
                const target = this.state.items[id];
                console.log(target);
                return(
                <div className="details">
                    <img className="detail-img" src={imgsource[0].url} alt="No source" />
                    <p className="detail-price">{markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
                    markedPrice.value}</p>
                    <p className="instock">Stock: {target.inStock ? target.inStock : "No details"}</p>
                    <p className="desc">{target.description}</p>
                    <button className="goBackToCatalog" onClick={() => this.goBackToCatalog()}>Back</button>
                </div>
                )
            }
      }
    };

    render() {
      return <div>{this.state.items.map((item) => this.createItem(item))}</div>;
    }
  }
  
  export default Catalog;