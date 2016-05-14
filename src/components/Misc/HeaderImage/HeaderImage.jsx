import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import s from './HeaderImage.scss'

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
        <Grid>
          <div style={{float: this.props.position}}>
            <h1 className={s.brandHeading}>{this.props.title}</h1>
            <p className={classNames(s.introText, 'pull-left')}>{this.props.caption}</p>
          </div>
        </Grid>
      </section>
    );
  }
}