const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const config = {
    user: "emojilevelsAcc",
    password: "discordbot",
    server: results.Ethernet[0],
    database: "EmojiLevelsDB",
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: "YUVAL"
    },
    port: 1433
}

module.exports = config;