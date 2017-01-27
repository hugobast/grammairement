'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '0'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

function receiveText(content) {
  console.log(content);
}

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { text: 'autocorrect' }, receiveText)
});
