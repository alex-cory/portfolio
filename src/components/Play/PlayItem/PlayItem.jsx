import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import s from './PlayItem.scss'

export default class Play extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let fancyClasses = this.props.type === 'video' ? 'fancybox fancybox.iframe' : 'fancybox'

    return (
      <Col xs={6} sm={4} md={3} >
        <a href={this.props.media} className={classNames(fancyClasses, s.transition)} rel="play_gallery" title={this.props.caption}>
          <img className={s.playImageThumb} src={this.props.thumb} />
          { this.props.type === 'video' &&
            <i className={classNames('fa', 'fa-play', s.playIcon)} aria-hidden="true" ></i>
          }
        </a>
      </Col>
    )
  }
}
