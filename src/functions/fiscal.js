const fetch = require('node-fetch');

const consultaCNPJ = (msg, cnpj) => {
    if (utils.checkCNPJ(cnpj)) {
        fetch (`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
        .then(rs => rs.json())
        .then(rs => {
            if (rs.status === 'ERROR') {
                msg.reply(rs.message);
            } else {
                msg.reply(`
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
        msg.reply('CNPJ inválido!');
    }
}

module.exports = {consultaCNPJ};