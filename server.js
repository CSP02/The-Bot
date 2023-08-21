const express = require('express');
const server = express();

function keepAlive() {
	server.listen(3000, () => {
		console.log("server is ready")
	});
}
module.export = keepAlive();