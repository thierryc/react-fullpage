/**
 * @class FullpageCount
 */
import React, { PureComponent } from 'react';
import FullpageContext from './FullpageContext';

class FullpageCount extends PureComponent {
  static contextType = FullpageContext;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      style
    } = this.props;
    return (
      <FullpageContext.Consumer>
        {
          ctx => <span style={style}>{ctx.count}</span>
        }
      </FullpageContext.Consumer>
    );
  }
}

export default FullpageCount;
