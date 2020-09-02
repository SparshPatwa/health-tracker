// NPM module import
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./util/connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');
const path = require('path');

// Debugging
const debugON = 1;

// Create the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware and make it persistent
var userSessionStore = new SequelizeStore(
    {
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 5 * 60 * 1000
    }
);
app.use(
    session
    ({
        // TODO::sparshpatwa
        secret: 'randomly generate this via env file',
        resave: false,
        saveUninitialized: true,
        cookie: {},
        store: userSessionStore
    })
);

// Configure javascript/stylesheet files as static
app.use(express.static(path.join(__dirname, 'public')));

// Configure Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Turn on Controllers
app.use(routes);

// Connect to DB and then start SERVER
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() =>
{
    app.listen(PORT, () => {
        if(debugON) console.log('Listening on localhost:'+PORT);
    });
});
