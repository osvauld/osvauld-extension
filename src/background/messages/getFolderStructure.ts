import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  const storage = new Storage();
  let code = await storage.get("token");

  const url = "https://api.shadowsafe.xyz/folders/structure" ;
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
    console.log("No Folder structures associated with auth token:", error);
  }
};

export default handler;
