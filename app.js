const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const fs = require("fs");

let data = {
    users: []
};

let selectedUser;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('index.pug');
})

app.post('/', (req, res) => {
    data.users.push({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    const write = fs.createWriteStream('info.json');
    let writable = JSON.stringify(data, null, 2);
    write.write(writable)
    res.redirect("/viewUsers")
})

app.get('/create-account', (req, res) => {
    res.render('createUser.pug');
})

app.get('/viewUsers', (req, res) => {
    if(data.users.length == 0) {
        res.render('noUsers.pug');
    } else {
        res.render('viewUsers.pug', {data: data.users})
    }
})

app.post('/viewUsers', (req, res) => {
    let obj = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }
    selectedUser = obj;
    res.redirect('/editUser')
})

app.post("/deleteUser", (req, res) => {
    let toDelete = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }
    let dIdx = data.users.findIndex(user => user.username == toDelete.username);
    data.users.splice(dIdx, 1);
    res.redirect('/viewUsers');
})

app.get('/delete-user', (req, res) => {
    res.send("<h1>Delete user</h1>")
})

app.post('/editUser', (req, res) => {
    let idx = data.users.findIndex(user => user.username == selectedUser.username);
    data.users[idx] = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }
    res.redirect('/viewUsers');
})

app.get("/editUser", (req, res) => {
    res.render('editUser.pug', { data: selectedUser });
})

app.listen(port, () => {
    console.log(`\nServer running on port ${port}`);
})
