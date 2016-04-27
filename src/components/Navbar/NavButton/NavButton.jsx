import React, { Component } from 'react';
import s from './NavButton.scss'

export default class NavButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	let type = this.props.type || 'link'
  	let href = this.props.href || `#${this.props.name}`
  	let initialVisibility = this.props.initialVisibility || 'visible'
    let scrollTo = this.props.scrollTo || 'top'
  	let typeClass
  	let link

  	if (type == 'icon') {
  		typeClass = 'social-nav'
  		link = (
				<a target="rss" className={classNames(s.iconLink, s.grow, s[this.props.name])} href={href}>
					<i className={classNames('fa', `fa-${this.props.name}`)}></i>
				</a>
  		)
  	} else {
  		typeClass = 'page-scroll'
  		link = <a href={href} className={classNames(s.navLink, scrollTo)}>{this.props.name.toUpperCase()}</a>
  	}

    return (
      <li className={classNames(typeClass, this.props.customClass, initialVisibility)}>
    		{link}
      </li>
    );
  }
}
