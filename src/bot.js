/*
BOTNET - 1.0

/ping = Retorna o tempo de resposta do servidor;
/consultaCNPJ = Consulta um CNPJ;

-Arquivos opus são transformados em mp3;
*/

const discord = require('discord.js');
const client = new discord.Client();
const config = require('./.env');

const utils = require('./utils/utils');

//Bot Functions
const botGeneral = require('./functions/general');
const botFiscal = require('./functions/fiscal');

//Bot Events

client.on('ready', () => {
    console.log('Bot Pronto!');
    client.user.setActivity('');
})

client.on('message', async msg => {

    //Não responder a própria mensagem
    if (!msg.author.bot) {
        console.log(`${msg.author.username} disse "${msg.content}"`);

        if (msg.content) {
            let command = utils.commandToObj(msg.content);

            switch (command.command) {
                //Ping
                case '/ping':
                    botGeneral.ping(msg);
                break;

                //Consultar CNPJ
                case '/consultaCNPJ':
                    let cnpj = command.contents[0].replace(/[^\d]+/g,'');

                    botFiscal.consultaCNPJ(msg, cnpj);
                break;
            }
        }
        
        //Transformar arquivos opus em mp3
        if (msg.attachments.size > 0) {
            botGeneral.opusToMp3(msg, msg.attachments);
        }
    }
})

client.login(config.token);