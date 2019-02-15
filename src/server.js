const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const list = require('./list');
const emitter = require('./emitter');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

function move(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
};

// socket.io server
io.on('connection', socket => {
    emitter.on('list.add', (list) => {
        socket.emit('list.update', list);
    });

    socket.on('list.delete', (index, notFound) => {
        list.splice(parseInt(index), 1);
        socket.emit('list.update', list);
        notFound && emitter.emit('notfound', out);
    });

    socket.on('list.move', (from, to) => {
        move(list, from, to);
        socket.emit('list.update', list);
    }); 
})

nextApp.prepare().then(() => {
    app.get('/list', (req, res) => {
        res.json({ list });
    });

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`* Ready on http://localhost:${port}`);
        require('./twitch');
    })
})
