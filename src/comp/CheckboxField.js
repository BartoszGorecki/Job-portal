import React, { Component } from 'react'

class CheckboxField extends Component {
  render() {
    const { label, name, onChange, value } = this.props;
    return (
      <div className="checkbox-field">
        <input
          type="checkbox"
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
}

export default CheckboxField