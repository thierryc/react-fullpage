/**
 * @class FullpageSection
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageNumber from './FullpageNumber';
import FullpageContext from './FullpageContext';

const FullpageSectionContext = React.createContext();

class FullpageSection extends PureComponent {
  static contextType = FullpageContext;

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

  static Number = ({style = {}}) => (
    <FullpageSectionContext.Consumer>
      { ctx => <span style={style}>{ ctx.index }</span> }
    </FullpageSectionContext.Consumer>
  );

  constructor(props, context) {
    super(props, context);
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    const {subscribe, count} = this.context;
    this.el = this.sectionRef;
    subscribe(this);
  }

  componentDidUpdate() {
    const {update} = this.context;
    update(this);
  }

  componentWillUnmount() {
    const {unsubscribe} = this.context;
    const slide = unsubscribe(this);
  }

  render() {
    const {
      children,
      height,
      style,
      className,
    } = this.props;
    return (
      <FullpageSectionContext.Provider value={{
          index: this.index,
        }}>
        <section className={className} style={{ height, ...style }} ref={this.sectionRef}>
          { children }
        </section>
      </FullpageSectionContext.Provider>
    );
  }
}

export default FullpageSection;
