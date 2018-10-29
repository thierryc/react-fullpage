/**
 * @class FullpageNumber
 */
import React, { PureComponent } from 'react';
import FullpageContext from './FullpageContext';

class FullpageNumber extends PureComponent {
  static contextType = FullpageContext;

  render() {
    // console.log('FullpageNumber render', this.context);
    return (
      <FullpageContext.Consumer>
        {
          ctx => <span>{`${ctx.number + 1}`}</span>
        }
      </FullpageContext.Consumer>
    );
  }
}

export default FullpageNumber;
