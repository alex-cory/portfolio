import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import s from './Repo.scss'

export default class Repo extends Component {

  constructor(props) {
    super(props)
  }


  render() {
  	let styles = {
  		imageThumb: {
        // backgroundImage: 'url(' + require(this.props.image) + ')' /* for local images */
  			backgroundImage: 'url(' + this.props.image + ')'
  		}
  	}
    return (
      <Col xs={6} sm={4} md={3}>
      {/*<div id="repo">
        <ContentBox>
          <ContentBoxHeader
            rel="repo_gallery"
            description={this.props.description}
            image={this.props.image}
          />
          <ContentBoxFooter>
              <Button className={s.repoLinks} target="rss" bsStyle="link" href={`${this.props.url}/archive/master.zip`}><Glyphicon glyph="glyph glyphicon-download"/></Button>
              <a href={this.props.url} className={s.repoLinks} target="rss"><span className={classNames('fa', 'fa-github', s.glyph)}></span></a>
              {this.props.demo ? (
                <Button className={classNames(s.repoLinks, s.glyph)} target="rss" bsStyle="link" href={this.props.demo}><Glyphicon glyph="glyphicon glyphicon-play-circle"/></Button>
              ) : null}
              <Button href={`mailto:?subject=Found%20our%20next%20software%20engineer&body=Check%20out%20this%20sweet%20project%20he%20did%21%20Yep...%20We%27re%20totally%20hiring%20him.%20${this.props.url}`} className={classNames(s.repoLinks, s.glyph)} target="rss" bsStyle="link"><Glyphicon glyph="glyph glyphicon-share-alt"/></Button>
          </ContentBoxFooter>
        </ContentBox>
      </div>
      */}
        <div className={s.thumbnail2}>

          <div className={classNames(s.thumbnail)}>
            <a href={this.props.image} className="fancybox" rel="repo_gallery">
              <div className={s.caption}>
                  <h4 className={s.repoName}>{this.props.name}</h4><br/>
                  <p className={s.repoDescription}>{this.props.description}</p>
              </div>
            </a>
            {/* repo image */}
            <div className={classNames('repo_image', s.repoImageThumb)} style={styles.imageThumb}></div>
          </div>

          <div className={s.textCenter}>
          	<Button className={s.repoLinks} target="rss" bsStyle="link" href={`${this.props.url}/archive/master.zip`}><Glyphicon glyph="glyph glyphicon-download"/></Button>
          	<a href={this.props.url} className={s.repoLinks} target="rss"><span className={classNames('fa', 'fa-github', s.glyph)}></span></a>
            {this.props.demo ? (
            	<Button className={classNames(s.repoLinks, s.glyph)} target="rss" bsStyle="link" href={this.props.demo}><Glyphicon glyph="glyphicon glyphicon-play-circle"/></Button>
          	) : null}
          	<Button href={`mailto:?subject=Found%20our%20next%20software%20engineer&body=Check%20out%20this%20sweet%20project%20he%20did%21%20Yep...%20We%27re%20totally%20hiring%20him.%20${this.props.url}`} className={classNames(s.repoLinks, s.glyph)} target="rss" bsStyle="link"><Glyphicon glyph="glyph glyphicon-share-alt"/></Button>
            {/*
              <span className="pull-right" style={{fontFamily: 'Helvetica'}}><span style={{paddingRight: 4}}>{this.props.stars}</span><span className={classNames('fa', 'fa-star')}></span></span>
            */}
          </div>

        </div>
        {/* Modal */}
        {/*
          <RepoModal
            key={this.props.id}
            name={this.props.name}
            url={this.props.url}
            image={this.props.image}
            description={this.props.description}
            stars={this.props.stars}
            downloadUrl={this.props.downloadUrl}
          />
        */}
      </Col>
    )
  }
}
