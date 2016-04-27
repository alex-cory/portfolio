export default class Repo {
  constructor(id, name, url, description, stars, forks, downloadUrl, imageUrl, image) {
    this.id = id || null
    this.name = name || null
    this.url = url || null
    this.description = description || null
    this.stars = stars || null
    this.forks = forks || null
    this.downloadUrl = downloadUrl || null
    this.imageUrl = imageUrl || null
    this.image = image || null
  }
}