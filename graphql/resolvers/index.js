//const { mergeResolvers } = require('@graphql-toolkit/schema-merging');
//const { mergeResolvers } = require('@graphql-toolkit/schema-merging');
//import path from 'path';
//import mergeResolvers from "merge-graphql-schemas";

const path = require('path');
const { mergeResolvers } = require('@graphql-toolkit/schema-merging');
const { loadFiles } = require('@graphql-toolkit/file-loading');
const resolversArray = loadFiles(path.join(__dirname, '../resolvers'));
module.exports = mergeResolvers(resolversArray);
