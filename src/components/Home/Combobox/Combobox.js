import React from 'react';


class Combobox extends React.Component {

  render() {
    return (
      <>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select value={this.props.value} id={this.props.id} onChange={this.props.onChange} className={this.props.className}>
          <option value="0">Select {this.props.label}</option>
          {this.props.options}
        </select>

      </>
    );
  }
}

export default Combobox;
