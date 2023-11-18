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
    
    // start by reading data from the json file
    componentDidMount() {
      this.buildAllItems();
    }
    
    // read data from data.json, and storing all products with necessary details into the array
    buildAllItems() {
      const items = data.products.map((product, index) => ({
          name: product.name,
          id: index,
          image: this.searchForImg(product),
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

    // find all image URLs available for the product, returns an array of URLs
    searchForImg(source){
        let res = [];
        if((source.images)){
            if(source.images[0]){
              res.push(source.images[0].url.endsWith("jpg") ? source.images[0].url : "");
            }
        }else if(source.hasOwnProperty("variantOptions")){
            source.variantOptions.map((item)=>{ 
                if(item.hasOwnProperty("mainImage")){
                    res.push(item.mainImage.url.endsWith("jpg") ? item.mainImage.url : "");
                }else if(item.hasOwnProperty("swatchImage")){
                    res.push(item.swatchImage.url.endsWith("jpg") ? item.swatchImage.url : "");
                }
                return res;
            })
        }

        return res;
    }

    // invoked when an image URL fails, remove the failed URL for the next one.
    findImg = (id) => {
      const updatedItems = this.state.items.map((item) => {
        if (item.id === id) {
            // if no URLs are available, simply return null to tell there is no image source
            if(item.image.length===0){
              return { ...item, image:[null] };
            }else{
              const img = item.image.slice(1);
              return { ...item, img };
            }
          }
          return item;
      });
      this.setState({ items: updatedItems });
    };

    // invoked when the "Preview" button is clicked
    handlePreviewClick = (id) => {
      const updatedItems = this.state.items.map((item) => {
        if (item.id === id) {
          return { ...item, previewing: !item.previewing };
        }
        return item;
      });
      this.setState({ items: updatedItems });
    };

    // invoked when the "Selected" button is clicked
    handleSelected = (id) => {
        const updatedItems = this.state.items.map((item) => {
            if (item.id === id) {
              return { ...item, selected: !item.selected };
            }
            return item;
          });
          this.setState({ items: updatedItems });
    }

    // changes the state to viewing detail, which renders the details of the product
    handleViewDetail = (id) => {
        this.setState({viewingDetail: true,ViewingID: id});
    }

    // return to the main catalog
    goBackToCatalog = () => {
        this.setState({viewingDetail: false, ViewingID: null});

    }

    // process the summary and description strings, remove the unnecessary tags
    processString(str){
        const noises = ["<h5>","<br/>","<span>","</h5>","<p>","</p>","</span>"];
        let processed = str;
        for(let i=0; i<noises.length; i++){
            const re = new RegExp(noises[i],"g");
            const p = (noises[i] === "<h5>" ? "" : "\n");
            processed = processed.replace(re,p);
        }
        return processed;
    }

    // responsible to render the whole page, and handles the swapping to the detail page when required
    createItem = (info) => {
      const {id, name, image, code, price, handleSelected, selected} = info;
      const markedPrice = price;
      const imgsource = image ? image : null;

      if (!markedPrice || !imgsource){
            return null;
      }

      if(!this.state.viewingDetail){
        return (
            <div className="displayitem" key={id} style={{backgroundColor: this.state.items[id].selected ? '#BBBBBB' : '#F2F2F2'}}>
              <img className="img" 
              src={imgsource[0]}
              alt="No source" />
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
                return(
                <div className="details">
                    <img className="detail-img" src={target.image[0]} onError={() => this.findImg(id)} alt=""/>
                    <p className="detail-price">Price: {markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
                    markedPrice.value}</p>
                    <p className="instock">Stock: {target.inStock ? target.inStock : "No details"}</p>
                    <pre className="desc" >Description:<br/>{target.description}</pre>
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