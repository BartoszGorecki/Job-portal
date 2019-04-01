import React, { Component } from 'react'
import JobList from './JobList'
import Timer from './Timer'
import ResizeDemo from './ResizeDemo'
import Spinner from './Spinner'

class JobListPage extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { jobs, loading } = this.props
        return (
            <div className='joblistpage'>  {loading ? <Spinner /> : (
                <>
                <JobList jobs={jobs} />
                <ResizeDemo />
                <Timer />
            </> )}
            </div>
        )
    }
}
export default JobListPage