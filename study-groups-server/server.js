const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8888;

server.use('/api',router);
server.use(middlewares);
server.listen(port, () => {
    console.log('JSON server is running');
});