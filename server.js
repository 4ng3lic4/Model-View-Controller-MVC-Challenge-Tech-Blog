const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');

/////Creates a super simple Express app which shows the basic way to register a Handlebars view engine using this package.
//https://www.npmjs.com/package/express-handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();

const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret: 'Super secret secret',
    //Have session expire in 15 minutes
    cookie: {
      expires: 15 * 60 * 1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    }),
  };

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.statuc(path.join(__dirname, 'public')));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//
// not needed app.set('views', './views');

// app.get('/', (req, res) => {
//     res.render('home');
// });

app.use(routes);

//connect database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });