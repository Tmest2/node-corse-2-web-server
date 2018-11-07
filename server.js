const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var welcome = 'welcome this page'



var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    //console.log(`${ now }: ${ req.method } ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('undable to append to server.log');
        }

    });
    next();
});
//app.use((req, res, next) => {
//    res.render('maitens.hbs');

//        next();
//});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()

});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();

});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomep: welcome,
    })

});
app.get('/about', (req, res) => {
    res.render('About.hbs', {
    pageTitle: 'About Page',
    })
 
});
app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomep: welcome,
    })

});

app.get('/bad', (req, res) => {
    res.send({
        error: 'not found'
    })
});

app.listen(3000, () => {
console.log('server up at port 3000')
}
    );
