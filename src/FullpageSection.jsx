/**
 * @class FullpageSection
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FullpageSection extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    className: PropTypes.string,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
  };

  static defaultProps = {
    height: '100vh',
    style: {},
    className: '',
    onShow: null,
    onHide: null,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {};
    this.sectionDidShow = this.sectionDidShow.bind(this);
    this.sectionDidHide = this.sectionDidHide.bind(this);
  }

  sectionDidShow() {
    const { onShow } = this.props;
    onShow();
  }

  sectionDidHide() {
    const { onHide } = this.props;
    onHide();
  }

  render() {
    const {
      children,
      height,
      style,
      className,
    } = this.props;

    return (
      <section className={className} style={{ height, ...style }} ref={this.ref}>
        {children}
      </section>
    );
  }
}

export default FullpageSection;
