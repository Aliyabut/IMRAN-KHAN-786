module.exports.config = {
  name: "owner",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "Friends Dp photos",
  commandCategory: "Random-IMG",
  usages: "bestie dp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/mxPPatY.jpeg"
     ];
     var callback = () => api.sendMessage({body:`🔰𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊🔰

   𝐌𝐑..𝐀𝐁𝐃𝐔𝐋 𝐁𝐀𝐁𝐔..•◡•)

𝐀𝐠𝐞 : 22

𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 𝐖𝐢𝐭𝐡 : 𝐒𝐈𝐍𝐆𝐋𝐄 𝐁𝐇𝐀𝐓𝐀𝐊 𝐑𝐇𝐀 𝐇𝐀𝐈

𝐅𝐫𝐨𝐦 : 𝐁𝐈𝐊𝐀𝐍𝐄𝐑 (𝐑.𝐉)

𝐒𝐭𝐮𝐝𝐲 : 𝐂𝐨𝐦𝐩𝐮𝐭𝐞𝐫 𝐏𝐫𝐨𝐠𝐫𝐚𝐦𝐦𝐢𝐧𝐠

𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤  : https://www.facebook.com/ghg.hhgkh?mibextid=ZbWKwL

𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 : 9253XXX553

ALLAH HU AKBAR 🌍❤️🙂!❤🙂♣️`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
