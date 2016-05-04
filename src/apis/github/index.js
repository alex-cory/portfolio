import fs 			from 'fs'
import path 		from 'path'
import request 	from 'request'
import jsonfile from 'jsonfile'
import github 	from 'octonode'
import * as my 	from '../../../config/config.js'
import Imagemin from 'imagemin'
import gm 			from 'gm'
import chalk from 'chalk'
import { updateFile, diff } from '../../../scripts/helpers.js'


export default async function updateReposData() {
	let liveDataFile = path.resolve(__dirname, './data.json')
  let freshData = await getReposDataFrom('alex-cory')
  let liveData = require(liveDataFile)

  // if there's a difference between the data live on the site now and the data just scraped from medium
  if (diff(liveData, freshData)) {
    // update the live data
    await updateFile(liveDataFile, freshData)
    console.log(chalk.blue('Github repos have been updated!'));
    // restart the server to show changes (stop the server, pm2 will start it back up)
    process.exit(1)
  }
}

/**
 * Returns a promise containing a list of repos
 *
 * TODO:
 *  - diffing algorithm
 *
 * @return {array} Array of repo objects
 */
async function getReposDataFrom(username) {
	// Get the data for each repository and make it pretty
	let data = await getInitialReposDataFrom(username)

	let repos = []
	let imageName
	let ext
	let localImagePath


	for (let repo of data) {
		// Add image urls to the data
		repo.imageUrl = await getImageUrl(repo.name)

		imageName = path.basename(repo.imageUrl) == 'CEDl74r.jpg' ? 'default.jpg' : path.basename(repo.imageUrl)
		localImagePath = `../../components/Work/Repo/img/${imageName}`

		if (imageExists(localImagePath)) {
			repo.image = `./img/${imageName}`
		} else {
			repo.image = await downloadImage(repo.imageUrl)
			// Resize and Optimize each image to help with page speed
			await resizeImage(imageName, 720, 450)
			await optimizeImage(imageName)
		}

		// Add the repo to the array
		repos.push(repo)
	}

	return new Promise((accept, reject) => {
		accept(repos)
	})
}

function imageExists(image) {
	return new Promise((accept, reject) => {
		fs.stat(image, (err, stat) => {
		    if(err == null) {
		    	accept(true)
		        // console.log('File exists');
		    } else if(err.code == 'ENOENT') {
		    	reject(false)
		        fs.writeFile('log.txt', err.code);
		    } else {
		    	reject(false)
		        console.log('Some other error: ', err.code);
		    }
		});
	})
}

/**
 * Takes an image, runs it through a minimizer, then replaces
 * the current image with a new image with a smaller file size.
 * @param  {String}  image Name of the image.
 * @return {Promise}			 Optimized image.
 */
function optimizeImage(image) {
	return new Promise((accept, reject) => {
		let func
		if (path.extname(image) == '.jpg' || path.extname(image) == '.jpeg') {
			func = Imagemin.jpegtran({progressive: true})
		} else if (path.extname(image) == '.png') {
			func = Imagemin.optipng({optimizationLevel: 3})
		} else if (path.extname(image) == '.gif') {
			func = Imagemin.gifsicle({interlaced: true})
		}
		new Imagemin()
			.src(`../../components/Work/Repo/img/${image}`)
			.dest('../../components/Work/Repo/img/')
			.use(func)
			.run(function (err, files) {
				return accept(files)
			})
	})
}


/**
 * Resizes an image to the specified dimensions.
 * @param  {String}  image  Name of the image.
 * @param  {Int}  	 width  Dimension for the width of the image.
 * @param  {Int}	   height Dimension for the height of the image.
 * @return {Promise}        Resized images.
 */
function resizeImage(image, width, height) {
	return new Promise((accept, reject) => {
		gm(`../../components/Work/Repo/img/${image}`)
			.size(function (err, size) {
			  if (!err && size.width * size.height > width * height) {
					gm(`../../components/Work/Repo/img/${image}`)
						.resize(width, height)
						.noProfile()
						.write(`../../components/Work/Repo/img/${image}`, function (err) {
						  if (!err)
						  	// console.log('done')
							  accept()
						})
			  }
	    })
	})
}


/**
 * Provides the data for a specific user's github repositories.
 * @return {Promise:Array} Array of repo objects.
 */
function getInitialReposDataFrom(username) {
	let client = github.client(my.github.ACCESS_TOKEN)

	return new Promise((accept, reject) => {

		client.get('/user/repos', {}, function (err, status, body, headers) {

			let repos = []

		  for(let repo of body) {
		  	if (repo.owner.login == username) {

			  	repos.push({
			  		name: repo.name,
			  		url: repo.html_url,
			  		description: repo.description,
			  		stars: repo.stargazers_count,
			  		forks: repo.forks_count,
			  		downloadUrl: repo.html_url + '/archive/master.zip',
			  		imageUrl: null, /* TODO: figure out how to call getImageUrl(repo.name) from here */
			  		image: null
			  	})
		  	}
		  }
		  accept(repos)
		})
	})
}
// getInitialReposDataFrom('alex-cory')


/**
 * Queries the specified repository for an image file with the same name of the repository.
 * @param  {String} repoName Name of the repository.
 * @return {String}          The raw url to the repository's image on github.
 */
function getImageUrl(repoName) {
	let client = github.client(my.github.ACCESS_TOKEN)

	return new Promise((accept, reject) => {

		let ghsearch = client.search()

		ghsearch.code({
			/* querying for a file within the specific repo with the same name as the repo */
		  q: `repo:${my.github.username}/${repoName} filename:${repoName}`,
		  sort: 'created',
		  order: 'asc'
	  }, (err, resp) => {
	  	if (err) {
	  		console.error('you might be over your rate limit. Do you have more than 30 repositories?')
	  		reject(err)
	  	}
  		let rawImageUrl = 'http://i.imgur.com/CEDl74r.jpg'

	  	if (resp.total_count == 0) {
	  		// console.log(rawImageUrl)
	  		return accept(rawImageUrl)
	  	} else {

		  	let potentialImages = resp.items
		  	let imageName
		  	let isImage

		  	for (let image of potentialImages) {
			  	isImage = image.name.match(/(\.jpg|\.jpeg|\.png|\.gif|\.svg)/) != null
		  		if (isImage) {
		  			rawImageUrl = image.html_url.replace(/\/blob\//, '/raw/')
		  		}
			  	// TODO: put error handling here for if the first `item` is not an image, check to see if any of the other `items` are and use them
	  			// console.log(rawImageUrl)
	  			return accept(rawImageUrl)

		  	}
	  	}
	  })
	})
}


/**
 * Downloads an image from a url to a specific location.
 * @param  {String} repoImageUrl The url to the image representing the repository.
 * @return {Promise}
 */
function downloadImage(repoImageUrl) {
	let imageName = path.basename(repoImageUrl) == 'CEDl74r.jpg' ? 'default.jpg' : path.basename(repoImageUrl)
	return new Promise((accept, reject) => {
		download(repoImageUrl, `../../components/Work/Repo/img/${imageName}`, () => {
			return accept(`./img/${imageName}`)
		})
	})
}


/**
 * Actually performs the generic download of a file from a url.
 * @param  {String}   uri      The url location of the file to be downloaded.
 * @param  {String}   filename The new name you want to give to the downloaded file.
 * @param  {Function} callback To tell when the download is complete.
 */
function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type'])
    // console.log('content-length:', res.headers['content-length'])
    request(uri)
    	.pipe(fs.createWriteStream(filename))
    	.on('close', callback)
  })
}


/**
 * Stores the data locally into a local file
 * @param  {array|object} data     The information to be saved locally.
 * @param  {string} 		  location Where the data will be saved and in which file.
 * @return {}
 */
function cacheData(data, location) {
	if (!data) data = []
	jsonfile.writeFile(location, data, (err) => {
		if (err) console.error(err)
	})
}


/**
 * Gets the data from the local json file.
 * @param  {String} location Where the data will be stored.
 * @return {array:object}    The data that is being stored in the json file.
 */
function getCachedData(location) {
	return jsonfile.readFileSync(location)
}