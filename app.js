var http = require('http');
var fs = require('fs');

fs.readFile('./index.html', function (err, html) {
  
  if (err) {
    throw err;
  }

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
      // Serve the HTML file for the root URL
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    } else {
      // Serve a custom 404 Not Found page for all other requests
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end(`404`);
    }
  }).listen(9001);

});