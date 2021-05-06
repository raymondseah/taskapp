require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT;
const path = require('path')


///////////////////////
//     mongoose      //
///////////////////////
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.set("useFindAndModify", false);

app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());

///////////////////////
//     controller    //
///////////////////////
const userControllers = require("./controllers/userController");
const taskControllers = require("./controllers/taskController");


///////////////////////
//     routes        //
///////////////////////
// Test Connection
app.get("/api/v1", (req, res) => {
  res.json({
    message: "Server is Running",
  });
});

///////////////////////
// USER Controller/////
///////////////////////
// user registration
app.post("/api/v1/users/register", userControllers.register);
// user login route
app.post("/api/v1/users/login", userControllers.login);
// user logout
app.post("/api/v1/users/login", userControllers.logout);
// getUserInfo
app.get("/api/v1/users/infor", verifyJWT, userControllers.getUserInfo);

///////////////////////
// Task Controller   //
///////////////////////
// task creation
app.post("/api/v1/task/create", taskControllers.createTask);
// product get
app.get("/api/v1/tasks", verifyJWT, taskControllers.getAllTasks);
// product delete
app.delete("/api/v1/task/:id", taskControllers.deleteTaskById);
// update product
app.put("/api/v1/task/:id", taskControllers.updateTaskById);
// update product completion by id
app.put("/api/v1/taskcomplete/:id", taskControllers.updateCompletionById);


///////////////////////
//     listener      //
///////////////////////
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    // DB connected successfully
    console.log("DB connection successful");

    app.listen(process.env.PORT || port, () => {
      console.log(`e-com app listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function verifyJWT(req, res, next) {
  // get the jwt token from the request header
  const authToken = req.headers.auth_token;

  // check if authToken header value is empty, return err if empty
  if (!authToken) {
    res.json({
      success: false,
      msg: "Auth header value is missing",
    });
    return;
  }

  // verify that JWT is valid and not expired
  try {
    // if verify success, proceed
    const userData = jwt.verify(authToken, process.env.JWT_SECRET, {
      algorithms: ["HS384"],
    });
    // store jwt token into res.locals.jwtData
    res.locals.jwtData = userData;
    next();
  } catch (err) {
    // if fail, return error msg

    res.json({
      success: false,
      msg: "Auth token is invalid",
    });
    return;
  }
}

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
