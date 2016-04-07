import React from 'react';
import Relay from 'react-relay';
import MediumPosts from './MediumPosts.jsx'
import PlayList from './PlayList.jsx';

class App extends React.Component {
  render() {
    // console.log('App: ', this.props.viewer);
    return (
      <div>
        <h1>App</h1>
        <ul>
          {/*this.props.viewer.mediumPosts.edges.map(edge =>
            <a key={edge.node.id} href={edge.node.url}>
              <li key={edge.node.id}>{edge.node.title} (ID: {edge.node.id})</li>
            </a>
          )*/}
        </ul>
        <MediumPosts
          viewer={this.props.viewer}
        />
        <PlayList
          viewer={this.props.viewer}
        />
        {/*  */}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${MediumPosts.getFragment('viewer')}
        ${PlayList.getFragment('viewer')}
      }
    `,
  },
});
