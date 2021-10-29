require('dotenv').config();

const { Client, CategoryChannel } = require('discord.js');
const sql = require('mssql');
const config = require("./config.dbconfig.js");
const client = new Client();
const codealongcategories = new Array();

async function updateUserInfo(id, level, username) {
    try {
        let pool = await sql.connect(config);
        const { recordset: users } = await pool.request().query(`SELECT * FROM users WHERE id = '${id}'`);
        let updated = false;
        if(Object.keys(users).length > 0) {
            users.map(async (user) => {
                if (user.id = id) {
                    await pool.request().query(`update users set level = ${level} where id = '${id}'`);
                    updated = true;
                }
                if (!updated) {
                    await pool.request().query(`insert into users (id,level,username) values ('${id}',${0},'${username}')`);
                }
            });
        }
        else
            await pool.request().query(`insert into users (id,level,username) values ('${id}',${0},'${username}')`);
    } catch (err) {
        console.log("err: " + err)
    }
}

async function getUserLevel(id) {
    let pool = await sql.connect(config)
    const { recordset: users } = await pool.request().query(`SELECT level FROM users WHERE id = '${id}'`);
    if (users[0] !== undefined)
        return parseInt(users[0].level)
    return -1;
}

client.on('ready', async () => {
    client.channels.cache.map(channel => {
        if (channel.type === "text" && channel.parent.name === "CODE ALONG")
            codealongcategories.push(channel.name);
    })

    
});

client.on('messageReactionAdd', async (reaction, user) => {
    const { name } = reaction.emoji;
    if (!reaction.message.guild) return;
    if (reaction.message.author.bot) return;
    const level = await getUserLevel(reaction.message.author.id).then(function (v) { return parseInt(v) }) + 1;
    const member = reaction.message.guild.members.cache.get(reaction.message.author.id);
    if (name === "✅" && codealongcategories.includes(reaction.message.channel.name)) {
        updateUserInfo(reaction.message.author.id, level, reaction.message.author.username)
        const channel = client.channels.cache.find(channel => channel.name === "leveling-channel");
        channel.send(`${reaction.message.author.username} just leveled up to level: ${level}!`);
        switch (level) {
            case 3:
                member.roles.add("776537972732329985");
                channel.send(`${reaction.message.author.username} just achieved the role: Little Helper!`);
                break;
            case 8:
                member.roles.add("776538146249637899");
                channel.send(`${reaction.message.author.username} just achieved the role: Gets The Job Done!`);
                break;
            case 15:
                member.roles.add("776538331176501248");
                channel.send(`${reaction.message.author.username} just achieved the role: He Shall Answer!`);
                break;
            case 27:
                role = reaction.message.roles.find(r => r.name === "");
                member.roles.add("776538452627816499");
                channel.send(`${reaction.message.author.username} just achieved the role: Steve Jobie!`);
                break;
            case 50:
                member.roles.add("776539314439061535");
                channel.send(`${reaction.message.author.username} just achieved the role: Ada Lovelace's Assistant!`);
                break;
        }
    }
});

//client.login("Nzc2NTU3NjUxNjQzNDY1NzU5.X62nqw.-sqMlSdyQAMcT_Eg8sXL-gq5UPo");
client.login(process.env.DISCORDJS_BOT_TOKEN);