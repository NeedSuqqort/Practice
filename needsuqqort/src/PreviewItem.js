import React, { Component } from "react";

class PreviewItem extends Component {
  state = {
      selected: this.props.selected,
  };

  handleClick = () => {
    this.setState({ selected: !this.selected });
    this.props.handleSelected(this.props.id);
  };

  render() {
    return (
      <div className="preview-data">
        <p className="code">{this.props.code}</p>
        <p className="price">{this.props.price}</p>
        <button className="select" onClick={() => this.handleClick()}>
          {this.props.selected ? "Cancel" : "Select"}
        </button>
      </div>
    );
  }
}

export default PreviewItem;