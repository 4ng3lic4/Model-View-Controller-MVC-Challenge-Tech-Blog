 
//ASK 
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3001;
//

/**REVIEW IF THIS CODE IS CORRECT */


//Creates a super simple Express app which shows the basic way to register a Handlebars view engine using this package.
//https://www.npmjs.com/package/express-handlebars
const express = require('express');
const session = require('express-session');
const app = express();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })}

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


///ASK BCS
const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//ASK
// not needed app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });