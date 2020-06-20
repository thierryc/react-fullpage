/* eslint-disable react/static-property-placement */
/**
 * @class FullpageSection
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

const FullpageSectionContext = React.createContext();

class FullpageSection extends PureComponent {
  static contextType = FullpageContext;
  
  static defaultProps = {
    height: '100vh',
    style: {},
    className: '',
    onShow: null, // eslint-disable-line no-unused-vars
    onHide: null, // eslint-disable-line no-unused-vars
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    className: PropTypes.string,
    onShow: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    onHide: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  };

  

  static Number = ({ style = {} }) => (
    <FullpageSectionContext.Consumer>
      { ctx => <span style={style}>{`${ctx.index + 1}`}</span> }
    </FullpageSectionContext.Consumer>
  );

  constructor(props, context) {
    super(props, context);
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    const { subscribe } = this.context;
    this.el = this.sectionRef;
    subscribe(this);
  }

  componentWillUnmount() {
    const { unsubscribe } = this.context;
    unsubscribe(this);
  }

  render() {
    const {
      children,
      height,
      style,
      className,
    } = this.props;

    const { getIndex } = this.context;
    this.index = getIndex(this);

    return (
      <FullpageSectionContext.Provider value={{
        index: this.index,
      }}
      >
        <section
          className={className}
          style={{
            height,
            ...style,
          }}
          ref={this.sectionRef}
        >
          { children }
        </section>
      </FullpageSectionContext.Provider>
    );
  }
}

export default FullpageSection;
