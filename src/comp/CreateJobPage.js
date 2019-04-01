import React, { Component } from 'react'
import JobCreationForm from './JobCreationForm'

class CreateJobPage extends Component {
    state = {
        loading: false,
        submissionCompleted: false,
    }
    render() {
        return (
            <div>
                <JobCreationForm />
            </div>
        )
    }
}
export default CreateJobPage