import React, { Component } from 'react';
import s from './Contact.scss'
import { Col, Grid } from 'react-bootstrap'

export default class Contact extends Component {

  render() {
    return (
    	<section id="contact" className={s.contact}>
        <Grid>
          <Col lg={8} lgOffset={2}>
            <h2>Contact</h2>
            <div className={s.mainContent}>

              <p>Hi there!</p>

              <p>I'm a really busy person, but feel free to reach out! :)</p>
              <p><a href="mailto:results@alexcory.com">results@alexcory.com</a></p>
            </div>
          </Col>
        </Grid>
    	</section>
    );
  }
}
