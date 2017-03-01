/**
 *
 * Img.react.js
 *
 * Renders an image, enforcing the usage of the alt='' tag
 */

import styled from 'styled-components';
import React, { PropTypes } from 'react';
import bsTheme from 'theme';
import { imgFluid } from '../../styled/mixins/image';
import { boxShadow } from '../../styled/mixins/box-shadow';
import { borderRadius } from '../../styled/mixins/border-radius';
import { transition } from '../../styled/mixins/transition';

const defaultProps = { theme: bsTheme };

class Img extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    useMap: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.object,
  }

  render() {
    const { theme, className, src, alt, width, height, useMap, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        useMap={useMap}
        {...rest}
      />
    );
  }
}

// eslint-disable-next-line no-class-assign
Img = styled(Img)`
  ${(props) => `
    
    /* 
      Responsive images (ensure images does not scale beyond their parents)
      This is purposefully opt-in via an explicit class rather than being the default for all <img>.
      We previously tried the "images are responsive by default" approach in Bootstrap v2,
      and abandoned it in Bootstrap v3 because it breaks lots of third-party widgets (including Google Maps)
      which we are not expecting the images within themselves to be involuntarily resized.
      See also https://github.com/twbs/bootstrap/issues/18178
    */
    
    &.img-fluid {
      ${imgFluid()}
    }
    
    
     /* Image thumbnails */ 
    &.img-thumbnail,
     & .img-thumbnail{
      padding: ${props.theme['$thumbnail-padding']};
      background-color: ${props.theme['$thumbnail-bg']};
      border: ${props.theme['$thumbnail-border-width']} solid ${props.theme['$thumbnail-border-color']};
      ${borderRadius(
        props.theme['$enable-rounded'],
        props.theme['$thumbnail-border-radius']
      )}
      ${transition(
        props.theme['$enable-transitions'],
        props.theme['$thumbnail-transition']
      )}
      ${boxShadow(
        props.theme['$enable-shadows'],
        props.theme['$thumbnail-box-shadow']
      )}
      /* Keep them at most 100% wide */
      ${imgFluid()}
    }
   
    &.figure-img {
      margin-bottom: ${props.theme['$spacer-halved']};
      line-height: 1;
    }
    
    /* Reboot Scss */
    
    /*
     By default, <img> are inline-block. This assumes that, and vertically
     centers them. This will not apply should you reset them to block level.
    */
    vertical-align: middle;
    /*
     Note: <img> are deliberately not made responsive by default.
     For the rationale behind this, see the comments on the .img-fluid class.
    */
  `}
`;

Img.defaultProps = defaultProps;

export default Img;
