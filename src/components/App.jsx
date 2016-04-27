import React, { Component } from 'react'
import Relay from 'react-relay'

import Navbar from './Navbar/Navbar.jsx'
import Top from './Top/Top.jsx'
import Bio from './Bio/Bio.jsx'
import Blog from './Blog/Blog.jsx'
import Work from './Work/Work.jsx'
import Play from './Play/Play.jsx'
import Contact from './Contact/Contact.jsx'


class App extends Component {
  render() {
    // console.log('App: ', this.props.viewer)
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
