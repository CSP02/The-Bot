const express = require('express');
const server = express();
const path = require('path');
const fileName = 'site/page.html'
let page = ''

server.all('/', (req, res) => {
	res.sendFile(fileName, options = { root: path.join(__dirname) }, function(err) {
		if (err) {
			console.log(err)
		} else {
			console.log('Sent:', fileName);
		}
	})
})


function keepAlive() {
	server.listen(3000, () => {
		console.log("server is ready")
	});
}
module.export = keepAlive();