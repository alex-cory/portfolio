import fs 	    from 'fs'
import path     from 'path'
import async    from 'async'
import ggl      from 'googleapis'
import * as my  from '../../../config/config.js'
import jsonfile from 'jsonfile'
import chalk from 'chalk'
import { updateFile, diff } from '../../../scripts/helpers.js'


export default async function updateGoogleDriveData() {
	let liveDataFile = path.resolve(__dirname, './data.json')
  let freshData = await await getFilesFromGoogleDriveFolder('0B5LhVy_zkvWqc2N1ZTNPeFFFLTA') // folder Id as argument
  let liveData = require(liveDataFile)

  // if there's a difference between the data live on the site now and the data just scraped from medium
  if (diff(liveData, freshData)) {
    // update the live data
    await updateFile(liveDataFile, freshData)
    console.log(chalk.cyan('Google Drive data has been updated!'));
    // restart the server to show changes (stop the server, pm2 will start it back up)
    process.exit(1)
  }
}

// async function saveGoogleDriveData() {
// 	let folderID = '0B5LhVy_zkvWqc2N1ZTNPeFFFLTA'
// 	let filesData = await getFilesFromGoogleDriveFolder(folderID)
// 	// console.log(filesData);
// 	let cache = path.resolve(__dirname, './data.json')
// 	await cacheData(filesData, cache) /* TODO: use a cron job for this every hour */
// 	// let data = await getCachedData(cache)
// 	// console.log(filesData);
// 	// return await getCachedData(cache)
// 	// console.log(await getCachedData(cache))
// }
// getGoogleDocsData()
// let googleDocsData = getGoogleDocsData()
// export default googleDocsData

// function downloadImage(repoImageUrl) {
// 	let imageName = path.basename(repoImageUrl) == 'CEDl74r.jpg' ? 'default.jpg' : path.basename(repoImageUrl)
// 	return new Promise((accept, reject) => {
// 		download(repoImageUrl, `../../components/Work/Repo/img/${imageName}`, () => {
// 			return accept(`./img/${imageName}`)
// 		})
// 	})
// }

// function download(uri, filename, callback){
//   request.head(uri, function(err, res, body){
//     // console.log('content-type:', res.headers['content-type'])
//     // console.log('content-length:', res.headers['content-length'])
//     request(uri)
//     	.pipe(fs.createWriteStream(filename))
//     	.on('close', callback)
//   })
// }
function downloadFiles(files, location, drive) {
	for (let file of files) {
		let fileType = file.mimeType.indexOf('image') > -1 ? 'img' : 'vid'
		if (fileType === 'img') {
			let dest = fs.createWriteStream(`${location}/${fileType}/${file.title}`);
			drive.files.export({
			   fileId: file.id,
			   mimeType: file.mimeType
			})
			.on('end', function() {
			  console.log('Done');
			})
			.on('error', function(err) {
			  console.log('Error during download', err);
			})
			.pipe(dest);
		}
	}
}

async function getFilesFromGoogleDriveFolder(folderId) {
	let drive = await setupDrive()
	let fileIds = await getFileIdsFromFolder(folderId, drive)
	let files = await getFileData(fileIds, drive)
	// await downloadFiles(files, '/public', drive) /* TODO: currently this is only images. need to do for video as well */
	// console.log(files)
	return new Promise((accept, reject) => {
		accept(files)
	})
}
// getFilesFromGoogleDriveFolder('0B5LhVy_zkvWqc2N1ZTNPeFFFLTA')


function setupDrive() {
	let drive
	let OAuth2 = ggl.auth.OAuth2
	let oauth2Client = new OAuth2(my.google.CLIENT_ID, my.google.CLIENT_SECRET, my.google.REDIRECT_URL[0])
	let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'
	let TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json'

	return new Promise((accept, reject) => {

		fs.readFile(TOKEN_PATH, (err, contents) => {
			if (err) {
			  console.log('Error loading client secret file: ' + err)
			  return
			}

			let token = JSON.parse(contents)
			// refreshes the access token if it needs to be
			oauth2Client.setCredentials(token)
			// authenticates us so we can make requests
			drive = ggl.drive({ version: 'v2', auth: oauth2Client })

			return accept(drive)
		})

	})
}

function getFileIdsFromFolder(folderId, drive) {

	let fileIds = []

	return new Promise((accept, reject) => {

		let folderOptions = {
		  folderId: folderId,
		  fields: 'items(childLink,id)'
		}

		drive.children.list(folderOptions, (err, response) => {
		  if (err) {
		    console.log('The API returned an error: ' + err)
		    return reject()
		  }

		  let files = response.items

		  if (files.length == 0) {
		    console.log('No files found.')

		  } else {

		    for (let file of files) {
		      fileIds.push(file.id);
		    }
		    return accept(fileIds)
		  }
		})
	})
}

function getFileData(fileIds, drive) {
	return new Promise((accept, reject) => {
		let files = []
		let batchSize = 9   // amount of requests, aka concurrency
		let waitTime = 1000 // 1 second

		// Throttling the requests made to Google Drive API to 10/sec
		let taskQueue = async.queue((task, callback) => {

			let options = {
				fileId: task.fileId,
				fields: 'description,webContentLink,mimeType,id,imageMediaMetadata(height,width),parents/id,thumbnail/image,thumbnailLink,title,videoMediaMetadata'
			}

			// Making the request to Google Drive to get the data for each file
			drive.files.get(options, (err, response) => {
				if (err) {
				  console.log('The API returned an error: ' + err)
				  return reject()
				}

				let data = response
				files.push(data)

			})

			// Wait 1 second
			setTimeout(() => {
				callback()
			}, waitTime)

		// run `n` number of api calls each second (n = 9)
		}, batchSize)

		for (let fileId of fileIds) {
			// Push all the file id's into the task queue
		  taskQueue.push({fileId}, (err) => {
		  	// Done
		  	if (err) throw err
		  })
		}

		// when all the tasks are done, resolve the promise
		taskQueue.drain = () => {
			return accept(files)
		}
	})
}

function cacheData(data, location) {
	if (!data) data = []
	jsonfile.writeFile(location, data, (err) => {
		if (err) console.error(err)
	})
}

function getCachedData(location) {
	return jsonfile.readFileSync(location)
}