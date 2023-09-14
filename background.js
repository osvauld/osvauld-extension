// Declare a global variable to store the URLs
let tabUrls = [];

// Define a function to get all the tab URLs
function getTabUrls() {
  // Use the chrome.tabs API to query all the tabs
  chrome.tabs.query({}, (tabs) => {
    // Loop through the tabs
    //console.log("tabs  ============>", tabs);
    for (let tab of tabs) {
      // Get the URL of each tab
      let tabUrl = tab.url;
      // Check if the URL is already in the array
      let index = tabUrls.indexOf(tabUrl);
      // If not, add it to the array
      if (index === -1) {
        tabUrls.push(tabUrl);
        // // Save the array in the local storage
        // chrome.storage.local.set({ tabUrls: tabUrls });
      }
    }
  });
}

// Call the function when the extension is loaded
getTabUrls();

// Listen for changes in the tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If the tab is complete, call the function again to update the array
  if (changeInfo.status === "complete") {
    getTabUrls();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // If the message is "getUrls", send back the array of URLs
  if (message === "getUrls") {
    chrome.tabs.query({}, (tabs) => {
      // Loop through the tabs
      console.log("message received in background  ============>", tabs);
      for (let tab of tabs) {
        // Get the URL of each tab
        let tabUrl = tab.url;
        // Check if the URL is already in the array
        let index = tabUrls.indexOf(tabUrl);
        // If not, add it to the array
        if (index === -1) {
          tabUrls.push(tabUrl);
          //   // Save the array in the local storage
          //   chrome.storage.local.set({ tabUrls: tabUrls });
        }
      }
    });
    sendResponse(tabUrls);
  }
});

let activeTab;

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message === "getActiveUrl") {
//     console.log("active tab message received in the background");
//     chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
//       console.log("active tab is => ", tab);
//       activeTab = tab;
//     });
//     sendResponse(activeTab);
//   }
// });

// look for url and fill the form

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "fetchCredentials") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
      activeTab = tab;
    });
    // if (activeTab[0] && activeTab[0].url) {
    //   sendResponse(activeTab[0].url);
    // }
    sendResponse(["john.doe@example.com", "jhon@123"]);
  }
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   // Check if the tab URL matches the specific URL
//   if (changeInfo.url && changeInfo.url === "https://www.google.com/") {
//     console.log("specified url found");
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ["content.js"],
//     });
//   }
// });
