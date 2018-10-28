/**
 * @class FullpageCount
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

class FullpageCount extends PureComponent {
  static contextType = FullpageContext;

  static propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const {
      style,
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
