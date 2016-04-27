import React, { Component } from 'react'
import s from './BlogPost.scss'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let image = this.props.image || 'http://i.imgur.com/CEDl74r.jpg' //require('../../../public/img/default.jpg')
  	let styles = {
  		imageThumb: {
  			backgroundImage: 'url(' + image + ')'
  		}
  	}

    return (
      <Col xs={6} sm={4} md={3}>
        <div className={s.thumbnail2}>

          <div className={classNames(s.thumbnail)}>
            <a href={this.props.url} target="rss">
              <div className={s.caption}>
                  <h4 className={s.blogName}>{this.props.title}</h4><br/>
                  <p className={s.blogDescription}>{this.props.content}</p>
              </div>
            </a>
            {/* blog image */}
            <div className={classNames('blog_image', s.blogImageThumb)} style={styles.imageThumb} ></div>
          </div>

          <div className="panel-footer text-center">
            <a href={this.props.url} className={s.blogLinks} target="rss"><span className="fa fa-medium"></span></a>
          	<span className={s.blogLinks}>{this.props.likes}<span className="fa fa-heart"></span></span>
          	<Button href={`mailto:?subject=Found%20our%20next%20software%20engineer&body=Check%20out%20this%20sweet%20project%20he%20did%21%20Yep...%20We%27re%20totally%20hiring%20him.%20${this.props.url}`} className={s.blogLinks} target="rss" bsStyle="link"><Glyphicon glyph="glyph glyphicon-share-alt"/></Button>
          </div>

        </div>
      </Col>
    );
  }
}
