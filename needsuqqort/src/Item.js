import React, { Component } from "react";

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            inPreview: false,
            selected: false,
        };
    }
    render(){
        return(
            <div className="displayItem">
                <h2 className="name">{this.props.code}</h2>
                <p className="price">{this.props.price}</p>
                <button className="select">Select</button>
                <button className="cancel">Cancel</button>
            </div>
        )
    }
}

export default Item;