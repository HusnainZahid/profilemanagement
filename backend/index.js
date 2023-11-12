const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/index");
var cors = require('cors');

app.use(express.json());

app.use(cors())
app.options('*', cors());

global.__basedir = __dirname;
app.use(express.static(__dirname + '/assets'));

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

let port = 8088;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
