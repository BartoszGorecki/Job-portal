import React, { Component } from 'react'

class TextInputField extends Component {
    render() {
        const { label, name, onChange, required, onBlur } = this.props
        return (
            <div className='input-field'>
                <label 
                    className='label'
                    htmlFor={name}>
                    {label}
                </label>
                <input 
                    id={name}
                    name={name}
                    type='text'
                    className='text-input'
                    onChange={onChange}
                    required={required}
                    onBlur={onBlur}
                />
            </div>
        )
    }
}
export default TextInputField