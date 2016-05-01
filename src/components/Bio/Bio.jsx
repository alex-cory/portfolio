import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import s from './Bio.scss'

export default class Bio extends Component {
	render() {
		return (
			<section id="bio" className={classNames('container', s.contentSection)}>
				<Row>
					<Col lg={8} className="intro-text-width">
            <h2>Summary</h2>
            <p>Alex is one of those people who just, plain and simple, never gives up.  He's an artist, but at the same time, he likes to make things happen.  The intersection of the two is where the <text className={s.mphszGreen}>magic happens.</text></p>
            <p>He spends most of his time learning new programming languages, tools, and is obsessed with <text className={s.mphszGreen}>machine learning</text>.  When he's not in the grind, he likes to spend his time designing things, thinking of new ways to make money to help others, or exploring nature.</p>
            <p className={s.wider}>"<text className={s.mphszGreen}>Sometimes, ordinary people do extraordinary things because they believe they can and refuse to give up.</text>" -Alex Cory</p>
	        </Col>
	        <img className={classNames('profimg', 'img-circle', 'center-block', 'col-md-4')} src={require('./Bio.jpg')}/>
		    </Row>
			</section>
		);
	}
}