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
        description: product.description ? this.processString(product.description) : "",
        summary: product.summary ? this.processString(product.summary) : "",
        inStock: product.stock.stockLevel ? product.stock.stockLevel : product.stock.stockLevelStatus.hasOwnProperty("code"),
        handleSelected: this.handleSelected,
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

    processString(str){
        const noises = ["<h5>","<br/>","<span>","</h5>"];
        let processed = str;
        for(let i=0; i<noises.length; i++){
            const re = new RegExp(noises[i],"g");
            const p = noises[i] === "<h5>" ? "" : "\n";
            processed = processed.replace(re,p);
        }
        return processed;
    }

    createItem = (info) => {
      const {id, name, img, code, price, handleSelected, selected} = info;
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
                markedPrice.value} handleSelected={handleSelected} id={id} selected={selected}/>
              )}
            </div>
          );
      }else{
            if(id===this.state.ViewingID){
                const target = this.state.items[id];
                console.log(this.processString(target.description));
                return(
                <div className="details">
                    <img className="detail-img" src={imgsource[0].url} alt="No source" />
                    <p className="detail-price">Price: {markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
                    markedPrice.value}</p>
                    <p className="instock">Stock: {target.inStock ? target.inStock : "No details"}</p>
                    <pre className="desc" >Description: {target.description}</pre>
                    <pre className="summary">Summary: {target.summary}</pre>
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