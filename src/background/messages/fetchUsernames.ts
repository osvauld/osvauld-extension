import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

           const storage = new Storage()
           let code = await storage.get('token');

          const params =   new URLSearchParams({url: req.body.url})
          const url = 'https://api.shadowsafe.xyz/secrets?' + params ;
          const headers = {
            'Authorization': 'Bearer '+code
          };
        
          try {
           console.log('fetching usernames of url =>', url, "with token ", code)
            const response = await fetch(url, {
              method: 'GET',
              headers: headers
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            res.send({data})
        
          } catch (error) {
            // Handle errors here
            console.log('Error/ No usernames associated with this active tab:', error);
          }
        }
  

      


 
export default handler