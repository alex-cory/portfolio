import React, { Component } from 'react'
import Relay from 'react-relay'

import Navbar from './Navbar/Navbar'
import Top from './Top/Top'
import Bio from './Bio/Bio'
import Blog from './Blog/Blog'
import Work from './Work/Work'
import Play from './Play/Play'
import Contact from './Contact/Contact'


class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Top/>
        <Bio/>
        <Work viewer={this.props.viewer} />
        <Blog viewer={this.props.viewer} />
        <Play viewer={this.props.viewer} />
        <Contact/>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Work.getFragment('viewer')}
        ${Blog.getFragment('viewer')}
        ${Play.getFragment('viewer')}
      }
    `,
  },
})
