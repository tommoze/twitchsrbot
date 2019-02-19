const EventEmitter = require('events');

class Emitter extends EventEmitter {}
const emitter = new Emitter();
emitter.setMaxListeners(0);

module.exports = emitter;
