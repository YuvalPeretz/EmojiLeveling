const config = {
    user: "emojilevelsAcc",
    password: "discordbot",
    server: "10.0.0.2",
    database: "EmojiLevelsDB",
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: "YUVAL"
    },
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    },
    port: 1433
}

module.exports = config;