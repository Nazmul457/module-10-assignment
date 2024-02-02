const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Crete HTTP Server
const server = http.createServer(function (req, res) {
    const { pathname } = url.parse(req.url, true);

    // Handle different routes
    switch (pathname) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>This is Home Page</h1>');
            res.end();
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>This is About Page</h1>');
            res.end();
            break;
        case '/contact':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>This is Contact Page</h1>');
            res.end();
            break;
        case '/file-write':
            fs.writeFile('demo.txt', 'hello world', (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.write('<h1>Error writing file</h1>');
                }
                else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write('<h1>File demo.txt created and written successfully</h1>');
                }
                res.end();
            });
            return;

        case '/upload':
            // Serve the HTML file for file upload
            const htmlFile = fs.readFileSync('./index.html', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(htmlFile);
            break;

        case '/upload-file':
            // Handling file upload using multer
            upload.single('file')(req, res, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Error uploading file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('File uploaded successfully');
                }
                res.end();
            });
            return;

        default:
            res.writeHead(404, { 'Content-type' : 'text/html' });
            res.write('<h1>404 Not Found</h1>');
        }
    res.end();
});

server.listen(5500);
// Log a message when the server starts listening on port 5500
console.log('Server listening on port 5500');