module.exports = {
	name:'toggler.js',
	description:'sends the cdn link and docs links for toggler.js',
	syntax:"!toggler.js",
	execute(client, message, args, Discord){
 message.channel.send("Link for Toggler CDN:\n https://cdn.jsdelivr.net/gh/Chandra-sekhar-pilla/Toggler@main/Toggler.js\n\nToggler Docs:\nhttps://the-atelier.ml/Pages/Toggler/toggler.html")
}

}  