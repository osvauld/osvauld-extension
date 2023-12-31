import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  let activeUrl = await chrome.tabs.query({ active: true});

  const storage = new Storage();
  let code = await storage.get("token");
  let hostname = new URL(activeUrl[0].url).hostname;
  const params = new URLSearchParams({ url: hostname });

  const url = "https://api.shadowsafe.xyz/secretsByUrl?" + params;
  const headers = {
    Authorization: "Bearer " + code,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    res.send({ data });

  } catch (error) {
    console.log("No usernames associated with this active tab:", error);
  }
};

export default handler;
