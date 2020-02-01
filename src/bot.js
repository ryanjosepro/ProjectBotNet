const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

const fetch = require('node-fetch');

const utils = require('./utils');

//Bot Events

client.on('ready', () => {
    console.log('Bot Pronto!');
    client.user.setActivity('');
})

client.on('message', async msg => {

    const responder = resposta => {
        msg.reply(resposta);
    }
    
    //Não responder a própria mensagem
    if (!msg.author.bot && msg.channel.type !== 'dm') {
        console.log(`${msg.author.username} disse "${msg.content}"`);

        //Ping
        if (msg.content.toLowerCase() === '/ping') {
            responder(`Pong! ${Math.round(msg.client.ping)} ms`)
        }

        let cmd = utils.firstWord(msg.content);

        switch (cmd) {
            //Mandar falar - Ryan only
            case '/diga':
                if (msg.author.id === '670369066573234208') {
                    let msgPara = msg.content.split('"')[2].trim();

                    if (utils.firstWord(msgPara) === 'para') {
                        let text = msg.content.split('"')[1];
                        let channel = msgPara.trim().split(' ')[1].replace(/[<>#]/g, '');

                        client.channels.get(channel).send(text);
                    }
                }
            break;

            //Calcular expressão
            case '/calcule':
                let exp = msg.content.slice(firstWord(msg.content).length + 1);
                responder(`A resposta é ${eval(exp)}`);
            break;

            //Consultar CNPJ
            case '/consulte':
                let cnpj = msg.content.split(' ')[1].replace(/[^\d]+/g,'');

                if (validarCNPJ(cnpj)) {
                    fetch (`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
                    .then(rs => rs.json())
                    .then(rs => {
                        if (rs.status === 'ERROR') {
                            responder(rs.message);
                        } else {
                            responder(`
                            **Razão Social:** ${rs.nome}
                            **Nome Fantasia:** ${rs.fantasia}
                            **CNPJ:** ${rs.cnpj}
                            **Tipo:** ${rs.tipo}
                            **Logradouro:** ${rs.logradouro}
                            **Numero:** ${rs.numero}
                            **Complemento:** ${rs.complemento}
                            **Bairro/Setor:** ${rs.bairro}
                            **Cidade:** ${rs.municipio}
                            **CEP:** ${rs.cep}
                            **Estado:** ${rs.uf}
                            **Telefone:** ${rs.telefone}
                            **Email:** ${rs.email}
                            **Data abertura:** ${rs.abertura}
                            `);
                        }
                    })
                } else {
                    responder('CNPJ inválido!')
                }
            break;
        }

        //Transformar arquivos opus em mp3
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