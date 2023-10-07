// background.js
import { Storage } from "@plasmohq/storage"
const storage = new Storage();

// This the part were we listen for new Urls visited and compated with the urls we have on our array, If there is a match, url is sent to the backed to fetch Usernames.

async function testBaseStorage(usernames) {
  const storage = new Storage()
  await storage.clear()
  await storage.set("usernames", usernames);
  console.log('it is set now');
  let read = await storage.get("usernames")
  console.log('reading now from storage', read)
}


async function fetchUrls() {
  let code = await storage.get('token');
  const url = 'https://api.shadowsafe.xyz/secrets/urls';
  const token = 'Bearer '+ code
  
  console.log('fetching concerned urls with', token)
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

const usernamefetch = async (requesturl) => {
  let code = await storage.get('token');
  const params =   new URLSearchParams({url: requesturl})
  const url = 'https://api.shadowsafe.xyz/secrets?' + params ;
  const headers = {
    'Authorization': 'Bearer '+ code
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


chrome.tabs.onActivated.addListener(function(activeInfo) { 
  chrome.tabs.get(activeInfo.tabId, function(tab) { 
    console.log("active tab:", tab.url);
      const justHostname = new URL(tab.url).hostname
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
  })

})


let concernedUrls 



async function main() {
  try {
    concernedUrls = await fetchUrls();
    console.log('Concerned URLs:', concernedUrls);
  } catch (error) {
    console.error('Error:', error);
  }
}

let loginStatus


let intervalId = setInterval(()=> {
    console.log('Listening for login');
    (async ()=> {
      loginStatus = await storage.get('loginStatus')
      if(loginStatus){
        console.log('Logged in')
        main();
        clearInterval(intervalId); 
      }
    })()
}, 500)

console.log('Login status', loginStatus)


// Bakcground script runs when loaded
// inorder to fetch conered urls, we first need to log in, then only after logged in we need to continously listen for tab changes.








