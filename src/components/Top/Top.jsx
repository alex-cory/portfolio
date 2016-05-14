import React, { Component } from 'react'
import s from './Top.scss'
import { Col, Row, Grid } from 'react-bootstrap'

export default class Top extends Component {
	render() {
		return (
			<section id="top" className={s.intro}>
        <Grid className={s.body}>
	        <Row>
            <Col md={8} mdOffset={2}>
              <h1 className={s.heading}>Alex Cory</h1>
              <p className={s.pullMiddle}>Break The Record</p>
            </Col>
          </Row>
        </Grid>
			</section>
		);
	}
}