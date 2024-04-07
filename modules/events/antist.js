const FormData = require('form-data');
const axios = require('axios');
module.exports.config = {
  name: "antist",
  eventType: ["log:thread-name",
    "log:user-nickname",
    "change_thread_image", 'log:thread-icon', "log:thread-color"],
  version: "1.0.1",
  credits: "DungUwU",
  description: "Cấm thay cái gì đó trong nhóm",
  dependencies: {
    "axios": "",
    "fs": "",
    "imgbb-uploader": ""
  }
};

module.exports.run = async function ({
  api, event, Threads
}) {
  const {
    logMessageType,
    logMessageData,
    author,
    threadID
  } = event;
  const threadInfo = (global.data.threadInfo.get(threadID) || await Threads.getInfo(threadID));
  const find = threadInfo.adminIDs.find(el => el.id == author);
  const validUIDs = [api.getCurrentUserID(),
  ...global.config.ADMINBOT,
  ...global.config.NDH];
  const isValid = find || validUIDs.some(e => e == author);

  if (event.isGroup == false)
    return;
  try {
    if (!await global.modelAntiSt.findOne({
      where: {
        threadID
      }
    }))
      await global.modelAntiSt.create({
        threadID, data: {}
      });
    const data = (await global.modelAntiSt.findOne({
      where: {
        threadID
      }
    })).data || {};
    if (!data.hasOwnProperty("antist")) {
      data.antist = {};
      // return
    }
    if (!data.hasOwnProperty("antist_info")) {
      data.antist_info = {};
      // return;
    }

    if (logMessageType == "log:thread-name") {
      if (isValid) {
        data.antist_info.name = logMessageData.name;
        await global.modelAntiSt.findOneAndUpdate({
          threadID
        }, {
          data
        });
      } else if (data.antist.boxname === true && isValid == false) {
        if (data.antist_info.name !== null) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Currently Activation Anti Group Name Change Mode", threadID, () => {
            api.setTitle(data.antist_info.name, threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTIST ] → an Occurred will Excuting The command", threadID);
              }
            });
          });
        }
      }
      // data.antist_info.name = logMessageData.name;
    } else if (logMessageType == "log:user-nickname") {
      if (data.antist.nickname === true && !(author == api.getCurrentUserID() && logMessageData.participant_id == api.getCurrentUserID())) {
        if (data.antist_info.nicknames !== null && isValid == false) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Currently Active Anti-Alise-Mode", threadID, () => {

            const oldNickname = data.antist_info.nicknames ? data.antist_info.nicknames[logMessageData.participant_id] || null : null;
            api.changeNickname(oldNickname, threadID, logMessageData.participant_id, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTIST ] → an occured Will excuting The command", threadID);
              }
            });
          });
        }
      }
      if (isValid) {
        if (!data.antist_info.nicknames)
          data.antist_info.nicknames = {};
        data.antist_info.nicknames[logMessageData.participant_id] = logMessageData.nickname;
        await global.modelAntiSt.findOneAndUpdate({
          threadID
        }, {
          data
        });
      }
    } else if (logMessageType == "change_thread_image") {
      if (isValid) {
        let newImageURL = null;
        if (Object.keys(event.image || {}).length > 0 && event.image.url) {
          const fs = global.nodemodule["fs"];
          newImageURL = event.image.url;
          const url = await uploadIBB(newImageURL, "c4847250684c798013f3c7ee322d8692");
          newImageURL = url;
          data.antist_info.imageSrc = newImageURL;
          await global.modelAntiSt.findOneAndUpdate({
            threadID
          }, {
            data
          });
        }
      }
      if (data.antist.boximage === true) {
        if (data.antist_info.imageSrc !== null && isValid == false) {
          const axios = global.nodemodule['axios'];
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → currently active anti alise-member", threadID, async () => {
            const imageStream = (await axios.get(data.antist_info.imageSrc, {
              responseType: "stream"
            })).data;
            api.changeGroupImage(imageStream, threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTIST ] → an occurred wil excutig the new command", threadID);
              }
            });
          });
        }
      }
    }
    else if (logMessageType == "log:thread-color") {
      if (global.client.antistTheme?.[threadID]) {
        if (global.client.antistTheme[threadID].author != author)
          return;
        return global.client.antistTheme[threadID].run(logMessageData.theme_id, logMessageData.accessibility_label);
      }
      if (isValid) {
        data.antist_info.themeID = logMessageData.theme_id;
        await global.modelAntiSt.findOneAndUpdate({
          threadID
        }, {
          data
        });
      }

      if (!isValid && data.antist.theme == true) {
        if (data.antist_info.themeID) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → currently activating mode anti-group color change", threadID, () => {
            api.changeThreadColor(data.antist_info.themeID, threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTIST ] → an occurred while executing the new command ", threadID, () => {
                  api.changeThreadColor('196241301102133', threadID)
                });
              }
            });
          });
        }
      }

    }
    else if (logMessageType == "log:thread-icon") {
      if (isValid) {
        const newEmoji = logMessageData.thread_icon;
        data.antist_info.emoji = newEmoji;
        await global.modelAntiSt.findOneAndUpdate({
          threadID
        }, {
          data
        });
      }
      if (data.antist.emoji === true) {
        if (data.antist_info.emoji !== null && isValid == false) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → currently activating mode anti-group emoji mode", threadID, async () => {
            api.changeThreadEmoji(data.antist_info.emoji || "", threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTIST ] → an occurred while executing the new command", threadID);
              }
            });
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    api.sendMessage("[ ANTIST ] → an occurred while executing the new command", threadID);
  }
  return;
};

async function uploadIBB(img, key) {
  const responseArr = [];
  const formData = new FormData();
  formData.append("image", img);
  formData.append("key", key);

  const {
    url
  } = (await axios({
    method: "post",
    url: 'https://api.imgbb.com/1/upload',
    data: formData,
    headers: {
      "content-type": "multipart/form-data"
    }
  })).data.data;
  return url;
}