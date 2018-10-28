/**
 * @class FullpageNavigation
 */
// eslint-disable-next-line react/react-in-jsx-scope
import React, { PureComponent } from 'react';
import FullpageContext from './FullpageContext';

// TODO: do navigation
// eslint-disable-next-line react/prefer-stateless-function
class FullpageNavigation extends PureComponent {
  render() {
    return (
      <FullpageContext.Consumer>
        { ctx => (
          <li>
            1,2,3
            {' '}
            {ctx.count}
          </li>
        )}
      </FullpageContext.Consumer>
    );
  }
}

export default FullpageNavigation;
