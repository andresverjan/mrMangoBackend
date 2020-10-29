const Express = require("express");
const ExpressGraphQL = require("express-graphql");
//const Mongoose = require("mongoose");
const types = require('./graphql/schema/index')
const genericResolver = require('./graphql/resolvers')
var cors = require("cors");

const {buildSchema } = require("graphql");

const schema = buildSchema(types);
var app = Express();
//Mongoose.connect("mongodb://mrmango:mrmango123456@ds255740.mlab.com:55740/heroku_gvmzwz8n", { useNewUrlParser: true });  

//Mongoose.connect("mongodb://mrmango:mrmango123456@ds255740.mlab.com:55740/heroku_gvmzwz8n", { useNewUrlParser: true });  
//Mongoose.connect("mongodb://localhost:27017/heroku_gvmzwz8n", { useNewUrlParser: true });
app.use('*', cors());
app.use("/api", ExpressGraphQL({
    schema:    schema,
    rootValue: genericResolver,
    graphiql: true
}));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});