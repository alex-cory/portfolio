import React, { Component } from 'react'
import Relay from 'react-relay'
import s from './Blog.scss'
import { Col, Row } from 'react-bootstrap'
import BlogPostList from './BlogPostList/BlogPostList.jsx'
import HeaderImage from '../Misc/HeaderImage/HeaderImage.jsx'

class Blog extends Component {
	constructor(props) {
	  super(props)
	}

	render() {
		// console.log(this.props.viewer);
		return (
			<div id="blog">

				<HeaderImage
					name="blog"
					title="One Idea"
					caption="Can Make A Difference"
					position="left"
				/>

				{/* Blog Content Section */}
				<section className={classNames('container', s.contentSection)}>
			    <Row>
		        <h2>Blog</h2>
		        <p>These are <text className={classNames('idea-main-clr')}>Ideas</text> that Alex has had that he thought he would just go ahead and share with the world. :)</p><br/>
		        <p>I am continuously under construction. If you like exceptional ideas, you might want to return again and again.  You'll see compelling examples here soon.</p>
	        </Row>
	        <BlogPostList viewer={this.props.viewer} />
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