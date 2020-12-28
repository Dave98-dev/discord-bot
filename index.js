const frasi = require("./frasi-plagio");
const stateMapper = require("./state-interface");
const emojis = require("./emojis")

let stato = stateMapper.nonInit;

const token = "NzkzMDc0NzMxODM0MTQ2ODQ2.X-m-Zg.JkdBNMKQJ3lcP9Us6DwqzTuDPtk";

const Discord = require('discord.js');
const client = new Discord.Client();

let mainChannel = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let sentenceArray = []
let fraseCorrente = null

client.on('message', msg => {
if(msg.member != "test bot plagio#3925"){
  if (msg.content === '!init') {

    stato = stateMapper.fraseDetta;

    fraseCorrente = frasi[0];

    const initMsg = new Discord.MessageEmbed()
        .setTitle(`${fraseCorrente.inizio} ... `);

    sentenceArray.push(fraseCorrente.continuo)

    mainChannel = msg.channel;

    msg.channel.send(initMsg)
  }
  else if(stato === stateMapper.fraseDetta){
      if(msg.content === "!show"){
        const showMsg = new Discord.MessageEmbed()
        let stringToShow = "";
        let indexes = []
        sentenceArray.forEach((sentence,index)=> {
          stringToShow += `${index +1 } - ${sentence}\n`
          indexes.push(index)
        });
        
        msg.channel.send(stringToShow).then(message =>{
          indexes.forEach(el => {
            message.react(emojis[el])            
          });
        })

      }else if(msg.content.includes("!send") && msg.channel.type === "dm"){
          sentenceArray.push(msg.content.replace("!send ","").trim());
          mainChannel.send(`${msg.channel.recipient.username} ha inviato la frase`)
      }
  }
}
});


client.login(token);