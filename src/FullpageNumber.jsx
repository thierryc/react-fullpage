/**
 * @class FullpageNumber
 */
import React, { PureComponent } from 'react';
import FullpageContext from './FullpageContext';

class FullpageNumber extends PureComponent {
  static contextType = FullpageContext;

  constructor(props, context) {
    super(props, context);
    //console.log('FullpageNumber constructor', context);
  }

  render() {
    //console.log('FullpageNumber render', this.context);
    return (
      <FullpageContext.Consumer>
        {
          ctx => <span>{ctx.number}</span>
        }
      </FullpageContext.Consumer>
    );
  }
}

export default FullpageNumber;
