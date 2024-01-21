
process.on('uncaughtException', (err) => {
    console.log('Unhandled Exception', err, err.stack, new Error(err.code).stack.split('\n').slice(0, 10));
});

process.on('uncaughtRejection', (err) => {
    console.log('Unhandled Rejection', err, new Error(err.code).stack.split('\n').slice(0, 10));
});
const path = require('path');
global.appRoot = path.resolve(__dirname);
const container = require('./di');
const server = require('./server');
server(container).then((app) => {
    const { port } = container.resolve('serverConfig');
    if (!port) {
        console.log('Port not found, Please check server-config.js');
        return;
    }
    const finalApp = app.listen(port, () => {
        console.log(`Server started successfully, running on port: ${container.cradle.serverConfig.port}.`);
    });
    finalApp.on('close', () => {
        // Do something like close db connection
    });
});
