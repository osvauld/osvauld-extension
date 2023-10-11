// background.js
import { Storage } from "@plasmohq/storage";
const storage = new Storage();

// This the part were we listen for new Urls visited and compated with the urls we have on our array, If there is a match, url is sent to the backed to fetch Usernames.

async function testBaseStorage(usernames) {
  const storage = new Storage();
  await storage.remove("usernames");
  await storage.set("usernames", usernames);

  let read = await storage.get("usernames");
  console.log('Set usernames', read )
}

async function fetchUrls() {
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
      
      return urlsArray;
    } else {
      console.error("Request failed:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const usernamefetch = async (requesturl) => {
  console.log('Fetching usernames trigger: onActivated');
  let code = await storage.get("token");
  const params = new URLSearchParams({ url: requesturl });
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

    return data;
  } catch (error) {
  
    console.error("Error:", error);
  }
};

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const justHostname = new URL(tab.url).hostname;
    if (concernedUrls.includes(justHostname)) {
      (async () => {
        let usernames = await usernamefetch(justHostname);
        await testBaseStorage(usernames.data.secrets);
      })();
    }
  });
});

let concernedUrls;

async function main() {
  try {
    concernedUrls = await fetchUrls();
    let activeUrl = await chrome.tabs.query({ active: true});
    console.log('Fetching usernames trigger: Login, active tab')
    const storage = new Storage();
    console.log(activeUrl)
    let hostname = new URL(activeUrl[0].url).hostname;
    if (concernedUrls.includes(hostname)) {
      (async () => {
        let usernames = await usernamefetch(hostname);
        await testBaseStorage(usernames.data.secrets);
      })();
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

let loginStatus;

let intervalId = setInterval(() => {
  
  (async () => {
    loginStatus = await storage.get("loginStatus");
    console.log('listening for login')
    if (loginStatus) {
      
      main();
      clearInterval(intervalId);
    }
  })();
}, 500);
