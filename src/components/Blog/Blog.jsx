import React, { Component } from 'react'
import Relay from 'react-relay'
import s from './Blog.scss'
import { Col, Row, Grid } from 'react-bootstrap'
import BlogPostList from './BlogPostList/BlogPostList'
import HeaderImage from '../Misc/HeaderImage/HeaderImage'

class Blog extends Component {
	constructor(props) {
	  super(props)
	}

	render() {
		return (
			<div id="blog">

				<HeaderImage
					name="blog"
					title="One Idea"
					caption="Can Make A Difference"
					position="left"
				/>

				{/* Blog Content Section */}
				<section className={s.contentSection}>
					<Grid>
				    <Row>
			        <h2>Blog</h2>
			        <p>These are <text className={s.clr}>thoughts, ideas, and experiences</text> that Alex has had that he wants to share with the world.</p>
			        {/*<p>I am continuously under construction. If you like exceptional ideas, you might want to return again and again.  You'll see compelling examples here soon.</p>*/}
		        </Row>
		        <BlogPostList viewer={this.props.viewer} />
	        </Grid>
				</section>

			</div>

		);
	}
}


export default Relay.createContainer(Blog, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${BlogPostList.getFragment('viewer')}
      }
    `,
  },
});