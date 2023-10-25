import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { SecureStorage } from "@plasmohq/storage/secure";


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  
  const storage = new Storage();
  const token = await storage.get("token");

  const secuStorage = new SecureStorage();
  await secuStorage.setPassword("crypticPassword");
  const trust = await secuStorage.get("clientTrust");
  
  const url = 'http://api.shadowsafe.xyz/secrets';
  const data = {
    credentials: trust,
    parent: req.body.id,
    description: 'Test',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('tried to add secret', responseData);
    res.send(responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default handler;
