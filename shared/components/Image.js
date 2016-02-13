import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'

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
    loader: <Loader type='ball-scale-multiple' />,
    onLoad: () => undefined,
    onError: () => undefined
  };

  state = { isLoading: true };

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
    this.setState({ isLoading: false }, () => this.props.onLoad())
  };

  _handleError = () => {
    this.setState({ isLoading: true }, () => this.props.onError())
  };

  render = () => {
    let { src, className, style, loader } = this.props
    let { isLoading } = this.state

    if (!isLoading) {
      style = {
        ...style,
        background: `url(${src}) center/cover no-repeat`
      }
    }

    return (
      <div className={className} style={style}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#CCC',
          opacity: +isLoading,
          transition: 'opacity 500ms'
        }}>
          {loader}
        </div>
      </div>
    )
  };
}

export default ImageComponent
