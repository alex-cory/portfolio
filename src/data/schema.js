/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  MediumPost,
  getMediumPost,
  getMediumPosts,

  GoogleDoc,
  getGoogleDoc,
  getGoogleDocs,

  Repo,
  getRepo,
  getRepos,

  User,
  getUser,
  getViewer
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
let {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    let {type, id} = fromGlobalId(globalId);
    if (type === 'MediumPost') {
      return getMediumPost(id);
    } else if (type === 'GoogleDoc') {
      return getGoogleDoc(id);
    } else if (type === 'Repo') {
      return getRepo(id);
    } else if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof MediumPost) {
      return mediumPostType;
    } else if (obj instanceof GoogleDoc) {
      return googleDocType;
    } else if (obj instanceof Repo) {
      return repoType;
    } else if (obj instanceof User) {
      return userType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

let mediumPostType = new GraphQLObjectType({
  name: 'MediumPost',
  description: 'A story/post from Alex\'s Medium!',
  fields: () => ({
    id: globalIdField('MediumPost'),
    title: {
      type: GraphQLString,
      description: 'The title of the Medium post',
    },
    date: {
      type: GraphQLString, /* TODO: change this to int I think */
      description: 'The date when the blog was published'
    },
    url: {
      type: GraphQLString,
      description: 'The url leading to the medium post'
    },
    content: {
      type: GraphQLString,
      description: 'The short description of the medium post'
    },
    image: {
      type: GraphQLString,
      description: 'The image for the medium post'
    },
    likes: {
      type: GraphQLInt,
      description: 'The amount of likes for this medium post'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the author of the medium post'
    },
    username: {
      type: GraphQLString,
      description: 'The username of the author of the medium post'
    }
  }),
  interfaces: [nodeInterface],
});

let googleDocType = new GraphQLObjectType({
  name: 'GoogleDoc',
  description: 'A file from Google Drive!',
  fields: () => ({
    id: globalIdField('GoogleDoc'),
    name: {
      type: GraphQLString,
      description: 'The name of the file'
    },
    url: {
      type: GraphQLString,
      description: 'The url linking directly to the image or video'
    },
    iframe: {
      type: GraphQLString,
      description: 'The url used for the iframe'
    },
    thumb: {
      type: GraphQLString,
      description: 'Image thumbnail',
    },
    caption: {
      type: GraphQLString,
      description: 'A short description of what\'s going on in the image/video'
    },
    downloadUrl: {
      type: GraphQLString,
      description: 'This is a url that will instantly download the file'
    },
    isImage: {
      type: GraphQLBoolean,
      description: 'Is the file an image?'
    }
  }),
  interfaces: [nodeInterface],
});

let repoType = new GraphQLObjectType({
  name: 'Repo',
  description: 'A repository from github',
  fields: () => ({
    id: globalIdField('Repo'),
    name: {
      type: GraphQLString,
      description: 'the name of the repository'
    },
    url: {
      type: GraphQLString,
      description: 'url to the repository'
    },
    description: {
      type: GraphQLString,
      description: 'the description of the repository'
    },
    stars: {
      type: GraphQLInt,
      description: 'the stargazers count for the repository'
    },
    forks: {
      type: GraphQLInt,
      description: 'the amount of forks the repository has'
    },
    downloadUrl: {
      type: GraphQLString,
      description: 'url for automatic download of the repository'
    },
    imageUrl: {
      type: GraphQLString,
      description: 'raw url to the repository\'s image'
    },
    image: {
      type: GraphQLString,
      description: 'when complete will be the local path to the repos image'
    }
  })
})

let userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    mediumPosts: {
      type: mediumPostConnection,
      description: 'A collection of Alex\'s Medium posts',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getMediumPosts(), args)
    },
    googleDocs: {
      type: googleDocConnection,
      description: 'A person\'s google drive files from within the specified folder',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getGoogleDocs(), args),
    },
    repos: {
      type: repoConnection,
      description: 'The repositories from the specified user\'s github.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getRepos(), args),
    }
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
let {connectionType: mediumPostConnection} =
  connectionDefinitions({name: 'MediumPost', nodeType: mediumPostType});

let {connectionType: googleDocConnection} =
  connectionDefinitions({name: 'GoogleDoc', nodeType: googleDocType});

let {connectionType: repoConnection} =
  connectionDefinitions({name: 'Repo', nodeType: repoType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    }
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export let Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
