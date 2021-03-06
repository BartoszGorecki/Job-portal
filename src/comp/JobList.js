import React, {Component} from 'react'
import PropTypes from 'prop-types'
import List from './List'
import JobListElement from './JobListElement'

class JobList extends Component {
  render() {
    const { jobs } = this.props
    return (
      <List items={jobs} itemElement={JobListElement} />
    )
  }
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.string
  }))
}

export default JobList