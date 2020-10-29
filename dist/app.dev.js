"use strict";

var Express = require("express");

var ExpressGraphQL = require("express-graphql"); //const Mongoose = require("mongoose");


var types = require('./graphql/schema/index');

var genericResolver = require('./graphql/resolvers');

var cors = require("cors");

var _require = require("graphql"),
    buildSchema = _require.buildSchema;

var schema = buildSchema(types);
var app = Express(); //Mongoose.connect("mongodb://mrmango:mrmango123456@ds255740.mlab.com:55740/heroku_gvmzwz8n", { useNewUrlParser: true });  
//Mongoose.connect("mongodb://mrmango:mrmango123456@ds255740.mlab.com:55740/heroku_gvmzwz8n", { useNewUrlParser: true });  
//Mongoose.connect("mongodb://localhost:27017/heroku_gvmzwz8n", { useNewUrlParser: true });

app.use('*', cors());
app.use("/api", ExpressGraphQL({
  schema: schema,
  rootValue: genericResolver,
  graphiql: true
}));

var db = require("./models");

db.sequelize.sync({
  force: false
}).then(function () {
  console.log("Drop and re-sync db.");
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Our app is running on port ".concat(PORT));
});