import React, { Component } from 'react'
import CheckboxField from './CheckboxField'

class ConsentInput extends Component {

  render() {
    const { acceptedToS, subscribedToNewsletter, onChange } = this.props
    return (
      <div>
        <CheckboxField
          onChange={onChange}
          name="acceptedToS"
          value={acceptedToS}
          label="Accept to subscribe"
        />
        <CheckboxField
          onChange={onChange}
          name="subscribedToNewsletter"
          value={subscribedToNewsletter}
          label="Send me your newsletter!"
        />
      </div>
    )
  }
}

export default ConsentInput