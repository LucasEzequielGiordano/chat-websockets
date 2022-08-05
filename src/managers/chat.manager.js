import * as fs from "fs";
import __dirname from "../utils.js";

class ChatManager {
  constructor() {
    this.path = __dirname + "/files/chats.json";
  }

  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const fileData = await fs.promises.readFile(this.path, "utf-8");
        const chats = JSON.parse(fileData);
        return chats;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  save = async (messages) => {
    try {
      const chats = await this.getAll();
      if (chats.length === 0) {
        messages.id = 1;
        chats.push(messages);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(chats, null, "\t")
        );
        return messages.id;
      } else {
        messages.id = chats[chats.length - 1].id + 1;
        chats.push(messages);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(chats, null, "\t")
        );
        return messages.id;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default ChatManager;
