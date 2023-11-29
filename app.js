var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  if (request.url === '/fav.ico') {
    // Serve the .ico file
    fs.readFile('./fav.ico', function (err, icon) {
      if (err) {
        throw err;
      }
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      response.end(icon);
    });

  } else if (request.url === '/') {
    fs.readFile('./index.html', function (err, html) {
      if (err) {
        throw err;
      } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
      }
    });

  } else {
    // Serve a 404 Not Found page for all other requests
    fs.readFile('./404.html', function (err, notFoundPage) {
      if (err) {
        // If the 404.html file is missing, you can provide a simple text response
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end('404 Not Found');
      } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(notFoundPage);
        response.end();
      }
    });
  }
}).listen(9001);