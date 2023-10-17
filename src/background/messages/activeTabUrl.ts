//This particular script is redundant




import type { PlasmoMessaging } from "@plasmohq/messaging"
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
 
 chrome.windows.getCurrent(w => {
  chrome.tabs.query({active: true, windowId: w.id}, tabs => {
    const tabId = tabs[0].id;
    console.log(tabs[0].url);
    // if (tabs && tabs[0] && tabs[0].url) {
    //   const activeTabUrl = tabs[0].url;
    //  // console.log('active tab from background script', activeTabUrl);
    //   res.send({
    //     activeTabUrl
    //   })
    // } else {
    //   res.send(null); 
    // }
  });
});

  // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //   console.log('active tab =>', tabs)

  // });


}
 
export default handler