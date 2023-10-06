// background.js
import { Storage } from "@plasmohq/storage"


// This the part were we listen for new Urls visited and compated with the urls we have on our array, If there is a match, url is sent to the backed to fetch Usernames.

async function fetchUrls() {
  const url = 'https://api.shadowsafe.xyz/secrets/urls';
  const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaCIsImF1dGgiOlsiQWRtaW4iXSwiZXhwIjoxNjk2NjAzMDk0fQ.osTOE0q5lKQOOaXZWux0aWRRLp6Cb-a2hxKL287P171LPaGTtlK9sPN6ESDZZPINa9UuwQ91VlWiN6Z0YzaV2g';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.statusCode === 200 && data.status === 'Success') {
      const urlsArray = data.data.urls;
      console.log('URLs:', urlsArray);
      return urlsArray
    } else {
      console.error('Request failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

let concernedUrls 


// You can use fetchUrls() like this:
async function main() {
  try {
    concernedUrls = await fetchUrls();
    console.log('Concerned URLs:', concernedUrls);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();


const usernamefetch = async (requesturl) => {

  const params =   new URLSearchParams({url: requesturl})
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
    return data;

  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }

}



async function testBaseStorage(usernames) {
  const storage = new Storage()
  await storage.clear()
  await storage.set("usernames", usernames);


  console.log('it is set now');

  let read = await storage.get("usernames")
  console.log('reading now from storage', read)
}



chrome.webNavigation.onCompleted.addListener((newPage) => {
  if(newPage.frameId==0){
    console.log("Visited parent URL:", newPage.url);
      const justHostname = new URL(newPage.url).hostname
      console.log('outside fetch inside newpage lisner', concernedUrls )
      console.log('url of interest',concernedUrls, justHostname)
      if(concernedUrls.includes(justHostname)){
        (async ()=>{
         let usernames= await usernamefetch(justHostname);
         // then store it somehwere and load it when popup is loaded

         await testBaseStorage(usernames.data.secrets)

        })()
        
       // need to fetch usernames associated with this url
   
       // data needs to be passed from here to creds listed
      }
 
    }
});
