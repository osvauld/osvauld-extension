// background.js
import { Storage } from "@plasmohq/storage";
const storage = new Storage();

async function testBaseStorage(usernames) {
 
  await storage.remove("usernames");
  await storage.set("usernames", usernames);

  let read = await storage.get("usernames");
 // console.log('Set usernames', read )
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


// // Add a message listener to the background script
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('Message received from url => ', sender.url);
//   if (sender.url) {
//     var data = request.data;
//     var result = 'Incredible response';
//     sendResponse({result: result});
//   }
// });


chrome.runtime.onConnectExternal.addListener(function(port) {
  console.log("PORT!", port);

  setInterval(function() {
    port.postMessage("hi from extension");
     console.log("trying to say hi")
  }, 5000);

  port.onMessage.addListener(function(msg) {
    // See other examples for sample onMessage handlers.
    console.log("Message communicated to bg => ", msg);
  });
});

// // Listen for a message from the web page
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "status") {
//     // Respond with the status of the extension or a specific component
//     sendResponse({ status: "active" });
//   }
//   // Note: return true if you will asynchronously send a response
// });





chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const justHostname = new URL(tab.url).hostname;
      const subdomainPattern = /^([a-z0-9-]+\.)*[a-z0-9-]+\.[a-z]+$/;
      console.log('current hostname ===>', justHostname)
      if (subdomainPattern.test(justHostname)){
        (async () => {
        console.log(justHostname, "we need this url our target");
        let usernames = await usernamefetch(justHostname);
        console.log('Associated usernames =>', usernames)
        await testBaseStorage(usernames.data.secrets);
      })();
    }
  });
});


// 1) Function will be on background script, will we run when the extension is loaded.
// chrome.runtime.onInstalled.addListener(async () => {
//   // 2) Define sample data. console.log data for mock purposes.
//   const data = "Hello, world!";
//   console.log("Data:", data);

//   // 3) Generate public and private key with RSA.
//   const keyPair = await crypto.subtle.generateKey(
//     {
//       name: "RSA-OAEP",
//       modulusLength: 2048,
//       publicExponent: new Uint8Array([1, 0, 1]),
//       hash: "SHA-256",
//     },
//     true,
//     ["encrypt", "decrypt"]
//   );
//   const publicKey = keyPair.publicKey;
//   const privateKey = keyPair.privateKey;

//   // 4) Store private key with storage api.
//   const privateKeyData = await crypto.subtle.exportKey("jwk", privateKey);
//   chrome.storage.local.set({ privateKey: privateKeyData });

//   // 5) Store public key with storage api.
//   const publicKeyData = await crypto.subtle.exportKey("jwk", publicKey);
//   chrome.storage.local.set({ publicKey: publicKeyData });

//   // 6) Encrypt data with public key
//   const dataBuffer = new TextEncoder().encode(data);
//   const encryptedData = await crypto.subtle.encrypt(
//     {
//       name: "RSA-OAEP",
//     },
//     publicKey,
//     dataBuffer
//   );

//   // 7) Console encrypted data
//   console.log("Encrypted data:", new Uint8Array(encryptedData));

//   // 8) Decrypt with private key
//   const decryptedData = await crypto.subtle.decrypt(
//     {
//       name: "RSA-OAEP",
//     },
//     privateKey,
//     encryptedData
//   );

//   // 9) Console decrypted message.
//   console.log("Decrypted message:", new TextDecoder().decode(decryptedData));
// });



// chrome.runtime.onConnect.addListener(function(port) {
//   if (port.name === "popup") {
//       port.onDisconnect.addListener(async function() {
//          console.log("popup has been closed");
//          await storage.set("liveCred", false);
//       });
//   }
// });

let concernedUrls;

async function main() {
  try {
    concernedUrls = await fetchUrls();
    //console.log('Concered URLs ==> ',    concernedUrls)
    let activeUrl = await chrome.tabs.query({ active: true});
   // console.log('Fetching usernames trigger: Login, active tab')
    const storage = new Storage();
   // console.log(activeUrl)
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
