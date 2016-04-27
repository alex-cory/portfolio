/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
import mediumPostsData from '../apis/scrape-medium/data.json'
import googleDocsData from '../apis/google-drive/data.json'
import githubReposData from '../apis/github/data.json'

// Model types
import MediumPost from './MediumPost.js'
import GoogleDoc from './GoogleDoc.js'
import Repo from './Repo.js'
import User from './User.js'

var mediumPosts = mediumPostsData.map((data, i) => {
  return new MediumPost(
    `${i}`,
    data.title,
    `${data.date}`,
    data.url,
    data.content,
    data.image,
    data.likes
  )
})

var googleDocs = googleDocsData.map((data, i) => {
  return new GoogleDoc(
    data.id,             // id
    data.title,          // name
    data.description,    // caption
    data.parents[0].id,  // folderId
    data.thumbnailLink,  // thumb
    data.webContentLink, // downloadUrl
    data.mimeType        // type
  )
})

let githubRepos = githubReposData.map((data, i) => {
  return new Repo(
    `${i}`,           // id
    data.name,        // name
    data.url,         // url to repo
    data.description, // description
    data.stars,       // stargazers count
    data.forks,       // forks count
    data.downloadUrl, // url for automatic download
    data.imageUrl,    // raw url to repo image
    data.image        // TODO: once working, local path to the repos image
  )
})

// Mock data
let viewer = new User(
  '1',        // id
  'Anonymous' // name
)

module.exports = {
  // Export methods that your schema can use to interact with your database
  MediumPost,
  getMediumPost: (id) => mediumPosts.find(post => post.id === id),
  getMediumPosts: () => mediumPosts,
  GoogleDoc,
  getGoogleDoc: (id) => googleDocs.find(doc => doc.id === id),
  getGoogleDocs: () => googleDocs,
  Repo,
  getRepo: (id) => githubRepos.find(repo => repo.id === id),
  getRepos: () => githubRepos,
  User,
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
}
