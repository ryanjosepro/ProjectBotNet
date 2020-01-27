const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log('Bot Pronto!');
    client.user.setActivity('');
})

client.on('message', async msg => {
    
    //Não responder a própria mensagem
    if (!msg.author.bot && msg.channel.type !== 'dm') {
        console.log(`${msg.author.username} disse "${msg.content}"`);

        let msgFormt = msg.content.toLowerCase().trim();
        let phrase = '';
        let isPhrase = true;

        //Mensagens legais
        if (msgFormt.includes('bom dia')) {
            phrase = `Bom dia meu amigo, já tomou aquele café?`;
        } else if (msgFormt.includes('boa tarde')) {
            phrase = `Boa tarde meu amigo, já bateu aquele prato?`;
        } else if (msgFormt.includes('boa noite')) {
            phrase = `Boa noite meu amigo, como foi seu dia?`;
        } else isPhrase = false;

        if (isPhrase) msg.reply(phrase, {tts: true});

        //Calcular
        if (msg.content.split(' ')[0].trim() === 'calcule') {
            let exp = msg.content.slice(msg.content.split(' ')[0].length + 1);
            msg.reply(`A resposta é ${eval(exp)}`);
        }
        
        if (msg.content.toLowerCase() === 'ping') {
            msg.reply(`Pong! ${Math.round(msg.client.ping)} ms`)
        }

        //Transformar arquivos opus  em mp3
        msg.attachments.map((value) => {
            let url = value.url;
            let name = value.filename.split('.');

            if (name[name.length - 1] == 'opus') {
                name[name.length - 1] = 'mp3';

                const attach = new discord.Attachment(url, name.join('.'));
                
                msg.reply(attach);
            }
        });
    }
})

client.login(config.token);