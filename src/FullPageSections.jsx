/**
 * @class FullPageSections
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

class FullPageSections extends PureComponent {
  static contextType = FullpageContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
  };

  static defaultProps = {
    className: '',
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
  };

  render() {
    const {
      children,
      style,
      className,
    } = this.props;
    return (
      <FullpageContext.Consumer>
        {
          ctx => (
            <div
              name="Warper"
              style={ctx.style} // from
              ref={this.warperRef}
            >
              <div
                name="Inner"
                className={className}
                style={{
                  transition: `transform ${ctx.transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
                  ...style,
                  transform: `translate3D(0, ${(ctx.translateY)}px, 0)`,
                }}
                ref={ctx.fullpageRef}
              >
                { children }
              </div>
            </div>
          )
        }
      </FullpageContext.Consumer>
    );
  }
}

export default FullPageSections;
