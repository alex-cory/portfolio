import React, { Component } from 'react'
import Relay from 'react-relay'
import s from './Play.scss'
import { Col, Row } from 'react-bootstrap'
import PlayList from './PlayList/PlayList';
import HeaderImage from '../Misc/HeaderImage/HeaderImage'

class Play extends Component {
	constructor(props) {
	  super(props)
	}

  render() {
    return (
      <div id="play">

        <HeaderImage
          name="play"
          title="Play"
          caption="The World Is My Playground"
          position="right"
          customClass={s.play}
        />

	      {/* Play Content Section */}
	      <section className={classNames('container', s.content)}>
          <Row>
            <h1>Play</h1>
            <p>Although Alex loves his work more than just about anything else, he also loves to play. :)</p>
          </Row>
          <PlayList viewer={this.props.viewer} />
	      </section>

      </div>
    );
  }
}

export default Relay.createContainer(Play, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
      	${PlayList.getFragment('viewer')}
      }
    `,
  },
});