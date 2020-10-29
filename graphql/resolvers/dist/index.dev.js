"use strict";

//const { mergeResolvers } = require('@graphql-toolkit/schema-merging');
//const { mergeResolvers } = require('@graphql-toolkit/schema-merging');
//import path from 'path';
//import mergeResolvers from "merge-graphql-schemas";
var path = require('path');

var _require = require('@graphql-toolkit/schema-merging'),
    mergeResolvers = _require.mergeResolvers;

var _require2 = require('@graphql-toolkit/file-loading'),
    loadFiles = _require2.loadFiles;

var resolversArray = loadFiles(path.join(__dirname, '../resolvers'));
module.exports = mergeResolvers(resolversArray);