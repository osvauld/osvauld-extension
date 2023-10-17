import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const storage = new Storage();
    let code = await storage.get("token");
    const url = "https://api.shadowsafe.xyz/secrets/urls";
    const token = "Bearer " + code;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.statusCode === 200 && data.status === "Success") {
        const urlsArray = data.data.urls;
        console.log('Concered urls form login', urlsArray)
        await storage.set("targetUrls", urlsArray)
      } else {
        console.error("Request failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
}


export default handler;