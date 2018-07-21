/**
 * @class Fullpage
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Section from './FullpageSection';
import Navigation from './FullpageNavigation';

import styles from './styles.css';

class Fullpage extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transitionTiming: PropTypes.number,
    warperStyle: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
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
    navigation: false,
    onChange: null,
    keyboardShortcut: true,
  };

  constructor(props) {
    super(props);
    this.driver = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
    this.scrollTicking = false;
    this.resizeTicking = false;
    this.historyTimeout = null;
    this.children = null;
    this.slides = null;
    this.state = {
      translateY: 0,
      currentSlide: null,
    };
    this.lastKnownScrollPosition = 0;
    this.fullPageHeight = 0;
    this.viewportHeight = 0;
    this.onShow = {};
    this.onHide = {};
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
  }

  componentDidMount() {
    this.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.fullPageHeight = this.fullpageRef.current.clientHeight;
    this.driver.current.style.height = `${this.fullPageHeight}px`;
    this.slides = this.getSlides(this.children);

    this.setState({
      currentSlide: this.slides[0],
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeys);
    }
  }

  componentWillUnmount() {
    // set body height == to 'auto'
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeys);
    }
  }

  getSlides = memoize(
    children => children.filter(
      child => (child.type && child.type === Section),
    ).map((slide, index) => {
      const el = slide.ref.current.ref.current;
      return { slide, el, index };
    }),
  );

  getChildren = memoize(
    children => React.Children.map(children, (child) => {
      const props = {};
      props.udid = this.uuidv4();
      if (child && child.type === Section) {
        if (child.props.onShow && typeof child.props.onShow === 'function') {
          this.subscribeOnShow(props.udid, child);
        }
        if (child.props.onHide && typeof child.props.onHide === 'function') {
          this.subscribeOnHide(props.udid, child);
        }
        props.ref = React.createRef();
      }
      return React.cloneElement(child, props);
    }),
  );

  handleKeys(event) {
    const { keyboardShortcut } = this.props;
    if (!keyboardShortcut) {
      return true;
    }

    if (
      event.keyCode === 33 // pageUp:    33,
      || event.keyCode === 37 // left:      37,
      || event.keyCode === 38 // up:        38,
    ) {
      return (event.shiftKey) ? this.gotoFirst(event) : this.gotoPrevious(event);
    }
    if (
      event.keyCode === 34 // pageDown:  34,
      || event.keyCode === 39 // right:     39,
      || event.keyCode === 40 // down:      40,
    ) {
      return (event.shiftKey) ? this.gotoLast(event) : this.gotoNext(event);
    }
    if (
      event.keyCode === 35 // end:       35,
    ) {
      return this.gotoLast(event);
    }
    if (
      event.keyCode === 36 // home:      36,
    ) {
      return this.gotoFirst(event);
    }
    return true;
  }

  handleScroll() {
    if (!this.scrollTicking) {
      window.requestAnimationFrame(() => {
        const { currentSlide } = this.state;
        const lastKnownScrollPosition = window.pageYOffset || 0;
        const newSlide = this.slides.find(slide => (
          lastKnownScrollPosition < slide.el.offsetTop + (slide.el.offsetHeight * 0.5)));
        this.gotoSlide(newSlide, currentSlide);
        this.lastKnownScrollPosition = lastKnownScrollPosition;
        this.scrollTicking = false;
      });
    }
    this.scrollTicking = true;
  }

  handleResize() {
    if (!this.resizeTicking) {
      window.requestAnimationFrame(() => {
        this.viewportHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        );
        this.fullPageHeight = this.fullpageRef.current.clientHeight;
        this.driver.current.style.height = `${this.fullPageHeight}px`;
        this.resizeTicking = false;
      });
    }
    this.resizeTicking = true;
  }

  subscribeOnShow(uuid, newSlide) {
    this.onShow[uuid] = newSlide;
  }

  subscribeOnHide(uuid, newSlide) {
    this.onHide[uuid] = newSlide;
  }

  gotoFirst(event) {
    const { currentSlide } = this.state;
    event.preventDefault();
    this.gotoSlide(
      this.slides[0],
      currentSlide,
      true,
    );
  }

  gotoLast(event) {
    const { currentSlide } = this.state;
    event.preventDefault();
    this.gotoSlide(
      this.slides[this.slides.length - 1],
      currentSlide,
      true,
    );
  }

  // @keydown( ['up', 'left'] )
  gotoPrevious(event) {
    const { currentSlide } = this.state;
    event.preventDefault();
    this.gotoSlide(
      this.slides[Math.max(0, currentSlide.index - 1)],
      currentSlide,
      true,
    );
  }

  // @keydown( ['down', 'right'] )
  gotoNext(event) {
    const { currentSlide } = this.state;
    event.preventDefault();
    this.gotoSlide(
      this.slides[Math.min(this.slides.length - 1, currentSlide.index + 1)],
      currentSlide,
      true,
    );
  }

  gotoSlide(newSlide, currentSlide, scrollTo = false) {
    const { transitionTiming, onChange } = this.props;

    if (newSlide && currentSlide !== newSlide) {
      // max scroll (this.fullPageHeight - this.viewportHeight)
      const translateY = Math.max(
        (this.fullPageHeight - this.viewportHeight) * -1,
        newSlide.el.offsetTop * -1,
      );

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

      if (scrollTo) {
        window.scrollTo(0, newSlide.el.offsetTop);
      }

      onChange(this.state);
    }
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
    } = this.props;

    this.children = this.getChildren(children);

    const { translateY, previousSlide } = this.state;

    return (
      <div>
        <div style={{ position: 'relative' }} ref={this.driver} />
        <div className={styles.fullpageWarper} style={{ ...warperStyle }} ref={this.warperRef}>
          <div
            className={[styles.fullpage, className].join(', ')}
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
