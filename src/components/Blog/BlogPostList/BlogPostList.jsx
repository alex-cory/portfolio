import React, { Component } from 'react'
import Relay from 'react-relay';
import { Row } from 'react-bootstrap'
import BlogPost from '../BlogPost/BlogPost.jsx'

export default class BlogPostList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Sort by creation date. (i.e. most recent post at the top) TODO: double check this
  	let mediumPosts = this.props.viewer.mediumPosts.edges.sort((a, b) => {
      return parseFloat(b.node.date) - parseFloat(a.node.date)
    })

    return (
      <Row>
        {mediumPosts.map(edge =>
          <BlogPost
            key={edge.node.id}
            title={edge.node.title}
            date={this.props.date}
            url={edge.node.url}
            content={edge.node.content}
            image={edge.node.image}
            likes={edge.node.likes}
          />
        )}
      </Row>
    )
  }
}

export default Relay.createContainer(BlogPostList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        mediumPosts(first: 10) {
          edges {
            node {
              id
              title
              date
              url
              content
              image
              likes
            }
          }
        }
      }
    `,
  },
});