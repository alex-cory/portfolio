export default class GoogleDoc {
  constructor(id, name, caption, folderId, thumb, downloadUrl, type) {
    this.id = id || null
    this.name = name || null
    this.url = folderId && name ? `https://googledrive.com/host/${folderId}/${name}` : null
    this.iframe = `https://drive.google.com/file/d/${id}/preview` || null
    // this.rawUrl = id ? `https://googledrive.com/host/${this.folderId}/[file name].jpg`
    // this.rawUrl = id ? `https://drive.google.com/uc?export=view&id=[id]` : null;
    this.folderId = folderId || null
    this.thumb = thumb || `https://drive.google.com/thumbnail?authuser=0&sz=w320&id=${id}`
    this.caption = caption || null
    this.downloadUrl = downloadUrl || null
    this.isImage = type.indexOf('image') > -1
  }
}