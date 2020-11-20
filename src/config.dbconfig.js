const config = {
    user: "emojilevelsAcc",
    password: "discordbot",
    server: "10.0.0.2",
    driver: 'tedious',
    database: "EmojiLevelsDB",
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: "YUVAL"
    },
    port: 1433
}

module.exports = config;