require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require('express-session'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  authCtrl = require('./authCtrl'),
  validations = require('./middlewares/validations')
  app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

//The server behind the scenes has a table now
// cookies               | sessions
// asdhashdgasdkhasd1234 | {}

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    console.log("Database connected");
    app.set("db", dbInstance);
    //app.db = dbInstance

    app.listen(SERVER_PORT, () =>
      console.log(`Server running on ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));


  //Auth endpoints
  app.post('/api/register', authCtrl.register)
  app.post('/api/login', authCtrl.login)
  app.get('/api/logout', authCtrl.logout)



  //Posts endpoints
  app.post('/api/posts', validations.isLoggedIn, (req, res) => console.log('You made a post!'))

  // app.post('/admin/posts', isAdmin, (req, res) => console.log('You made a post!'))