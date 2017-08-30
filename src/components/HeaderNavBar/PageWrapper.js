
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import omit from 'lodash.omit';
import bsTheme from '../../theme';

const defaultProps = { theme: bsTheme };

class PageWrapperUnstyled extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    children: PropTypes.node,
    className: PropTypes.string,
    theme: PropTypes.object,
    /* eslint-enable react/no-unused-prop-types */
  }

  render() {
    const {
      className,
      children,
    } = omit(this.props, ['theme']);
    return (
      <div
        className={className}
        id="wrapper"
      >
        {children}
      </div>
    );
  }
}

const PageWrapper = styled(PageWrapperUnstyled)`
  ${(props) => `
    height: 100%;
    transition: ${props.theme['$menu-offset-nav-transition']};
    &.left { transform: translateX(220px); }
    &.right { transform: translateX(-220px); }
  `}
`;

PageWrapper.defaultProps = defaultProps;

export default PageWrapper;

