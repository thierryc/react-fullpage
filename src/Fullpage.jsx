/**
 * @class Fullpage
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Section from './FullpageSection';
import Navigation from './FullpageNavigation';
import FullpageContext from './FullpageContext';
import styles from './styles.css';

class Fullpage extends PureComponent {
  static contextType = FullpageContext;

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
    keyboardShortcut: PropTypes.bool,
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

  constructor(props, context) {
    super(props, context);
    this.slides = [];
    this.state = {
      slide: null,
      translateY: 0,
      count: 0,
      number: 0,
    };
    this.ticking = false;
    this.lastKnownScrollPosition = 0;
    this.fullPageHeight = 0;
    this.viewportHeight = 0;
    // binds
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.update = this.update.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    // refs
    this.driverRef = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
  }

  componentDidMount() {
    this.update();
    this.setState({ slide: this.slides[0] });
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeys);
    }
  }

  componentDidUpdate() {
    this.update();
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

  subscribe(slide){
    const newSlides = [...this.slides, slide];
    this.slides = newSlides.sort( (a,b) => {
      const aTop = a.el.current.offsetTop;
      const bTop = b.el.current.offsetTop;
      return aTop - bTop;
    });
    this.setState({ count: this.slides.length });
    this.update(slide);
    return slide;
  }

  unsubscribe(slide){
    this.slides = this.slides.filter(s => s.el !== slide.el);
    this.setState({ count: this.slides.length });
    this.update(slide);
    return slide;
  }

  handleKeys(event) {

  }

  handleScroll(e) {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        if (this.state.resetScroll) {
          console.log(this.state.translateY * -1);
          window.scrollTo(0, this.state.translateY * -1);
          this.setState({
            resetScroll: false,
          });
        }
        const lastKnownScrollPosition = window.pageYOffset || 0;
        const newSlide = this.slides.find(slide => {
          const el = slide.el.current;
          return lastKnownScrollPosition < el.offsetTop + (el.offsetHeight * 0.5)
        });
        this.lastKnownScrollPosition = lastKnownScrollPosition;
        this.goto(newSlide);
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  handleResize() {
    this.update();
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

  update(slide){
    this.slides = this.slides.map((slide, index) => {
      slide.index = index;
      return slide;
    });
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
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
    return true;
  }

  goto(slide, resetScroll = false) {
    const { transitionTiming, onChange } = this.props;
    if (this.state.slide !== slide) {

      const translateY = Math.max(
        (this.fullPageHeight - this.viewportHeight) * -1,
        slide.el.current.offsetTop * -1,
      );

      const { onHide: previousSlideOnHide = null } = this.state.slide.props;
      if (previousSlideOnHide && typeof previousSlideOnHide === 'function') {
        setTimeout(() => previousSlideOnHide(translateY), transitionTiming);
      }

      console.log(resetScroll);

      this.setState({
        slide: slide,
        number: slide.index,
        translateY,
        resetScroll
      });

      const { onShow: slideOnShow = null } = slide.props;
      if (slideOnShow && typeof slideOnShow === 'function') {
        slideOnShow(translateY);
      }
      //onChange(this.state);
    }
    return slide;
  }

  back(){
    const index = Math.max(0, this.state.slide.index - 1);
    this.goto(this.slides[index], true);
  }

  next(){
    const index = Math.min(this.slides.length - 1, this.state.slide.index + 1);
    this.goto(this.slides[index], true);
  }

  first(){
    this.goto(this.slides[0], true);
  }

  last(){
    this.goto(this.slides[this.slides.length - 1], true);
  }

  render() {
    const {
      children,
      style,
      warperStyle,
      className,
      transitionTiming,
    } = this.props;

    const { translateY } = this.state;

    return (
      <FullpageContext.Provider value={{
        number: this.state.number,
        count: this.state.count,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        update: this.update,
        goto: this.goto,
        back: this.back,
        next: this.next,
      }}>
        <div
          style={{ position: 'relative' }}
          ref={this.driverRef}
        />

        <div
          style={warperStyle}
          ref={this.warperRef}
          >
          <div
            style={{
              transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
              ...style,
              transform: `translate3D(0, ${(translateY)}px, 0)`,
            }}
            ref={this.fullpageRef}
          >
            { children }
          </div>
        </div>

      </FullpageContext.Provider>
    );
  }
}

export default Fullpage;
