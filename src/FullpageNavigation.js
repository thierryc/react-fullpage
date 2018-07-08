/**
 * @class FullpageNavigation
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FullpageNavigation extends Component {
  static propTypes = {
    text: PropTypes.node
  }

  render() {
    const {
      children
    } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}

export default FullpageNavigation
