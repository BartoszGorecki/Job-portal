import React, { Component } from 'react'
import TextInputField from './TextInputField'
import ConsentInput from './ConsentInput'
import SelectField from './SelectField'
import { PrimaryButton } from './Button'

const locationOptions = [
    {value: '', label: 'Blank' },
    {value: 'Berlin', label: 'Berlin' },
    {value: 'San Francisco', label: 'San Francisco' },
    {value: 'London', label: 'London' },
    {value: 'Austin', label: 'Austin' },
    {value: 'Tokyo', label: 'Tokyo' },
    {value: 'Barcelona', label: 'Barcelona' },
    {value: 'Other', label: 'Other' }
  ]

const isFormDataValid = state => (
    state.title.length >= 10 &&
    state.company.length > 3 &&
    state.salary.length > 3 &&
    state.acceptedToS
)

class JobCreationForm extends Component {

    state = {
        title: '',
        company: '',
        salary: '',
        isRemoteFriendly: false,
        location: '',
        acceptedToS: false,
        subscribedToNewsletter: false,
        titleError: false,
        companyError: false,
        salaryError: false
    }

    handleChange = e => {
        const { type, name, value, checked } = e.target
        if (type === 'checkbox') {
          this.setState({ 
              [name]: checked 
            })
        } else {
          this.setState({ 
              [name]: value 
            })
        }
        if (name === 'title' && value.length >= 10) {
            this.setState({
                titleError: false
            })
        }
        if (name === 'company' && value.length >= 3) {
            this.setState({
                companyError: false
            })
        }
        if (name === 'salary' && value.length >= 3) {
            this.setState({
                salaryError: false
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state)
    }

    handleBlur = e => {
        const { name } = e.target
        if (name === 'title') {
            this.setState({ 
                titleError: this.state.title.length < 10 
            })
        }
        if (name === 'company') {
            this.setState({
                companyError: this.state.company.length < 3
            })
        }   
        if (name === 'salary') {
            this.setState({
                salaryError: this.state.salary.length < 3
            })
        }
    }

    render() {
        let enabled = isFormDataValid(this.state)
        const { title, company, salary, location, acceptedToS, subscribedToNewsletter } = this.state
        return (
            <form
                className="job-form"
                onSubmit={this.handleSubmit}
            >
                <TextInputField 
                    name='title'
                    label='Title'
                    onChange={this.handleChange}
                    value={title}
                    required={true}
                    onBlur={this.handleBlur}
                />
                {this.state.titleError &&
                    <p style={{color: 'red'}}>
                        Should be at least 10 characters long.
                    </p>}
                <TextInputField 
                    name='company'
                    label='Company'
                    onChange={this.handleChange}
                    value={company}
                    required={true}
                    onBlur={this.handleBlur}
                />
                {this.state.companyError &&
                    <p style={{color: 'red'}}>
                        Must not be empty.
                    </p>}
                <TextInputField 
                    name='salary'
                    label='Salary'
                    onChange={this.handleChange}
                    value={salary}
                    required={true}
                    onBlur={this.handleBlur}
                />
                {this.state.salaryError &&
                    <p style={{color: 'red'}}>
                        Must not be empty.
                    </p>}
                <ConsentInput
                    onChange={this.handleChange}
                    acceptedToS={acceptedToS}
                    subscribedToNewsletter={subscribedToNewsletter}
                />
                <SelectField 
                    options={locationOptions}
                    onChange={this.handleChange}
                    value={location}
                />
                <PrimaryButton
                    disabled={!enabled}
                >
                    Submit
                </PrimaryButton>
            </form>
        )
    }
}

export default JobCreationForm