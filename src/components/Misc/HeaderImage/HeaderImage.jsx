import React, { Component } from 'react'
import s from './HeaderImage.scss'
import { Col } from 'react-bootstrap'

export default class HeaderImage extends Component {
	constructor(props) {
	  super(props)
	}

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    let component = this.toTitleCase(this.props.name)
    let styles = {
      background: 'url(' + require(`../../${component}/${component}.jpg`) + ') no-repeat fixed'
    }

    return (
      <section className={classNames(s.display, this.props.customClass)} style={styles} >
        <div className={classNames('container', 'text-left')}>
          <div style={{float: this.props.position}}>
            <h1 className={s.brandHeading}>{this.props.title}</h1>
            <p className={classNames(s.introText, 'pull-left')}>{this.props.caption}</p>
          </div>
        </div>
      </section>
    );
  }
}