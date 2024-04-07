module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "CatalizCS",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "djt me Hoàn simp Dũng lỏ" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`► 𝕾𝖚𝖈𝖈𝖊𝖘𝖘𝖋𝖚𝖑  𝕮𝖔𝖓𝖓𝖊𝖈𝖙𝖎𝖔𝖓 ◄\n\n🌸 𝗛𝗶 𝗡𝗮𝗯𝗮𝗹𝗶𝗸𝗼 𝗠𝗲𝗿𝗮 𝗡𝗮𝗺𝗲 𝗛𝗮𝗶 𝄟✮͢🦋⃟≛𝑳𝑨𝑭𝑨𝑵𝑮𝑨 𝑩𝑶𝑻༻☻🐰⃕⃝𒌋𝆺𝅥♥⃝🦋 𝗠𝗲 𝗥𝗼𝗯𝗼𝘁 𝗛𝘂 𝗝𝗶𝘀𝗸𝗼 𝐌𝐑..𝐀𝐁𝐃𝐔𝐋  𝗡𝗲 𝗕𝗮𝗻𝗮𝘆𝗮 𝗵𝗮𝗶. 𝗠𝗲𝗿𝗲 𝗕𝗮𝗿𝗲 𝗠𝗲 𝗢𝗿 𝗝𝗮𝗻𝗻𝗲 𝗞𝗲 𝗟𝗶𝘆𝗲 𝗣𝗿𝗲𝗳𝗶𝘅 𝗟𝗶𝗸𝗵𝗲 ☺️ 🌸\n◆━━━━━━━━━━━◆\n𝗛𝗮𝗺 𝗕𝗵𝗶 𝗔𝗮𝗴𝘆𝗲 𝗜𝘀 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲 𝗕𝗼𝗿𝗶𝘆𝗮 𝗕𝗶𝘀𝘁𝗮𝗿 𝗟𝗲𝗸𝗮𝗿 😁🤣 💟`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/intro.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝗖𝗵𝘂̉ 𝗡𝗵𝗮̣̂𝘁'
  if (thu == 'Monday') thu = '𝗧𝗵𝘂̛́ 𝗛𝗮𝗶'
  if (thu == 'Tuesday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮'
  if (thu == 'Wednesday') thu = '𝗧𝗵𝘂̛́ 𝗧𝘂̛'
  if (thu == "Thursday") thu = '𝗧𝗵𝘂̛́ 𝗡𝗮̆𝗺'
  if (thu == 'Friday') thu = '𝗧𝗵𝘂̛́ 𝗦𝗮́𝘂'
  if (thu == 'Saturday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮̉𝘆'
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = '𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗛𝗢 𝗚𝗬𝗔 𝗧𝗨𝗠𝗛𝗔𝗥𝗔\n━━━━━━━━━━━━━\n💗 𝐇𝐞𝐥𝐥𝐨 𝐁𝐚𝐛𝐲 {name}.\n🐳 𝗦𝘄𝗮𝗴𝗮𝘁 𝗛𝗮𝗶 𝗧𝘂𝗺𝗵𝗮𝗿𝗮🥰 {name}.\n𝗛𝗮𝗺𝗮𝗿𝗲 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲 {threadName}.\n{type} 𝗢𝗿 𝗧𝘂𝗺 𝗜𝘀 𝗚𝗿𝗼𝘂𝗽 𝗞𝗲  {soThanhVien} 𝗠𝗲𝗺𝗯𝗲𝗿 𝗛𝗼 🎀\n𝗘𝗻𝗷𝗼𝘆 𝗞𝗮𝗿𝗼 𝗠𝗮𝗷𝗲 𝗟𝗼 🥰 {ngay} {gio} ⏰\n━━━━━━━━━━━━━\n𝗠𝗲𝗿𝗮 𝗣𝗿𝗲𝗳𝗶𝘅 [ . ] 𝗛𝗮𝗶 𝗘𝗻𝗷𝗼𝘆 𝗔𝗹𝘄𝗮𝘆𝘀 𝗦𝗺𝗶𝗹𝗶𝗻𝗴 🥰🍀' : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  '𝗖𝗮́𝗰 𝗯𝗮̣𝗻' : '𝗕𝗮̣𝗻')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName)
      .replace(/\{thu}/g, thu)
      .replace(/\{ngay}/g, ngay)
      .replace(/\{gio}/g, gio);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}