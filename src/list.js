const emitter = require('./emitter');
const config = require('../config');

let list = [];

const isDuplicate = title => list.some(e => e.title === title);

const countByUser = user => list.filter(e => e.by === user).length;

const add = item => {
    list.push(item);
    emitter.emit('list.add');
}

const moreThanOne = () => list.length > 1;

const getLength = () => list.length - 1;

const getQueue = (format) => list.slice(1, config.queueLimit + 1)
    .map((item, i) => `[${i + 1}] ${format(item)}`)
    .join(' ');

const getUserQueue = (user) => list.reduce((acc, cur, i) => 
    cur.by === user && i !== 0 
        ? [...acc, `[${i}] ${cur.title}`] 
        : acc
    , []);

const getFirst = () => list[0]; 

const getList = () => list;

const remove = (index) => list.splice(parseInt(index), 1);

const move = (from, to) => list.splice(to, 0, list.splice(from, 1)[0]);

module.exports = {
    isDuplicate,
    countByUser,
    add,
    moreThanOne,
    getFirst,
    getLength,
    getQueue,
    getList,
    remove,
    getUserQueue,
    move,
};
