import React, { Component, PropTypes } from 'react'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
let delay = 500

const loader = <RefreshIndicator
  size={40}
  left={0}
  top={0}
  status='loading'
  loadingColor='white'
  style={{
    position: 'relative',
    background: 'transparent',
    boxShadow: 'none'
  }}
/>

class ImageComponent extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    loader: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object
  };
  static defaultProps = {
    loader,
    onLoad: () => undefined,
    onError: () => undefined
  };

  state = {
    isLoading: true,
    showLoader: true
  };

  componentDidMount = () => {
    this._checkValidImage()
  };

  _checkValidImage = () => {
    if (window && window.Image) {
      let image = new window.Image()
      image.src = this.props.src
      image.onload = this._handleLoad
      image.onerror = this._handleError
    }
  };

  _handleLoad = () => {
    this.setState({ isLoading: false }, () => {
      this.props.onLoad()
      this._hideLoader()
    })
  };

  _handleError = () => {
    this.setState({ isLoading: false }, () => {
      this.props.onError()
      this._hideLoader()
    })
  };

  _hideLoader = () => {
    setTimeout(() => {
      this.setState({ showLoader: false })
    }, delay)
  };

  render = () => {
    let { src, className, style, loader } = this.props
    let { isLoading, showLoader } = this.state
    let loaderStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: '#CCC',
      opacity: +isLoading,
      transition: `opacity ${delay}ms`
    }

    if (!isLoading) {
      style = {
        ...style,
        background: `url(${src}) center/cover no-repeat`
      }
    }

    return (
      <div className={className} style={style}>
        {showLoader ? <div style={loaderStyle}>{loader}</div> : null}
      </div>
    )
  };
}

export default ImageComponent
