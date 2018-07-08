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
    this.state = {
      translateY: 0,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`;
    const children = Array.from(this.fullpageRef.current.children)
    const slides = children.filter(child => child.hasAttribute('isslide'))
    this.setState({slides})
    if (typeof window !== 'undefined')  {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    // set body height == to 'auto'
    if (typeof window !== 'undefined')  {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(e) {
    const lastKnownScrollPosition = window.scrollY
    let ticking
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // doSomething(lastKnownScrollPosition);
        const slide = this.state.slides.find(slide => lastKnownScrollPosition < slide.offsetTop + slide.offsetHeight * 0.5)
        this.setState({translateY: slide.offsetTop * -1})
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => window.scrollTo(0, slide.offsetTop),1000)
        ticking = false
      });
    }
    ticking = true
  }

  render() {
    const {
      children,
      navigation = true,
      style = {
        position: 'fixed',
        left: 0,
        right: 0,
      },
      warperStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
      className = '',
      transitionTiming = 700,
    } = this.props

    console.log(`translateY(${this.state.translateY}px)`);

    return (
      <div style={{ position: 'relative', backgroundColor: 'pink' }} ref={this.driver}>
        <div className={styles.fullpageWarper} style={{ ...warperStyle }} ref={this.warperRef}>
          <div className={styles.fullpage} style={{
            ...style,
            transform: `translateY(${this.state.translateY}px)`,
            transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
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
