const express = require('express');
const server = express();
const path = require('path');
const fileName = 'site/page.html'
let page = ''

function keepAlive() {
	server.listen(3000, () => {
		console.log("server is ready")
	});
}
module.export = keepAlive();