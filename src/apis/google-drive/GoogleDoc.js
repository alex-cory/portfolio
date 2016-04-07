// var google = require('googleapis');
// import authorize from './authorize.js'

export default class GoogleDoc {
	constructor(data) {
		this._fileId = data.id || null
		this._fileUrl = data.alternateLink || null
		this._rawUrl = this.fileId ? `https://drive.google.com/uc?export=view&id=${this.fileId}` : null;
		this._thumb = data.null
		this._description = data.description || null
		this._downloadUrl = data.webContentLink || null

	}

	get fileId() {
		return this._fileId
	}

	get fileUrl() {
		return this._fileUrl
	}

	get rawUrl() {
		return this._rawUrl
	}

	get thumb() {
		return this._thumb
	}

	get description() {
		return this._description
	}


	// set fileId(fileId) {
	// 	this._fileId = fileId
	// }

	// get data(auth, )
}