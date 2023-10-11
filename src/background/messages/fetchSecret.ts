import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  
  const storage = new Storage();
  let code = await storage.get("token");
  let id = req.body.id;
  const params = new URLSearchParams({ id: id });


  const url = "https://api.shadowsafe.xyz/secretsById?" + params;
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
    console.log("We got an error:", error);
  }
};

export default handler;
