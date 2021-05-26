//Bibliotecas Usadas.
const Discord = require('discord.js');
const bot = new Discord.Client;
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

//Quando o bot receber uma Mensagem...
bot.on('message', msg => {
//Se o autor da mensagem for o bot, não fazer nada. 
  if (msg.author.bot) return;
//Vê em qual Canal de Voz o Usuario está.
  const channelv = msg.member.voice.channel;
//Definindo o Comando.
    if (msg.content === 'coloque o prefixo, e em seguida o comando. Sem espaços.') {
//Se o bot não encontrar o Canal de Voz...
    if (!channelv) {
//Mandar no Console:
      console.log('Canal não encontrado.')
//Responder no Discord:
      msg.reply('Desculpe, mas você não está conectado em uma Sala de Voz.`');
    }
//Se o bot achar o Canal de Voz...
    if (channelv) {
//Mandar no Console:
      console.log('O canal foi Encontrado!!')
//Entrar no Canal de voz.
      channelv.join()
//Realizar a conexão com o ytdl para pegar a Musica.
        .then(connection => {
//Definindo a Musica que ira tocar.
          const stream = ytdl('link da Musica', { filter: 'audioonly' });
          const DJ = connection.play(stream, streamOptions)
//Se a musica terminar...
          DJ.on('finish', finish => {
//Sair do Canal de Voz
            channelv.leave();

          })

        })
//Dizer o erro no Console
        .catch(console.error);

    }
    
  }
  
bot.login('token do seu bot')
