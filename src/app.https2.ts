import http2 from 'http2';
import fs from 'fs';

const urlsHttps = {
	0: '/',
	1: '/css/styles.css',
	2: '/js/app.js',
};

const server = http2.createSecureServer(
	{
		key: fs.readFileSync('./keys/server.key'),
		cert: fs.readFileSync('./keys/server.crt'),
	},
	(req, res) => {
		console.log(req.url);
		// res.writeHead(200, { 'Content-type': 'text/html' });
		// res.write(`<h1>URL ${req.url}</h1>`);
		// res.end();
		// const data = { name: 'John Doe', age: 30, city: 'New York' };
		// res.writeHead(200, { 'Content-type': 'application/json' });
		// res.end(JSON.stringify(data));

		if (req.url === '/') {
			const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
			res.writeHead(200, { 'Content-type': 'text/html' });
			res.end(htmlFile);
		} else if (req.url === '/css/styles.css') {
			const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
			res.writeHead(200, { 'Content-type': 'text/css' });
			res.end(cssFile);
		} else if (req.url === '/js/app.js') {
			const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
			res.writeHead(200, { 'Content-type': 'application/javascript' });
			res.end(jsFile);
		} else {
			res.writeHead(404, { 'Content-type': 'text/html' });
			res.end();
		}
	}
);

server.listen(3000, () => {
	console.log('Server running on port 3000');
});
