import React from 'react'
import PropTypes from 'prop-types'
import JobListElement from './JobListElement'

const List = ({ items, itemElement: Item }) =>
  <div>
    {items.map(item =>
      <JobListElement
        {...item}
        key={item.id}
      />
    )}
  </div>

List.propTypes = {
  items: PropTypes.array.isRequired
}

export default List