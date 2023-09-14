let tabList = document.getElementById("tab-list");
let button = document.getElementById("get-urls");
let activeElem = document.getElementById("active-tab");
let copyButton1 = document.getElementById("copy");
let userCred = document.getElementById("user");
let passCred = document.getElementById("pass");

// chrome.runtime.sendMessage("getActiveUrl", (response) => {
//   if (response && response[0] && response[0].url) {
//     activeElem.textContent = response[0].url;
//   }
// });

chrome.runtime.sendMessage("fetchCredentials", (response) => {
  let sample = new Array(response);
  console.log("popup credentials recieved =>", sample);
  console.log(userCred, passCred);
  userCred.textContent = new Array(response[0]);
  passCred.textContent = new Array(response[1]);
});

// function retriveUrl() {
//   console.log("retrieving relevant URLs");

//   chrome.runtime.sendMessage("getUrls", (response) => {
//     for (let url of response) {
//       let listItem = document.createElement("li");
//       let link = document.createElement("a");
//       link.href = url;
//       link.textContent = url;
//       listItem.appendChild(link);
//       tabList.appendChild(listItem);
//     }
//   });
// }

// button.addEventListener("click", retriveUrl);
