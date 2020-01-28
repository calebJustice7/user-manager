const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('index.pug');
})

app.get('/createUser', (req, res) => {
    res.render('createUser.pug')
})

app.listen(port, () => {
    console.log(`\nServer running on port ${port}`);
})
