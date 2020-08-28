const ping = msg => {
    msg.reply(`Pong! ${msg.client.ping} ms`);
}

const opusToMp3 = (msg, attachments) => {
    attachments.map((value) => {
        let url = value.url;
        let name = value.filename.split('.');

        console.log(name.pop());

        if (name[name.length - 1] == 'opus') {
            name[name.length - 1] = 'mp3';

            const attach = new discord.Attachment(url, name.join('.'));
            
            msg.reply(attach);
        }
    });
}

module.exports = {ping, opusToMp3};