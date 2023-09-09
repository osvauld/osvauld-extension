let tabList = document.getElementById("tab-list");
let button = document.getElementById("get-urls");
let activeElem = document.getElementById("active-tab");

chrome.runtime.sendMessage("getActiveUrl", (response) => {
  if (response && response[0] && response[0].url) {
    activeElem.textContent = response[0].url;
  }
});

function retriveUrl() {
  console.log("retrieving relevant URLs");

  chrome.runtime.sendMessage("getUrls", (response) => {
    for (let url of response) {
      let listItem = document.createElement("li");
      let link = document.createElement("a");
      link.href = url;
      link.textContent = url;
      listItem.appendChild(link);
      tabList.appendChild(listItem);
    }
  });
}

button.addEventListener("click", retriveUrl);
