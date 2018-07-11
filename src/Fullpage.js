/**
 * @class Fullpage
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Section from './FullpageSection'
import Navigation from './FullpageNavigation'

import styles from './styles.css'

class Fullpage extends Component {
  static propTypes = {
    text: PropTypes.node
  }

  constructor(props) {
    super(props)
    this.driver = React.createRef()
    this.warperRef = React.createRef()
    this.fullpageRef = React.createRef()
    this.ticking = false
    this.timeout = null
    this.children = null
    this.slides = null
    this.state = {
      translateY: 0,
      currentSlide: null,
      transitionTiming: 700,
    }
    this.onShow = {}
    this.onHide = {}
    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
  }

  componentDidMount() {
    this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`;
    //const children = Array.from(this.fullpageRef.current.children)
    //this.slides = children.filter(child => child.hasAttribute('isslide'))
    this.slides = this.children.filter(child => child.type === Section).map(slide => {
      const el = slide.ref.current.ref.current
      return {slide, el}
    })
    if (typeof window !== 'undefined')  {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    }
    if(this.props.transitionTiming && this.state.transitionTiming != this.props.transitionTiming) {
      this.setState({ transitionTiming: this.props.transitionTiming })
    }
  }

  componentWillUnmount() {
    // set body height == to 'auto'
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleScroll(e) {
    const lastKnownScrollPosition = window.scrollY
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        const slide = this.slides.find(slide => lastKnownScrollPosition < slide.el.offsetTop + slide.el.offsetHeight * 0.5)
        if(slide && this.state.currentSlide !== slide){
          const previousSlide = this.state.currentSlide
          this.setState({
            previousSlide: previousSlide,
            currentSlide: slide,
            translateY: slide.el.offsetTop * -1,
          })
          if (
            previousSlide
            && previousSlide.slide.props.hasOwnProperty('udid')
            && this.onHide[previousSlide.slide.props.udid]
            && this.onHide[previousSlide.slide.props.udid].props.hasOwnProperty('onHide')
            && typeof this.onHide[previousSlide.slide.props.udid].props.onHide === 'function') {
            setTimeout(() => this.onHide[previousSlide.slide.props.udid].props.onHide(this.state.translateY), this.state.transitionTiming)
          }
          if (
            slide.slide.props.hasOwnProperty('udid')
            && this.onShow[slide.slide.props.udid]
            && this.onShow[slide.slide.props.udid].props.hasOwnProperty('onShow')
            && typeof this.onShow[slide.slide.props.udid].props.onShow === 'function') {
            this.onShow[slide.slide.props.udid].props.onShow(this.state.translateY)
          }
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => this.updateHistory(slide),this.state.transitionTiming)
        }
        this.ticking = false
      });
    }
    this.ticking = true
  }

  handleResize() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.driver.current.style.height = `${this.fullpageRef.current.clientHeight}px`
        this.ticking = false
      });
    }
    this.ticking = true
  }

  updateHistory(slide) {
  }

  subscribeOnShow(uuid, slide) {
    this.onShow[uuid] = slide
  }

  subscribeOnHide(uuid, slide) {
    this.onHide[uuid] = slide
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
      transitionTiming = this.state.transitionTiming,
      onChange = null
    } = this.props

    this.children = React.Children.map(children, (child) => {
      const props = {}
      props.udid = this.uuidv4()
      if (child.type === Section) {
        if (child.props.hasOwnProperty('onShow') && typeof child.props.onShow === 'function') {
          this.subscribeOnShow(props.udid, child)
        }
        if (child.props.hasOwnProperty('onHide') && typeof child.props.onHide === 'function') {
          this.subscribeOnHide(props.udid, child)
        }
        props.ref = React.createRef()
      }
      return React.cloneElement(child, props)
    })

    return (
      <div>
        <div style={{ position: 'relative' }} ref={this.driver}></div>
        <div className={styles.fullpageWarper} style={{ ...warperStyle }} ref={this.warperRef}>
          <div className={styles.fullpage} style={{
            transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
            ...style,
            transform: `translate3D(0, ${(this.state.translateY)}px, 0)`
          }} ref={this.fullpageRef}>
            { this.children }
            { navigation && <Navigation data={children}/> }
          </div>
        </div>
      </div>
    )
  }
}

export default Fullpage
