import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import uuid from "uuid/v4"
import bcrypt from "bcrypt-nodejs"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/story-api"
mongoose.connect(mongoUrl, { useMongoClient: true })

mongoose.Promise = Promise

mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

const AdminInput = mongoose.model("AdminInput", {
  heading: {
    type: String,
    required: true
  },
  shortText: {
    type: String,
    required: true
  },
  longText: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
})

app.get("/", (req, res) =>
  res.send("Hello World!"))

app.post("/adminstory", (req, res) => {
  const adminStory = new AdminInput(req.body)

  adminStory.save()
    .then(() => { res.status(201).send({ answer: "Story published!" }) })
    .catch(err => { res.status(400).send(err) })
})

app.get("/adminstory", (req, res) => {
  AdminInput.find().then(allAdminInputs => {
    res.json(allAdminInputs)
  })
})

app.get("/adminstory/latest", (req, res) => {
  // AdminInput.findOne().sort({ created_at: 1 }).limit(1).then(latestAdminInput => {
  AdminInput.findOne().sort({ field: "asc", _id: -1 }).limit(1).then(latestAdminInput => {
    res.json(latestAdminInput)
  })
})

const ContactInput = mongoose.model("ContactInput", {
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

app.post("/contactform", (req, res) => {
  const userContact = new ContactInput(req.body)

  userContact.save()
    .then(() => { res.status(201).send({ answer: "Meddelande skickat" }) })
    .catch(err => { res.status(400).send(err) })
})

app.get("/contactform", (req, res) => {
  ContactInput.find().then(allContactInputs => {
    res.json(allContactInputs)
  })
})

app.delete("/contactform/:id", (req, res) => {
  ContactInput.findOneAndRemove({ _id: req.params.id })
    .then(() => { res.status(201).send("Contact message deleted in MongoDB") })
    .catch(err => { res.status(400).send(err) })
})

// model and endpoint for admin login

const AdminLogin = mongoose.model("AdminLogin", {
  username: {
    type: String,
    unique: true
  },
  password: String,
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

app.get("/", (rew, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSynd(password)

  res.send(`Signup for api. ${hash}`)
})

app.post("/adminusers", (req, res) => {
  const { username } = req.body
  const password = bcrypt.hashSync(req.body.password)
  const adminuser = new AdminLogin({ username, password })

  adminuser.save()
    . then(() => res.status(201).json(adminuser))
    .catch(err => res.status(400).json(err))
})

app.post("/adminlogin", (req, res) => {
  AdminLogin.findOne({ username: req.body.username })
    .then(adminuser => {
      console.log(adminuser)
      if (adminuser && bcrypt.compareSync(req.body.password, adminuser.password)) {
        res.json(adminuser)
      } else {
        res.status(401).json({
          errors: {
            username: "Username is invalid"
          }
        })
      }
    })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
