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
  			backgroundImage: 'url(' + image + ')',
        width: '100%',
        height: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '4px 4px 0 0'
  		}
  	}

    return (
      <Col xs={6} sm={4} md={3}>
        <a href={this.props.url} target="rss">
          <div className={s.box}>
            <div style={styles.imageThumb}></div>
            <div className={s.mPost}>
              <p className={s.name}>{this.props.name.toUpperCase()}</p>
              <hr className={s.hr} />
              <h4 className={s.title}>{this.props.title}</h4>
              <p className={s.content}>{this.props.content}</p>
            </div>
          </div>
        </a>
      </Col>
    );
  }
}