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
  static propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    itemStyle: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    reverse: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    itemStyle: {},
    reverse: false,
  };

  static contextType = FullpageContext;

  render() {
    const { style, itemStyle, reverse = false } = this.props;
    const {
      number, slides, transitionTiming,
    } = this.context;

    const gotoSlide = (slide) => {
      const { goto } = this.context;
      goto(slide);
    };

    return (
      <div style={{
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        top: 0,
        right: 0,
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        paddingRight: '1em',
        ...style,
      }}
      >
        {
          slides.map((slide, i) => (
            <div
              key={i.toString()}
            >
              <div
                style={{
                  borderRadius: '50%',
                  height: (number === i) ? 14 : 10,
                  width: (number === i) ? 14 : 10,
                  margin: (number === i) ? 3 : 5,
                  backgroundColor: (reverse) ? 'white' : 'black',
                  opacity: (number === i) ? 1 : 0.5,
                  transition: `all ${transitionTiming * 0.5}ms ease-in-out`,
                  ...itemStyle,
                }}
                onClick={() => gotoSlide(slide)}
                onKeyPress={() => gotoSlide(slide)}
                role="button"
                tabIndex="0"
                aria-label={`Slide ${i}`}
              >
                <span style={{
                  display: 'none',
                }}
                >
                  {`${i}`}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default FullpageNavigation;
