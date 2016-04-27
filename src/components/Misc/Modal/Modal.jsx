import React, { Component } from 'react'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import s from './Modal.scss'

export default class Modal extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    return (
      <div>
          {/* Modal */}
          <div className="modal fade" id="{/*<?php echo $repo->getName(); ?>*/}Modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <Col xs={8} xsOffset={2}>
              {/* <div className="main-modal"> */}
              <div className={classNames('modal-content', s.modalContent)}>
                <img src={this.props.image} className={s.repoImage} name="aboutme" width="100%" height="100%"/>
                <div className={classNames('panel-footer', 'text-center')}>
                  <a href="{/*<?php echo $repo->getUrl(); ?>*/}/archive/master.zip"><span className={classNames('glyphicon', 'glyphicon-download')}></span> Download</a>
                  <a href="{/*<?php echo $repo->getUrl(); ?>*/}" target="rss"><span className={classNames('fa', 'fa-github')}></span> Github</a>
                  <a href="{/*<?php echo $repo->getDemoLink(); ?>*/}" className="demo-link" target="rss"><span className={classNames('fa', 'fa-play-circle-o')}></span> Live Demo</a>
                  <a href="mailto:?subject=Found%20our%20next%20software%20engineer&body=Check%20out%20this%20sweet%20project%20he%20did%21%20Yep...%20We%27re%20totally%20hiring%20him.%20{/*<?php echo $repo->getUrl(); ?>*/}"><span className={classNames('glyphicon', 'glyphicon-share-alt')}></span> Share</a>
                </div>
              </div>
            </Col>
          </div>

      </div>
    )
  }
}
