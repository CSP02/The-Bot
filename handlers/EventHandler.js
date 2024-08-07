const fs = require("fs");

module.exports = (Discord, client) => {
    const loadDir = (dir) => { //? Load the events from the events directories (client and guild) 
        const events = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith("js")); //? Filter the files with only js files

        [...events].forEach(eventFile => { //? Loop through each file and bind the client events
            const event = require(`../events/${dir}/${eventFile}`);
            const eventName = event.name; //? Name of the event

            client.on(eventName, (e) => event.run(Discord, client, e)) //? Handle the specific event using "eventName"
        })
    };

    ["client", "guild"].forEach(dir => {
        loadDir(dir);
    }); //? Loop through events folder
}