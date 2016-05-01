import React, { Component } from 'react';
import Relay from 'react-relay';
import PlayItem from '../PlayItem/PlayItem'
import { Row } from 'react-bootstrap'

class PlayList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		let media = []
		let edges = this.props.viewer.googleDocs.edges
    let node

		for (let edge of edges) {
      node = edge.node
    		media.push(
          <PlayItem
            key={node.id}
            id={node.id}
            type={node.isImage ? 'image' : 'video'}
            thumb={node.thumb}
            caption={node.caption}
            media={node.isImage ? node.url : node.iframe}
          />
  			)
		}
    return (
      <Row>
      	{media}
      </Row>
    );
  }
}

export default Relay.createContainer(PlayList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        googleDocs(first: 100) {
          edges {
            node {
              id
              name
              url
              iframe
              thumb
              caption
              downloadUrl
              isImage
            }
          }
        }
      }
    `,
  },
});