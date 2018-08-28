
//------static server--------------
// const StaticServer = require('./static-server/index');
// (new StaticServer()).start();

//------https server----------------
const HttpsServer = require('./https-server/index');
(new HttpsServer()).start();