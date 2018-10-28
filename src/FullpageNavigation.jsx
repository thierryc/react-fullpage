/**
 * @class FullpageNavigation
 */
// eslint-disable-next-line react/react-in-jsx-scope
import React, { PureComponent } from 'react';
import FullpageContext from './FullpageContext';

// TODO: do navigation
// eslint-disable-next-line react/prefer-stateless-function
class FullpageNavigation extends PureComponent {
  static contextType = FullpageContext;

  render() {

    const {style} = this.props;
    const {translateY, pageYOffset, offsetHeight, number, count, toto} = this.context;

    console.log(this.context);

    return (
      <ul style={{
        display: 'block',
        position: 'fixed',
        zIndex: 100,
        top: 0,
        ...style,
      }}>
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
