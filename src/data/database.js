/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
let mediumPostsData = require('../apis/scrape-medium/cache/blogPosts.json')
let googleDocsData = require('../apis/google-drive/cache/googleDocs.json')

// Model types
class MediumPost {}
class GoogleDoc {
  constructor(id, name, caption, folderId, thumb) {
    this.id = id || null
    this.name = name || null
    this.url = folderId && name ? `https://googledrive.com/host/${folderId}/${name}` : null
    // this.rawUrl = id ? `https://googledrive.com/host/${this.folderId}/[file name].jpg`
    // this.rawUrl = id ? `https://drive.google.com/uc?export=view&id=[id]` : null;
    this.folderId = folderId || null
    this.thumb = thumb || null
    this.caption = caption || null
  }
}
class User {}

var mediumPosts = mediumPostsData.map((mediumPostData, i) => {
  var mediumPost = new MediumPost();
  mediumPost.title = mediumPostData.title;
  mediumPost.id = `${i}`;
  mediumPost.date = `${mediumPostData.date}`;
  mediumPost.url = mediumPostData.url;
  return mediumPost;
})

var googleDocs = googleDocsData.map((data, i) => {
  return new GoogleDoc(
    data.id,             // id
    data.title,          // name
    data.description,    // caption
    data.parents[0].id,  // folderId
    data.thumbnailLink   // thumb

  )
})
// console.log(googleDocs);

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

module.exports = {
  // Export methods that your schema can use to interact with your database
  getMediumPost: (id) => mediumPosts.find(post => post.id === id),
  getMediumPosts: () => mediumPosts,
  getGoogleDoc: (id) => googleDocs.find(doc => doc.id === id),
  getGoogleDocs: () => googleDocs,
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  MediumPost,
  GoogleDoc,
  User,
};
