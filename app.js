const express = require('express');
const path = require('path');
require("dotenv").config();

const { User, connectDB } = require('./models/user');

const app = express();
const port = 3000;

// connect DB
connectDB();

// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read', async (req, res) => {
  let users = await User.find({});
  res.render('read', { users });
});

app.post('/create', async (req, res) => {
  const { name, email, image } = req.body;
  console.log(`Name: ${name}, Email: ${email}`);
  await User.create({ name, email, image });
  res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  res.render('edit', { user });
});

app.post('/update/:id', async (req, res) => {
  const { name, email, image } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, image });
  res.redirect('/read');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
