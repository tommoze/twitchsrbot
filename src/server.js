const express = require('express');
const list = require('./list');
const emitter = require('./emitter');

const app = express();
app.set('view engine', 'pug')
app.set('views','./src/views');
const port = 3000;

app.get('/', (req, res) => {
    res.render('index', { list: list })
});

app.get('/delete', function (req, res) {
    if (req.query.index) {
        const out = list.splice(parseInt(req.query.index), 1);

        if (req.query.notfound) {
            emitter.emit('notfound', out);
        }

        res.send({});
    } else {
        res.redirect('/');
    }
});

app.get('/moveup', function(req, res) {
    if (req.query.index) {
        const index = parseInt(req.query.index);
        if (parseInt(req.query.index) !== 0) {
            list.splice(index - 1, 0, list.splice(index, 1)[0]);
            res.send({});
        }
    } else {
        res.redirect('/');
    }
});

app.get('/movedown', function(req, res) {
    if (req.query.index) {
        const index = parseInt(req.query.index);
        if (index !== list.length - 1) {
            list.splice(index + 1, 0, list.splice(index, 1)[0]);
            res.send({});
        }
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => console.log(`* Open http://localhost:3000 to manage`));
