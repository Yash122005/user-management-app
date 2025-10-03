const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user')

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/read', async (req, res) => {
  let users = await userModel.find({});
  res.render('read',{users});
});

app.post('/create', async (req, res) => {
    const { name, email, image } = req.body;
    console.log(`Name: ${name}, Email: ${email}`);
   let createdUser =  await userModel.create({
        name,email,image
    });
    res.redirect('/read');

});
app.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    let user = await userModel.findById(userId);
    res.render('edit',{user});

});
app.post('/update/:id', async (req, res) => {
    const { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, {
        name, email, image
    });
    res.redirect('/read');
    
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});