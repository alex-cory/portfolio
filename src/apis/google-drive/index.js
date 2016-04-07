let fs = require('fs')
let async = require("async")
let ggl = require('googleapis')
import { google } from '../../constants/config.js'
import GoogleDoc from './GoogleDoc.js'
import jsonfile from 'jsonfile'

async function getGoogleDocsData() {
	let filesData = await getFilesFromGoogleDriveFolder('0B5LhVy_zkvWqc2N1ZTNPeFFFLTA')
	let cache = './cache/googleDocs.json'
	await cacheData(filesData, cache) /* TODO: use a cron job for this every hour */
	// let data = await getCachedData(cache)
	console.log(filesData);
	// return await getCachedData(cache)
	// console.log(await getCachedData(cache))
}
getGoogleDocsData()
// let googleDocsData = getGoogleDocsData()
// export default googleDocsData

/*
 * To Test:
 * 1. remove `export default` from getFiles()
 * 2. uncomment `console.log(files)`
 * 3. comment out `return files`
 * 4. uncomment `getFiles()`
 * 5. run `babel-node connect2driveAsyncAwait.js` in your terminal
 */
async function getFilesFromGoogleDriveFolder(folderId) {
	let drive = await setupDrive()
	let fileIds = await getFileIdsFromFolder(folderId, drive)
	let files = await getFileData(fileIds, drive)
	// console.log(files)
	return files
}
// getFilesFromGoogleDriveFolder('0B5LhVy_zkvWqc2N1ZTNPeFFFLTA')


function setupDrive() {
	let drive
	let OAuth2 = ggl.auth.OAuth2
	let oauth2Client = new OAuth2(google.CLIENT_ID, google.CLIENT_SECRET, google.REDIRECT_URL[0])
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
		  	// return accept(files)
		  	// console.log(files);

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
				// fields: 'alternateLink,description,downloadUrl,fileSize,id,imageMediaMetadata(height,width),thumbnail,thumbnailLink,title,webContentLink,webViewLink'
				fields: 'description,id,imageMediaMetadata(height,width),parents/id,thumbnail/image,thumbnailLink,title,videoMediaMetadata'
			}

			// Making the request to Google Drive to get the data for each file
			drive.files.get(options, (err, response) => {
				if (err) {
				  console.log('The API returned an error: ' + err)
				  return reject()
				}

				let data = response
				// console.log(data);
				files.push(
					data
					// new GoogleDoc(data)
				)

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
		  	if (err) {
		  		console.log(err)
		  	}
		  })
		}

		// when all the tasks are done, resolve the promise
		taskQueue.drain = () => {
			return accept(files)
		}
	})
}

function cacheData(data, location) {
	jsonfile.writeFile(location, data, (err) => {
		if (err) console.error(err)
	})
}

function getCachedData(location) {
	return jsonfile.readFileSync(location)
}