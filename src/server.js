const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const list = require('./list');
const emitter = require('./emitter');
const login = require('../login');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const update = (socket) => socket.emit('list.update', list.getList());

// socket.io server
io.on('connection', socket => {
    emitter.on('list.add', () => update(socket));
    emitter.on('list.remove', () => update(socket));
    emitter.on('list.move', () => update(socket));

    socket.on('list.delete', (index, notFound) => {
        const out = list.remove(index);
        emitter.emit('list.remove');
        notFound && emitter.emit('notfound', out);
    });

    socket.on('list.move', (from, to) => {
        list.move(from, to);
        emitter.emit('list.move');
    }); 
});

nextApp.prepare().then(() => {
    app.get('/list', (req, res) => {
        res.json({ list: list.getList() });
    });

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`* Ready on http://localhost:${port}`);
        require('./twitch');
        if (login.clientId['Client-ID']) {
            const api = require('./api');
            api.setStreamerId();
        }
    })
});
