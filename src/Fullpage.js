/**
 * @class Fullpage
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './FullpageNavigation'

import styles from './styles.css'

class Fullpage extends Component {
  static propTypes = {
    text: PropTypes.node
  }

  constructor(props) {
    super(props)
    this.driver = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
    this.timeout = null;
    this.slides = null
    this.state = {
      translateY: 0,
      currentSlide: null,
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount() {
    this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`;
    const children = Array.from(this.fullpageRef.current.children)
    this.slides = children.filter(child => child.hasAttribute('isslide'))
    if (typeof window !== 'undefined')  {
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

  handleScroll(e) {
    const lastKnownScrollPosition = window.scrollY
    let ticking
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // doSomething(lastKnownScrollPosition);
        const slide = this.slides.find(slide => lastKnownScrollPosition < slide.offsetTop + slide.offsetHeight * 0.5)
        if(this.state.currentSlide != slide){
          this.setState({
            currentSlide: slide,
            translateY: slide.offsetTop * -1,
          })
          // update scrollY driver position
          window.scrollTo(0, slide.offsetTop);
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => this.updateHistory(slide),1000)
        }

        ticking = false
      });
    }
    ticking = true
  }

  handleResize() {
    let ticking
    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`
        this.setState({
          translateY: this.state.currentSlide.offsetTop * -1,
        })
        ticking = false
      });
    }
    ticking = true
  }

  updateHistory(slide) {

  }

  render() {
    const {
      children,
      navigation = true,
      style = {
        position: 'absolute',
        left: 0,
        right: 0,
      },
      warperStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      },
      className = '',
      transitionTiming = 700,
      onChange = null
    } = this.props

    onChange(this.state)

    return (
      <div style={{ position: 'relative', backgroundColor: 'pink' }} ref={this.driver}>
        <div className={styles.fullpageWarper} style={{ ...warperStyle }} ref={this.warperRef}>
          <div className={styles.fullpage} style={{
            ...style,
            transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
            transform: `translateY(${(this.state.translateY)}px)`
          }} ref={this.fullpageRef}>
            { children }
            { navigation && <Navigation data={children}/> }
          </div>
        </div>
      </div>
    )
  }
}

export default Fullpage
