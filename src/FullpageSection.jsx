/**
 * @class FullpageSection
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FullpageSection extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.string),
    className: PropTypes.string,
    onShow: PropTypes.object,
    onHide: PropTypes.object,
  };

  static defaultProps = {
    height: '100vh',
    style: {},
    className: '',
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {};
    this.sectionDidShow = this.sectionDidShow.bind(this);
    this.sectionDidHide = this.sectionDidHide.bind(this);
  }

  sectionDidShow() {
    this.onShow();
  }

  sectionDidHide() {
    this.onHide();
  }

  render() {
    const {
      children,
      height,
      style,
      className,
      onShow = null,
      onHide = null,
    } = this.props;

    return (
      <section className={className} style={{ height, ...style }} ref={this.ref}>
        {children}
      </section>
    );
  }
}

export default FullpageSection;
