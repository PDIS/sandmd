const express  = require('express');
const net = require('net');
const Browser = require('browser-detect');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({ ws: true });
const codiMD = 'http://127.0.0.1:3000',
      saml = 'http://127.0.0.1:7000';

app.all("/bower_components/*", function(req, res) {
    testAndProxy(req, res, 7000, saml);
});

app.all("/saml/*", function(req, res) {
    testAndProxy(req, res, 7000, saml);
});

app.all("/css/main.css", function(req, res) {
    testAndProxy(req, res, 7000, saml);
});

app.all("/css/bootstrap.css", function(req, res) {
    testAndProxy(req, res, 7000, saml);
});

app.all("/signin", function(req, res) {
    testAndProxy(req, res, 7000, saml);
});

app.all("/", function (req, res) {
  let browser = Browser(req.headers['user-agent']);
  if (browser.name === 'ie') {
    res.sendFile(path.join(__dirname + '/ie-hint.html'));
  } else {
    testAndProxy(req, res, 3000, codiMD);
  }
});

app.get('/no-ie.png', function (req, res) {
  res.sendFile(path.join(__dirname + '/no-ie.png'));
});

app.all("/*", function(req, res) {
    testAndProxy(req, res, 3000, codiMD);
});


var server = require('http').createServer(app);
// Proxy websockets
server.on('upgrade', function (req, socket, head) {
    testAndProxyWebSocket(req, socket, head, codiMD, 3000);
});

console.log('rproxy listening on port 4444');
server.listen(4444);

function testAndProxy(req, res, port, target) {
//    console.log(req.url + ', redirecting to port ' + port);
    portInUse(port, function(isPortInUse) {
        if (isPortInUse) {
            apiProxy.web(req, res, {target: target});
        } else {
            setTimeout(function () {
                testAndProxy(req, res, port, target)
            }, 500);
        }
    });
}

function testAndProxyWebSocket(req, socket, head, target, port) {
    portInUse(port, function(isPortInUse) {
        if (isPortInUse) {
            apiProxy.ws(req, socket, head, { target: target });
        } else {
            setTimeout(function () {
                testAndProxyWebSocket(req, socket, head, target, port)
            }, 500);
        }
    });
}

var portInUse = function(port, callback) {
    var server = net.createServer(function(socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(port, '127.0.0.1');
    server.on('error', function (e) {
        callback(true);
    });
    server.on('listening', function (e) {
        server.close();
        callback(false);
    });
};

