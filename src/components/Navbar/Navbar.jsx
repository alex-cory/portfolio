import React, { Component } from 'react'
import NavSection from './NavSection/NavSection'
import NavButton from './NavButton/NavButton'
import s from './Navbar.scss'

export default class Navbar extends Component {
	constructor(props) {
	  super(props);
	}

	componentDidMount() {
	  window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
	  window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) { // TODO: change this. It's basically adding these styles every time you scroll
		let scrollTop = e.target.defaultView.scrollY;
		// if (scrollTop > 50) {
		// 	// Show Navbar
		// 	$(".navbar-fixed-top")
		// 		.css("background-color", "rgba(0, 0, 0, 0.8)")
		// 		.css("padding", 0)
		// 		.css("border-bottom", "1px solid rgba(255,255,255,.3)");
		// } else {
		// 	// Hide Navbar
		// 	$(".navbar-fixed-top")
		// 		.css("background-color", "transparent")
		// 		.css("padding", "20px 0")
		// 		.css("border-bottom", "none");
		// }
		if (scrollTop > 50) { // if scrolled below 50 pixels on the page
				// show the navbar
		    $(".navbar-fixed-top").addClass("top-nav-collapse");
		    // show the top button
		    $('li.top').removeClass('hidden active');
		    $("ul.navbar-nav.navbar-right li:nth-child(2)").addClass("active");
		    // show the social buttons
		    $('li.social-nav').removeClass('hidden');
		} else { // else if at the top of the page
				// hide the navbar
		    $(".navbar-fixed-top").removeClass("top-nav-collapse");
		    // hide the 'top' button
		    $('li.top').addClass('hidden');
		    $("ul.navbar-nav.navbar-right li:nth-child(2)").removeClass("active");
		    // hide the social buttons
		    $('li.social-nav').addClass('hidden');
		}
		if ($('ul.navbar-nav li.page-scroll:nth-child(2)').siblings().hasClass("active")) {
		    $("ul.navbar-nav.navbar-right li.page-scroll:nth-child(2)").removeClass("active");
		}
	}

	render() {
	  return (
			<nav className={classNames(s.nav, 'navbar', 'navbar-custom', 'navbar-fixed-top')} role="navigation">
				<div className="container">
					<div className="collapse navbar-collapse  navbar-main-collapse">
						<NavSection side="left">
							{/* In case you were wondering. `my` is defined in `server.js` under the `ProvidePlugin` */}
							<NavButton name="github"         href={my.github.url}        type="icon" initialVisibility="hidden"/>
							<NavButton name="linkedin"       href={my.linkedin.url}      type="icon" initialVisibility="hidden"/>
							<NavButton name="stack-overflow" href={my.stackoverflow.url} type="icon" initialVisibility="hidden"/>
							<NavButton name="google-plus"    href={my.googleplus.url}    type="icon" initialVisibility="hidden"/>
							<NavButton name="twitter"        href={my.twitter.url}       type="icon" initialVisibility="hidden"/>
						</NavSection>
						<NavSection side="right">
							<NavButton name="top" customClass="top" href="#page-top" initialVisibility="hidden"/>
							<NavButton name="bio" scrollTo="bottom" />
							<NavButton name="work"/>
							<NavButton name="blog"/>
							<NavButton name="play"/>
							<NavButton name="contact"/>
						</NavSection>
					</div>
		    </div>
	    </nav>
    )
	}
}