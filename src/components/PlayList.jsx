import React from 'react';
import Relay from 'react-relay';

class PlayList extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  constructor(props) {
    super(props);
  }

  render() {
  	// const videos = {
  	//   brian: require("file!./wakeboarding2.mp4")
  	// };
  	// console.log(videos);
  	// console.log('Play: ', this.props.viewer);
    return (
      <div>
	      <h3>Play list</h3>
	      <img src="http://localhost:3000/src/apis/google-drive/cache/snowboarding123.jpg" />
	      <video src={require('file!./wakeboarding2.mp4')} controls />
	      <video src="http://www.w3schools.com/html/movie.mp4" controls />
	      {/*
	      <video src="http://www.w3schools.com/html/movie.mp4" controls /> */}
	      <ul>
	        {this.props.viewer.googleDocs.edges.map(edge =>
	          <a key={edge.node.id} href={edge.node.url}>
	            <li key={edge.node.id}>
		            <img src={edge.node.url} />
		            <p>{edge.node.caption}</p>
	            </li>
	          </a>
	        )}
	      </ul>
      </div>
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
              url
            }
          }
        }
      }
    `,
  },
});