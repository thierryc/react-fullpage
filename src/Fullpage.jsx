/**
 * @class Fullpage
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './FullpageSection';
import Navigation from './FullpageNavigation';

import styles from './styles.css';

class Fullpage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transitionTiming: PropTypes.number,
    warperStyle: PropTypes.objectOf(PropTypes.string),
    style: PropTypes.objectOf(PropTypes.string),
    className: PropTypes.string,
    navigation: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    transitionTiming: 700,
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    warperStyle: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    },
    className: '',
    navigation: true,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.driver = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
    this.ticking = false;
    this.timeout = null;
    this.children = null;
    this.slides = null;
    this.state = {
      translateY: 0,
      currentSlide: null,
    };
    this.lastKnownScrollPosition = 0;
    this.onShow = {};
    this.onHide = {};
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount() {
    this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`;
    // const children = Array.from(this.fullpageRef.current.children)
    // this.slides = children.filter(child => child.hasAttribute('isslide'))
    this.slides = this.children.filter(child => child.type === Section).map((slide, index) => {
      const el = slide.ref.current.ref.current;
      return { slide, el, index };
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    // set body height == to 'auto'
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const { transitionTiming } = this.props;
        const { currentSlide } = this.state;
        const lastKnownScrollPosition = window.pageYOffset || 0;

        const newSlide = this.slides.find(slide => (
          lastKnownScrollPosition < slide.el.offsetTop + slide.el.offsetHeight * 0.5));

        if (newSlide && currentSlide !== newSlide) {
          const translateY = newSlide.el.offsetTop * -1;
          const previousSlide = currentSlide;
          this.setState({
            previousSlide,
            currentSlide: newSlide,
            translateY,
          });

          if (previousSlide) {
            const { udid: previousSlideUdid = null } = previousSlide.slide.props;
            if (previousSlideUdid && this.onHide[previousSlideUdid]) {
              const { onHide = null } = this.onHide[previousSlideUdid].props;
              if (onHide) {
                setTimeout(() => onHide(translateY), transitionTiming);
              }
            }
          }

          const { udid: newSlideUdid = null } = newSlide.slide.props;
          if (newSlideUdid && this.onShow[newSlideUdid]) {
            const { onShow = null } = this.onShow[newSlideUdid].props;
            if (onShow) {
              onShow(translateY);
            }
          }

          // this.state.onChange(this.state);
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => this.updateHistory(newSlide), transitionTiming);
        }
        this.lastKnownScrollPosition = lastKnownScrollPosition;
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  handleResize() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`;
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  updateHistory(newSlide) {
    console.log(newSlide);
  }

  subscribeOnShow(uuid, newSlide) {
    this.onShow[uuid] = newSlide;
  }

  subscribeOnHide(uuid, newSlide) {
    this.onHide[uuid] = newSlide;
  }


  /* eslint-disable */
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0,
        v = (c === 'x') ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  /* eslint-enable */

  render() {
    const {
      children,
      navigation,
      style,
      warperStyle,
      className,
      transitionTiming,
      onChange,
    } = this.props;

    this.children = React.Children.map(children, (child) => {
      const props = {};
      props.udid = this.uuidv4();
      if (child.type === Section) {
        if (child.props.onShow && typeof child.props.onShow === 'function') {
          this.subscribeOnShow(props.udid, child);
        }
        if (child.props.onHide && typeof child.props.onHide === 'function') {
          this.subscribeOnHide(props.udid, child);
        }
        props.ref = React.createRef();
      }
      return React.cloneElement(child, props);
    });

    const { translateY, previousSlide } = this.state;

    return (
      <div>
        <div style={{ position: 'relative' }} ref={this.driver} />
        <div className={styles.fullpageWarper} style={{ ...warperStyle }} ref={this.warperRef}>
          <div
            className={styles.fullpage}
            style={{
              transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
              ...style,
              transform: `translate3D(0, ${(translateY)}px, 0)`,
            }}
            ref={this.fullpageRef}
          >
            { this.children }
            { navigation && <Navigation data={children} previousSlide={previousSlide} /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Fullpage;
