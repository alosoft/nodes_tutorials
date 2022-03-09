const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

// middlewares
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${req.method} ${req.url} ${res.statusCode} ${now} \n`;
    fs.appendFile('server.log', log, err => {
        if (err) console.log(err);
    })
    console.log(log)
    next();
})
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

// hbs config
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getYear', () => new Date().getFullYear())

// express view engine
app.set('view engine', 'hbs');

// routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        year: new Date().getFullYear()
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Projects'
    })
})

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})