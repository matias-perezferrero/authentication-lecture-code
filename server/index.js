require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require('express-session'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  authCtrl = require('./authCtrl'),
  app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

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
  