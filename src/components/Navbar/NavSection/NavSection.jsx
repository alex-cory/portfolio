import React, { Component } from 'react'

export default class NavSection extends Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  constructor(props) {
    super(props)
  }

  render() {
  	let side = this.props.side == 'left' ? 'navbar-left' : 'navbar-right'
    return (
      <div>
	      <ul className={classNames('nav', 'navbar-nav', side)}>
	      	{this.props.children}
	      </ul>
      </div>
    );
  }
}