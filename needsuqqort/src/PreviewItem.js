import React, { Component } from "react";

class PreviewItem extends Component {
  state = {
    selected: "Select",
  };

  handleClick = () => {
    if (this.state.selected === "Select") {
      this.setState({ selected: "Cancel" });
    } else {
      this.setState({ selected: "Select" });
    }
    this.props.handleSelected(this.props.id);
  };

  render() {
    return (
      <div className="preview-data">
        <p className="code">{this.props.code}</p>
        <p className="price">{this.props.price}</p>
        <button className="select" onClick={this.handleClick}>
          {this.state.selected}
        </button>
      </div>
    );
  }
}

export default PreviewItem;