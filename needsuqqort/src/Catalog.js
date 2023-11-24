import React, { Component } from "react";
import PreviewItem from "./PreviewItem";
import localdata from './data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catalog.css'

class Catalog extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
            viewingDetail: false,
            ViewingID: null,
        }
        this.source = null;
    }
    
    // start by reading data from the json file
    componentDidMount(){
      const url = 'https://raw.githubusercontent.com/NeedSuqqort/Practice/main/data.json';
      this.fetchData(this.loadfromlocal,url);
    }

    // error handling: if the file is missing, load it from the local copy
    loadfromlocal = (error) => {
      if(error){
        console.log('Request failed:', error, '\n data will be now loaded from local json');
        this.buildAllItems(localdata);
      }
    }

    // fetch data from data.json in GitHub
    fetchData(callback,url){
      const xhr = new XMLHttpRequest();
      xhr.open('GET',url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.buildAllItems(JSON.parse(xhr.responseText));
        }
      }
    
      xhr.onerror = function(error) {
        callback(error);
      };
      xhr.send();
    }
    
    // read data from data.json, and storing all products with necessary details into the array
    buildAllItems(source){
      if(!source.hasOwnProperty("products")){
          return;
      }
      const items = source.products.map((product, index) => ({
          name: product.name ? product.name : this.findName(product),
          id: index,
          image: this.searchForImg(product),
          code: product.code ? product.code : "",
          price: product.price ? product.price : product.priceList['0'],
          previewing: false,
          selected: false,
          description: product.hasOwnProperty("description") ? this.processString(product.description) : "",
          summary: product.hasOwnProperty("summary") ? this.processString(product.summary) : "",
          inStock: product.stock.hasOwnProperty("stockLevel") ? product.stock.stockLevel 
          : (product.stock.stockLevelStatus.hasOwnProperty("code") ? product.stock.stockLevelStatus.code : null),
          handleSelected: this.handleSelected,
      }));
      this.setState({items});
    }

    findName(source){
        const target = source.description ? source.description : source.summary;
        if(target){
            const parser = new DOMParser();
            const str = parser.parseFromString(target,'text/html');
            const section = str.querySelector('p');
            return section.firstChild.textContent.trim();
        }
        return null;
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
        const noises = new RegExp(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/,"g");
        return str.replace(noises,"\n");
    }

    clearall(){
        const updatedItems = this.state.items.map((item) => {
            return {...item, selected: false};
        })
        this.setState({items: updatedItems});
    }

    // responsible to render the whole page, and handles the swapping to the detail page when required
    createItem = (info) => {
      const {id, name, image, code, price, handleSelected, selected} = info;
      const markedPrice = price ? price : null;
      const imgsource = image ? image : null;

      if(!markedPrice||!imgsource){
          return;
      }

      if(!this.state.viewingDetail){
        return (
            <div className="displayitem" key={id} style={{backgroundColor: this.state.items[id].selected ? '#BBBBBB' : '#F2F2F2'}}>
              <div className="frame">
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
            </div>
          );
      }else{
            if(id===this.state.ViewingID){
                const target = this.state.items[id];
                return(
                <div className="details">
                    <img className="detail-img" src={target.image[0]} onError={() => this.findImg(id)} alt=""/>
                    <p className="detail-price">
                      Price: {markedPrice.hasOwnProperty("formattedValue") ? markedPrice.formattedValue :
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
      return(
        <div>
          <div className="d-flex justify-content-center"
            onClick={() => this.clearall()}>
            {!this.state.viewingDetail && <button className="clearall">Clear all</button>}
          </div>          
          <div className="catalog">
            {this.state.items.map((item) => this.createItem(item))}
          </div>
        </div>
      );
    }
  }
  
  export default Catalog;