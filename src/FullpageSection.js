/**
 * @class FullpageSection
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FullpageSection extends Component {
  static propTypes = {
    text: PropTypes.node
  }

  render() {
    const {
      children,
      height = '100vh',
      style = {},
      className = '',
    } = this.props

    return (
      <section className={className} style={{ height, ...style }} isslide={'true'}>
        {children}
      </section>
    )
  }
}

export default FullpageSection
