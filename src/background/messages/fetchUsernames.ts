import type { PlasmoMessaging } from "@plasmohq/messaging"

 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

          const params =   new URLSearchParams({url: req.body.url})
          const url = 'https://api.shadowsafe.xyz/secrets?' + params ;
          const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NTAzZTYwNTkyMjYyMzI2NmZkMGM0MzciLCJhdXRoIjpbIkFkbWluIl0sImV4cCI6MTY5NzQwNTMyOH0.zvKKwYomWf8qiMegHfNdnkLsjs9EoTuliUaUf5IsBCErOtqfcVLC2m97riCHVivYcVdVVLv-mUYTowdt0M6q9Q'
          };
        
          try {
          //  console.log('fetching usernames of url =>', url)
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
            console.error('Error:', error);
          }
        }
  

      


 
export default handler