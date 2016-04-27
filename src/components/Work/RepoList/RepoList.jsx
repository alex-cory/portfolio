import React, { Component } from 'react'
import Relay from 'react-relay';
import Repo from '../Repo/Repo.jsx'
import { Row } from 'react-bootstrap'

export default class RepoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log('REPO LIST: ', this.props.viewer);

    // Sort the repos by star count
    let reposData = this.props.viewer.repos.edges.sort((a, b) => {
      return parseFloat(b.node.stars) - parseFloat(a.node.stars)
    })

    let repos = []

    // Load the data into the Repo component
    for (let repo of reposData) {
      repo = repo.node

      repos.push(
	    	<Repo
	    		key={repo.id}
	    		name={repo.name}
	    		url={repo.url}
          image={repo.imageUrl}
	    		description={repo.description}
	    		stars={repo.stars}
	    		downloadUrl={repo.downloadUrl}
			    // demoUrl={}
	  		/>
    	)
    }

    return (
      <Row>
      	{repos}
      </Row>
    )
  }
}


export default Relay.createContainer(RepoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        repos(first: 100) {
          edges {
            node {
              id
              name
              url
              description
              stars
              forks
              downloadUrl
              imageUrl
              image
            }
          }
        }
      }
    `,
  },
});