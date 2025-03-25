// import storage from "./utils/localstorage";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "BAEKJOON_PROBLEM_DATA") {
    sendResponse({ sender, status: "200" });
  }
});
