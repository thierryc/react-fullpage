/**
 * @class FullpageNavigation
 */
// eslint-disable-next-line react/react-in-jsx-scope
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

// TODO: do navigation
// eslint-disable-next-line react/prefer-stateless-function
class FullpageNavigation extends PureComponent {
  static contextType = FullpageContext;

  static propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
  };

  static defaultProps = {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    },
  };

  render() {
    const { style } = this.props;
    const {
      translateY, pageYOffset, offsetHeight, number, count,
    } = this.context;

    return (
      <ul style={{
        position: 'fixed',
        zIndex: 100,
        top: -10,
        ...style,
        display: 'none',
      }}
      >
        {' translateY '}
        {translateY}
        {' pageYOffset '}
        {pageYOffset}
        {' offsetHeight: '}
        {offsetHeight}
        {' number '}
        {number}
        {' count '}
        {count}
      </ul>
    );
  }
}

export default FullpageNavigation;
