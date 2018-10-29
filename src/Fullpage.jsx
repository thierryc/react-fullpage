/**
 * @class Fullpage
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

class Fullpage extends PureComponent {
  static contextType = FullpageContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    transitionTiming: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    className: PropTypes.string,
    onChange: PropTypes.func,
    keyboardShortcut: PropTypes.bool,
  };

  static defaultProps = {
    transitionTiming: 700,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    },
    className: '',
    onChange: null,
    keyboardShortcut: true,
  };

  constructor(props, context) {
    super(props, context);
    this.slides = [];
    this.state = {
      slide: null,
      translateY: 0,
      pageYOffset: 0,
      offsetHeight: 0,
      count: 0,
      number: 0,
      resetScroll: false,
    };
    this.ticking = false;
    this.fullPageHeight = 0;
    this.viewportHeight = 0;
    // binds
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.update = this.update.bind(this);
    this.getIndex = this.getIndex.bind(this);
    // handle
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    // refs
    this.driverRef = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
  }

  componentDidMount() {
    this.handleResize();
    this.setState({ slide: this.slides[0] });
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

  getIndex(slide) {
    return this.slides.indexOf(slide);
  }

  subscribe(slide) {
    // add new slide (push)
    const newSlides = [...this.slides, slide];
    // sort slide for top to bottom
    this.slides = newSlides.sort((a, b) => {
      const aTop = a.el.current.offsetTop;
      const bTop = b.el.current.offsetTop;
      return aTop - bTop;
    });
    this.setState({ count: this.slides.length });
    this.ticking = false;
    this.handleResize();
    return slide;
  }

  unsubscribe(slide) {
    this.slides = this.slides.filter(s => s.el !== slide.el);
    this.setState({ count: this.slides.length });
    this.handleResize();
    setTimeout(this.handleScroll, 0);
    return slide;
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const { resetScroll, translateY } = this.state;
        // resetScroll
        if (resetScroll) {
          window.scrollTo(0, translateY * -1);
          this.setState({
            resetScroll: false,
          });
        }

        const pageYOffset = window.pageYOffset || 0;
        const newSlide = this.slides.find((slide) => {
          const el = slide.el.current;
          return pageYOffset < el.offsetTop + (el.offsetHeight * 0.5);
        });

        this.setState({
          pageYOffset,
        });

        this.goto(newSlide);
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  handleResize() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        // update count
        this.viewportHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        );
        this.fullPageHeight = this.fullpageRef.current.clientHeight;
        this.driverRef.current.style.height = `${this.fullPageHeight}px`;
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

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
      event.preventDefault();
      return (event.shiftKey) ? this.first(event) : this.back(event);
    }
    if (
      event.keyCode === 34 // pageDown:  34,
      || event.keyCode === 39 // right:     39,
      || event.keyCode === 40 // down:      40,
    ) {
      event.preventDefault();
      return (event.shiftKey) ? this.last(event) : this.next(event);
    }
    if (
      event.keyCode === 35 // end:       35,
    ) {
      event.preventDefault();
      return this.last(event);
    }
    if (
      event.keyCode === 36 // home:      36,
    ) {
      event.preventDefault();
      return this.first(event);
    }

    return true;
  }

  // TODO: add update methode
  update() {
    return this;
  }

  goto(newSlide, resetScroll = false) {
    console.log('goto');
    const { slide } = this.state;
    const { transitionTiming, onChange } = this.props;
    if (slide !== newSlide) {
      const translateY = Math.max(
        (this.fullPageHeight - this.viewportHeight) * -1,
        newSlide.el.current.offsetTop * -1,
      );

      const { onHide } = slide.props;
      if (onHide && typeof onHide === 'function') {
        setTimeout(() => onHide(translateY), transitionTiming);
      }

      this.setState({
        slide: newSlide,
        number: this.getIndex(newSlide),
        translateY,
        offsetHeight: newSlide.el.current.offsetHeight,
        resetScroll,
      });

      const { onShow } = newSlide.props;
      if (onShow && typeof onShow === 'function') {
        onShow(translateY);
      }
      // call back function
      onChange(this.state);
    }
    return newSlide;
  }

  back() {
    const { number } = this.state;
    const index = Math.max(0, number - 1);
    this.goto(this.slides[index], true);
  }

  next() {
    const { length } = this.slides;
    const { number } = this.state;
    const index = Math.min(length - 1, number + 1);
    this.goto(this.slides[index], true);
  }

  first() {
    this.goto(this.slides[0], true);
  }

  last() {
    this.goto(this.slides[this.slides.length - 1], true);
  }

  render() {
    const {
      children,
      style,
      className,
      transitionTiming,
    } = this.props;

    const {
      translateY, pageYOffset, offsetHeight, number, count,
    } = this.state;

    return (
      <FullpageContext.Provider value={{
        translateY,
        pageYOffset,
        offsetHeight,
        number,
        count,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        update: this.update,
        goto: (slide) => this.goto(slide),
        back: this.back,
        next: this.next,
        getIndex: this.getIndex,
        transitionTiming,
        className,
        style,
        warperRef: this.warperRef,
        fullpageRef: this.fullpageRef,
        slides: this.slides,
      }}
      >
        <div
          name="Driver"
          style={{ position: 'relative' }}
          ref={this.driverRef}
        />
        { children }
      </FullpageContext.Provider>
    );
  }
}

export default Fullpage;
