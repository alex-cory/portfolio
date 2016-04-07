import React from 'react';
import Relay from 'react-relay';

class MediumPosts extends React.Component {
  render() {
    // console.log('MediumPosts: ', this.props);
    return (
      <div>
        <h3>Medium Post list</h3>
        <ul>
          {this.props.viewer.mediumPosts.edges.map(edge =>
            <a key={edge.node.id} href={edge.node.url}>
              <li key={edge.node.id}>{edge.node.title} (ID: {edge.node.id})</li>
            </a>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(MediumPosts, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        mediumPosts(first: 10) {
          edges {
            node {
              id,
              title,
              date,
              url
            }
          }
        }
      }
    `,
  },
});